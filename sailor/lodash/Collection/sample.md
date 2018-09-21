## sample

> 从集合中随机获得元素

```js
_.sample(collection)
```

```js
/**
 * Gets a random element from `array`.
 *
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * sample([1, 2, 3, 4])
 * // => 2
 */
function sample(array) {
  const length = array == null ? 0 : array.length
  return length ? array[Math.floor(Math.random() * length)] : undefined
}
```

`sample` 函数内部使用了 `Math.random` 

## sampleSizes

> 获得从集合中随机获得 N 个元素 Gets n random elements from collection.

```js
_.sampleSize(collection, [n=0])
```

```js
/**
 * Gets `n` random elements at unique keys from `array` up to the
 * size of `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * sampleSize([1, 2, 3], 2)
 * // => [3, 1]
 *
 * sampleSize([1, 2, 3], 4)
 * // => [2, 3, 1]
 */
function sampleSize(array, n) {
  n = n == null ? 1 : n
  const length = array == null ? 0 : array.length
  if (!length || n < 1) {
    return []
  }
  n = n > length ? length : n
  let index = -1
  const lastIndex = length - 1
  const result = copyArray(array)
  while (++index < n) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return slice(result, 0, n)
}
```

`sampleSize` 函数接收 2 个参数，`array` 数组、`n` 个数。

开始是一些初始变量的申明设置，调用 `copyArray` 保存一个 `array` 的浅拷贝，随后进入 `while` 循环，`index` 累加，采用 `Math.random` 取一个随机下标 `rand`，下标起始位置会随着 `index` 增加而增加，并将得到的与当前数组的 `index` 做交换，循环完毕后会将随机得到的 `value` 交换到数组的前面部分，最后调用 `slice` 截取前面的数组，实现的十分巧妙。

## copyArray

> 数组浅拷贝。

```js
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  let index = -1
  const length = source.length

  array || (array = new Array(length))
  while (++index < length) {
    array[index] = source[index]
  }
  return array
}
```

`while` 循环数组，简单的浅拷贝实现。