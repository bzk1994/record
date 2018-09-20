## reject

> 反向版 _.filter，这个方法返回 predicate 检查为非真值的元素。

```js
_.reject(collection, [predicate=_.identity])
```

```js
/**
 * The opposite of `filter` this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, filter
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ]
 *
 * reject(users, ({ active }) => active)
 * // => objects for ['fred']
 */
function reject(collection, predicate) {
  const func = Array.isArray(collection) ? filter : filterObject
  return func(collection, negate(predicate))
}
```

`reject` 函数接收 2 个数组，`array` 数组，`predicate` 断言函数。

首先判断 `collection` 是否是数组保存不同的循环方法，最后调用 `func` ，并且将 `collection` 和 `negate` 否定函数处理后的 `predicate` 断言函数传入，会产生于 `filter` 相反的效果。

申名初始变量 `index` 、 `resIndex` 、 `length` 、`result` ，进入 `while` 循环，`index` 累加，如果调用 `predicate` 函数返回为真就像 `value` 插入 `result` 数组，并且将 `resIndex` 累加，最后将 `result` 数组返回。


## negate

> 否定函数。

```js
/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0
 * }
 *
 * filter([1, 2, 3, 4, 5, 6], negate(isEven))
 * // => [1, 3, 5]
 */
function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    return !predicate.apply(this, args)
  }
}
```

`negate` 首先会函数类型判断，最后返回一个相反处理结果的函数。