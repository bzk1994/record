# internal

## baseFlatten

> 返回扁平化的数组。

```js
/**
 * The base implementation of `flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable)
  result || (result = [])

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      } else {
        result.push(...value)
      }
    } else if (!isStrict) {
      result[result.length] = value
    }
  }
  return result
}
```

在 `difference` 函数中调用：

```js
baseFlatten(values, 1, isArrayLikeObject, true)
```

`baseFlatten` 接收 `array` 数组、`depth` 深度, `predicate`, `isStrict` 严格, `result` 默认为空数组，
判断 `array == null` 如果等于 `null` ， 返回传入的 `result`。

进入 `for...of ` 循环，这个判断 `depth > 0` 并且调用传入 `predicate` 函数，就是 `isArrayLikeObject`， 满足条件再次判断 `depth > 1` ，就递归调用 `baseFlatten` 扁平化数组，
不满足就将 `...value` 插入 `result` 数组，此时 `isStrict` 为 `true`，并不会进入 `else if` 判断， 最后将 `result` 数组返回。

## baseAssignValue

> 简单的属性拷贝。
```js
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    })
  } else {
    object[key] = value
  }
}
```

`baseAssignValue` 接收 2 个参数 `object` 赋值对象、`key`、`value` 。

判断 `key` 如果是 `__proto__` 是会调用 `Object.defineProperty` 为对象赋值，否则进行简单的属性赋值，
改方法只要是要进行简单的属性拷贝。

## baseDifference

```js
/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

/**
 * The base implementation of methods like `difference` without support
 * for excluding multiple arrays.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  let includes = arrayIncludes
  let isCommon = true
  const result = []
  const valuesLength = values.length

  if (!array.length) {
    return result
  }
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  if (comparator) {
    includes = arrayIncludesWith
    isCommon = false
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    const computed = iteratee == null ? value : iteratee(value)

    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer
        }
      }
      result.push(value)
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
}
```

`baseDifference` 接收 `array` `values` `iteratee` `comparator` 四个函数，但是 `difference` 只传 2 个函数，没有 `iteratee` `comparator` 跳过 2 个 `if` 判断，判断数组长度大于 200，使用 `SetCache` 类缓存 `values`。

进入 `for..of` 循环，此时 `iteratee === null` ，申明 `computed` 赋值为 `value`，接着使用 `while` 循环，将满足条件的 `value` 插入数组，最后将 `result` 返回。

## baseWhile

```js
/**
 * The base implementation of methods like `dropWhile` and `takeWhile`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the slice of `array`.
 */
function baseWhile(array, predicate, isDrop, fromRight) {
  const { length } = array
  let index = fromRight ? length : -1

  while ((fromRight ? index-- : ++index < length) &&
    predicate(array[index], index, array)) {}

  return isDrop
    ? slice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
    : slice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index))
}
```

`baseFill` 函数：

```js
/**
  * The base implementation of `_.fill` without an iteratee call guard.
  *
  * @private
  * @param {Array} array The array to fill.
  * @param {*} value The value to fill `array` with.
  * @param {number} [start=0] The start position.
  * @param {number} [end=array.length] The end position.
  * @returns {Array} Returns `array`.
  */
function baseFill(array, value, start, end) {
  var length = array.length;

  start = toInteger(start);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : toInteger(end);
  if (end < 0) {
    end += length;
  }
  end = start > end ? 0 : toLength(end);
  while (start < end) {
    array[start++] = value;
  }
  return array;
}
```

`baseFindIndex` 函数

```js
/**
 * The base implementation of `findIndex` and `findLastIndex`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array
  let index = fromIndex + (fromRight ? 1 : -1)

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}
```

`findIndex` 函数接收 4 个参数，`array` 数组、`predicate` 迭代函数，`fromIndex` 搜索开始下标，`fromRight` 是否从右到左。

开始申明 `length` 变量保存 `array` 长度，申明 `index` 初始下标，
接着通过 `while` 循环不断迭代， `fromRight` 为真 说明从右到左，`index` 累减，否则 `index` 累加小于数组长度，在循环中有个 `if` 判断，判断 `predicate` 函数的返回值判断是否为真，为真的话返回对象下标，否则返回 -1。
