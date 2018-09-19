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