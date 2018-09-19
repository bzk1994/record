## partition

> 创建一个拆分为两部分的数组。 第一部分是 predicate 检查为真值的，第二部分是 predicate 检查为假值的。 predicate 会传入3个参数：(value, index|key, collection)。

```js

```

```js
/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsey for. The predicate is
 * invoked with one argument: (value).
 *
 * @since 3.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the array of grouped elements.
 * @see groupBy, keyBy
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ]
 *
 * partition(users, ({ active }) => active)
 * // => objects for [['fred'], ['barney', 'pebbles']]
 */
function partition(collection, predicate) {
  return reduce(collection, (result, value, key) => (
    result[predicate(value) ? 0 : 1].push(value), result
  ), [[], []])
}

```

`partition` 函数接收 2 个参数，`collection` 迭代集合、`predicate` 迭代函数。

`partition` 函数返回一个 `reduce` 方法，传入 `collection` 迭代集合、回调函数、`[[], []]` 初始值，
在回调函数中如果调用迭代器函数 `predicate(value)` 返回为真往初始值第 0 个插入 `value`，否则就是第 1 个，最后将处理后的数组返回。

