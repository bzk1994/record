## last

> 获取数组中的最后一个元素。

```js
/**
 * Gets the last element of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * last([1, 2, 3])
 * // => 3
 */
function last(array) {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}
```

没有传入 `array` 的情况取到 `length`，然后返回数组最后一个，没有就返回 `undefined`。

## lastIndexOf

> 这个方法类似 _.indexOf，除了它是从右到左遍历元素的。

```js
/**
 * This method is like `indexOf` except that it iterates over elements of
 * `array` from right to left.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * lastIndexOf([1, 2, 1, 2], 2)
 * // => 3
 *
 * // Search from the `fromIndex`.
 * lastIndexOf([1, 2, 1, 2], 2, 2)
 * // => 1
 */
function lastIndexOf(array, value, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = length
  if (fromIndex !== undefined) {
    index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1)
  }
  return value === value
    ? strictLastIndexOf(array, value, index)
    : baseFindIndex(array, baseIsNaN, index, true)
}
```

`lastIndexOf` 接收 3 个参数，`array` 数组、`value` 检索值、`fromIndex` 起始位置。

首先取出数组长度，没有返回 -1，如果有 `fromIndex`，处理起始 `index` ，随后判断 `value === value`，这里是做了 `value` 是 `NaN` 的处理，不是 `NaN` 返回 `strictLastIndexOf` 函数取得的下标，是 `NaN` 的话就调用 `baseFindIndex` ，并将 `baseIsNaN` 最为迭代函数传入，返回数组中符合迭代函数的下标。
