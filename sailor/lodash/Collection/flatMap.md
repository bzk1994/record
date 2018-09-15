## flatMap

> 创建一个扁平化的数组，每一个值会传入 iteratee 处理，处理结果会与值合并。 iteratee 会传入3个参数：(value, index|key, array)。

```js
_.flatMap(collection, [iteratee=_.identity])
```

```js
/**
 * Creates a flattened array of values by running each element in `collection`
 * thru `iteratee` and flattening the mapped results. The iteratee is invoked
 * with three arguments: (value, index|key, collection).
 *
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @see flatMapDeep, flatMapDepth, flatten, flattenDeep, flattenDepth, map, mapKeys, mapValues
 * @example
 *
 * function duplicate(n) {
 *   return [n, n]
 * }
 *
 * flatMap([1, 2], duplicate)
 * // => [1, 1, 2, 2]
 */
function flatMap(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), 1)
}
```