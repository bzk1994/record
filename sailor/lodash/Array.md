## chunk

> 创建一个新数组，将传入的数组切割成几个子数组。

```
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

接着申明 `index` `resIndex` `result` 初始变量，申 `result` 是一个新数组，数组长度 `length / size` 向上舍入，保证数组不均分时将多余的放在最后数组返回，然后进入 `while` ，这里从 `slice.js` 引入了一个 `slice` 方法，
`slice` 方法主要是将传入数组根据 `array` 和 `end` 位置切割后返回，不包括 `end`， 将 `slice` 切割后的数组保存到 `result` 的第 `resIndex` 上（`resIndex` 不断累加），最后将 `result` 数组返回。

## slice

来看一看 `slice.js` ：

```
/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
 * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * var array = [1, 2, 3, 4]
 *
 * _.slice(array, 2)
 * // => [3, 4]
 */
function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  start = start == null ? 0 : start
  end = end === undefined ? length : end

  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}
```

`slice` 接收 3 个参数， `array` 原始数组，`start` 开始， `end` 结束，
取出 `array` 的 `length`，没有就返回空数组，
申明 `start` 默认为 0，`end` 默认为数组长度，接下来就是对 `start` 和 `end` 小于 0 做了处理，

出现了一个很有意思的运算符 `>>>` (Zero-fill right shift) 带符号位的右移运算符，表示将一个数的二进制形式向右移动，包括符号位也参与移动，头部补0。所以，该运算总是得到正值。对于正数，该运算的结果与右移运算符（>>）完全一致，区别主要在于负数。`start >>>= 0` 主要就是保证 `start` 为一个正整数，如果无效就为 0。

接着也是 `while` 循环 `index` 累加，不断往 `result` 赋值，最后将  `result` 数组返回。

