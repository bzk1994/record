## map

> 创建一个经过 iteratee 处理的集合中每一个元素的结果数组。 iteratee 会传入3个参数：(value, index|key, collection)。 

```js
_.map(collection, [iteratee=_.identity])
```

```js
/**
 * Creates an array of values by running each element of `array` thru `iteratee`.
 * The iteratee is invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map([4, 8], square)
 * // => [16, 64]
 */
function map(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}
```

`map` 函数接收 2 个参数，`array` 数组、`iteratee` 迭代器函数。

申请初始变量 `index` 、`length` 数组长度、`result` 数组，在 `while` 循环中累加 `index` ，不断向 `result` 插入 `iteratee` 迭代器函数处理后的 `value` ，最后将 `result` 数组返回。