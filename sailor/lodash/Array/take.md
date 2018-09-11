## take

> 从数组的起始元素开始提取 N 个元素。


```js
_.take(array, [n=1])
```

```js
/**
 * Creates a slice of `array` with `n` elements taken from the beginning.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * take([1, 2, 3])
 * // => [1]
 *
 * take([1, 2, 3], 2)
 * // => [1, 2]
 *
 * take([1, 2, 3], 5)
 * // => [1, 2, 3]
 *
 * take([1, 2, 3], 0)
 * // => []
 */
function take(array, n=1) {
  if (!(array != null && array.length)) {
    return []
  }
  return slice(array, 0, n < 0 ? 0 : n)
}
```

`take` 函数只是 `slice` 函数的简单包装，接收 2 个参数，`array` 数组、`n` 提取个数（默认为 1）。

开始是 `array` 的非空和长度判断，最后调用 `slice` 返回截取的数组。

## takeRight

> 从数组的结束元素开始提取 N 个数组。

```js
_.takeRight(array, [n=1])
```

```js
/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * takeRight([1, 2, 3])
 * // => [3]
 *
 * takeRight([1, 2, 3], 2)
 * // => [2, 3]
 *
 * takeRight([1, 2, 3], 5)
 * // => [1, 2, 3]
 *
 * takeRight([1, 2, 3], 0)
 * // => []
 */
function takeRight(array, n=1) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  n = length - n
  return slice(array, n < 0 ? 0 : n, length)
}
```

`takeRight` 函数接收 2 个参数，`array` 数组、`n` 提取个数（默认为 1）。

开始是 `array` 的非空和长度判断，最后调用 `slice` 返回截取的数组，与 `take` 方法不同的就是调用 `slice` 函数传入的第 3 个参数为数组长度。

## takeRightWhile

> 从数组的最右边开始提取数组，直到 predicate 返回假值。predicate 会传入三个参数：(value, index, array)。

```js
_.takeRightWhile(array, [predicate=_.identity])
```

```js
/**
 * Creates a slice of `array` with elements taken from the end. Elements are
 * taken until `predicate` returns falsey. The predicate is invoked with
 * three arguments: (value, index, array).
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': true }
 * ]
 *
 * takeRightWhile(users, ({ active }) => active)
 * // => objects for ['fred', 'pebbles']
 */
function takeRightWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate, false, true)
    : []
}
```

`takeRightWhile` 函数接收 2 个参数，`array` 数组、`predicate` 迭代器函数，
`array` 不为 `null` 并且有长度，就调用 `baseWhile` 方法返回数组，否则返回空数组。

## takeWhile

> 从数组的开始提取数组，直到 predicate 返回假值。predicate 会传入三个参数：(value, index, array)。

```js
/**
 * Creates a slice of `array` with elements taken from the beginning. Elements
 * are taken until `predicate` returns falsey. The predicate is invoked with
 * three arguments: (value, index, array).
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': false }
 * ]
 *
 * takeWhile(users, ({ active }) => active)
 * // => objects for ['barney', 'fred']
 */
function takeWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate)
    : []
}
```

`takeWhile` 与 `takeRightWhile` 函数调用一致，只是 `takeRightWhile` 函数调用 `baseWhile` 的时候传入了第四个参数为 `true`，`baseWhile` 会从右向左处理数组。