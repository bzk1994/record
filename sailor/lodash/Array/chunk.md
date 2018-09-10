
## chunk

> 将数组拆分成多个 size 长度的块，并组成一个新数组。 如果数组无法被分割成全部等长的块，那么最后剩余的元素将组成一个块。

```js
_.chunk(array, [size=0])
```

```js
/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}
```

`chunk` 函数接收 `2` 个参数，`array` 数组，`size` 尺寸，
首先会调用 `Math.max` 取出 `size`，申明 `length` 变量保存数组长度，如果 `array == null` 长度为 0。
判断没有长度或者 `size` 小于 1 ，`return` 空数组。

接着申明 `index` `resIndex` `result` 初始变量，`result` 是一个新数组，数组长度采用 `length / size` 向上取整，保证数组不均分时将多余的放在最后数组返回。

进入 `while` 循环 ，这里从 `slice.js` 引入了一个 `slice` 方法，
`slice` 方法主要是将传入数组根据 `array` 和 `end` 位置切割后返回，不包括 `end`， 将 `slice` 切割后的数组保存到 `result` 的第 `resIndex` 上（`resIndex` 不断累加），最后将 `result` 数组返回。
