## shuffle

> 创建一个被打乱元素的集合。 使用了 Fisher-Yates shuffle 版本。

```js
_.shuffle(collection)

// Example
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```

```js
/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * shuffle([1, 2, 3, 4])
 * // => [4, 1, 3, 2]
 */
function shuffle(array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index = -1
  const lastIndex = length - 1
  const result = copyArray(array)
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}
```

`shuffle` 函数与之前的 `sampleSize` 思路一致，只是 `while` 循环的成数组的长度，接收一个需要乱序的数组。

开始是一些初始变量的申明设置，调用 `copyArray` 保存一个 `array` 的浅拷贝，随后进入 `while` 循环，`index` 累加，采用 `Math.random` 取一个随机下标 `rand`，下标起始位置会随着 `index` 增加而增加，并将得到的与当前数组的 `index` 做交换，循环完毕后会将随机得到的 `value` 交换到数组 `index`，最后将 `result` 返回。