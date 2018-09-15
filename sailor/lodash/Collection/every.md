## every

> 通过 predicate 检查集合中的元素是否都返回 真值，只要 predicate 返回一次假值，遍历就停止，并返回 false。 predicate 会传入3个参数：(value, index|key, collection)

```js
_.every(collection, [predicate=_.identity])
```

```js
/**
 * Checks if `predicate` returns truthy for **all** elements of `array`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * **Note:** This method returns `true` for
 * [empty arrays](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty arrays.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * every([true, 1, null, 'yes'], Boolean)
 * // => false
 */
function every(array, predicate) {
  let index = -1
  const length = array == null ? 0 : array.length

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false
    }
  }
  return true
}
```

`every` 函数接收 2 个数组，`array` 数组，`predicate` 断言函数。

申明初始变量 `index` 、`length`，开始 `while` 循环，`index` 累加，在循环中不断调用 `predicate` 断言函数，如果返回 `fasle` 退出循环，返回 `false` 。

## filter

> 遍历集合中的元素，筛选出一个经过 predicate 检查结果为真值的数组，predicate 会传入3个参数：(value, index|key, collection)。

```js
_.filter(collection, [predicate=_.identity])
```

```js
/**
 * Iterates over elements of `array`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index, array).
 *
 * **Note:** Unlike `remove`, this method returns a new array.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ]
 *
 * filter(users, ({ active }) => active)
 * // => objects for ['barney']
 */
function filter(array, predicate) {
  let index = -1
  let resIndex = 0
  const length = array == null ? 0 : array.length
  const result = []

  while (++index < length) {
    const value = array[index]
    if (predicate(value, index, array)) {
      result[resIndex++] = value
    }
  }
  return result
}
```

`filter` 函数接收 2 个数组，`array` 数组，`predicate` 断言函数。

申名初始变量 `index` 、 `resIndex` 、 `length` 、`result` ，进入 `while` 循环，`index` 累加，如果调用 `predicate` 函数返回为真就像 `value` 插入 `result` 数组，并且将 `resIndex` 累加，最后将 `result` 数组返回。

