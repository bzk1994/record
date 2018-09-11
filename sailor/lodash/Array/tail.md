## tail

> 获取数组中除了第一个元素的剩余数组

```js
_.tail(array)
```

```js
/**
 * Gets all but the first element of `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * tail([1, 2, 3])
 * // => [2, 3]
 */
function tail(array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  const [, ...result] = array
  return result
}
```

`tail` 函数开始是一些非空以及数组长度的判断，
接着使用了数组结构的方式取出了数组的第一个，以及剩余数组 `result` ，最后将 `result` 返回。

