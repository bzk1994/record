## unzip

> 这个方法类似 _.zip，除了它接收一个打包后的数组并且还原为打包前的状态。

```js
_.unzip(array)
```

```js
/**
 * This method is like `zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @since 1.2.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @see unzipWith, zip, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * const zipped = zip(['a', 'b'], [1, 2], [true, false])
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * unzip(zipped)
 * // => [['a', 'b'], [1, 2], [true, false]]
 */
function unzip(array) {
  if (!(array != null && array.length)) {
    return []
  }
  let length = 0
  array = filter(array, (group) => {
    if (isArrayLikeObject(group)) {
      length = Math.max(group.length, length)
      return true
    }
  })
  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = map(array, baseProperty(index))
  }
  return result
}
```

## unzipWith

> 这个方法类似 _.unzip，除了它接受一个 iteratee 来决定如何重组解包后的数组。iteratee 会传入4个参数：(accumulator, value, index, group)。每组的第一个元素作为初始化的值。

```js
_.unzipWith(array, [iteratee=_.identity])
```

```js
/**
 * This method is like `unzip` except that it accepts `iteratee` to specify
 * how regrouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @since 3.8.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @param {Function} iteratee The function to combine
 *  regrouped values.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * const zipped = zip([1, 2], [10, 20], [100, 200])
 * // => [[1, 10, 100], [2, 20, 200]]
 *
 * unzipWith(zipped, add)
 * // => [3, 30, 300]
 */
function unzipWith(array, iteratee) {
  if (!(array != null && array.length)) {
    return []
  }
  const result = unzip(array)
  return map(result, (group) => iteratee.apply(undefined, group))
}
```