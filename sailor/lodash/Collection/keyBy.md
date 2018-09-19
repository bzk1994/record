## keyBy

> 创建一个对象组成。key 是经 iteratee 处理的结果，value 是产生key的元素。 iteratee 会传入1个参数：(value)。

```js
_.keyBy(collection, [iteratee=_.identity])
```

```js
/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @see groupBy, partition
 * @example
 *
 * const array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ]
 *
 * keyBy(array, ({ code }) => String.fromCharCode(code))
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 */
function keyBy(collection, iteratee) {
  return reduce(collection, (result, value, key) => (
    baseAssignValue(result, iteratee(value), value), result
  ), {})
}
```

`keyBy` 函数接收 2 个参数，`collection` 集合、`iteratee` 迭代器函数。

`keyBy` 内部直接 `return` 了一个 `reduce` 函数，`reduce` 函数中传入 3 个参数，`collection` 集合、回调函数、以及初始值 `{}`，在 `reduce` 的回调中，会调用 `baseAssignValue` 函数，传入 `result` 初始值、`iteratee(value)` 迭代器处理后的 `value` 、`value` ，进行简单的属性拷贝，最后 `reduce` 会返回处理后的对象。

