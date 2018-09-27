## difference

> 创建一个差异化后的数组。

```js
_.difference(array, [values])
```

```js
/**
* Creates an array of `array` values not included in the other given arrays
* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons. The order and references of result values are
* determined by the first array.
*
* **Note:** Unlike `pullAll`, this method returns a new array.
*
* @since 0.1.0
* @category Array
* @param {Array} array The array to inspect.
* @param {...Array} [values] The values to exclude.
* @returns {Array} Returns the new array of filtered values.
* @see union, unionBy, unionWith, without, xor, xorBy, xorWith,
* @example
*
* difference([2, 1], [2, 3])
* // => [1]
*/
function difference(array, ...values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : []
}
```

`difference` 接收2个参数，`array` 数组，`..values` 剩余参数。

通过 `isArrayLikeObject` 判断是否是数组，如果是调用 `baseDifference` 方法，否则返回一个空数组。

```js
baseFlatten(values, 1, isArrayLikeObject, true)
```

`baseFlatten` 会返回一个扁平化的数组。

调用 `baseDifference` 函数中将 `array` 和 `baseFlatten` 函数返回的扁平化的数组作为参数传入，最后返回处理后的函数。

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

`baseDifference` 接收 `array` `values` `iteratee` `comparator` 四个函数，但是 `difference` 只传 2 个函数，没有 `iteratee` `comparator` 不进入 `if` 循环，判断数组长度大于 200，使用 `SetCache` 类缓存 `values`。

进入 `for..of` 循环，此时 `iteratee === null` ，申明 `computed` 赋值为 `value`，接着使用 `while` 循环，将满足条件的 `value` 插入数组，最后将 `result` 返回。

## differenceBy

> 这个方法类似 `_.difference`，除了它接受一个 `iteratee` 调用每一个数组和值。`iteratee` 会传入一个参数：(value)。

```js
/**
 * This method is like `difference` except that it accepts `iteratee` which
 * is invoked for each element of `array` and `values` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * **Note:** Unlike `pullAllBy`, this method returns a new array.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [1.2]
 */
function differenceBy(array, ...values) {
  let iteratee = last(values)
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), iteratee)
    : []
}
```

`differenceBy` 接收 2 个参数，`array` 数组，`values` 剩余参数，
首先通过 `last` 取出的最后一个数组，如果是对象并且是数组，将 `iteratee` 置为 `null`，最后判断 `array` 是否是对象并且是数组，还是通过返回 `baseDifference`  函数的结果，相比与 `difference` 函数，多传了一个，`iteratee` 处理函数。

```js
if (iteratee) {
  values = map(values, (value) => iteratee(value))
}
```

`values` 是的每一项都会经过 `iteratee` 函数的处理。

## differenceWith

> 这个方法类似 `_.difference` ，除了它接受一个 `comparator` 调用每一个数组元素的值。 `comparator` 会传入 2 个参数：(arrVal, othVal)。

```js
/**
 * This method is like `difference` except that it accepts `comparator`
 * which is invoked to compare elements of `array` to `values`. The order and
 * references of result values are determined by the first array. The comparator
 * is invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `pullAllWith`, this method returns a new array.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 *
 * differenceWith(objects, [{ 'x': 1, 'y': 2 }], isEqual)
 * // => [{ 'x': 2, 'y': 1 }]
 */
function differenceWith(array, ...values) {
  let comparator = last(values)
  if (isArrayLikeObject(comparator)) {
    comparator = undefined
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
    : []
}
```

`differenceWith` 函数与 `differenceBy` 相似，只不过调用 `baseDifference` 函数的时候第三个参数为 `undefined`，多了第四个参数 `comparator`。


```js
if (comparator) {
  includes = arrayIncludesWith
  isCommon = false
}
```

如果有 `comparator` 会将引入的 `arrayIncludesWith` 的赋值给 `includes`，并且将 `isCommon` 赋值为 `false`，在 `for...of` 循环时不会进入第一个 `if` 判断，根据 `includes` 返回的布尔值将 `value` 插入 `result`，最后将 `result` 返回。

```js
function arrayIncludesWith(array, target, comparator) {
  if (array == null) {
    return false
  }

  for (const value of array) {
    if (comparator(target, value)) {
      return true
    }
  }
  return false
}
```

`arrayIncludesWith` 函数会循环传入的数组，并且用 `comparator` 函数进行比较后返回。
