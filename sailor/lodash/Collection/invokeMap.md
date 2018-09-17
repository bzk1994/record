## invokeMap

> 调用 path 的方法处理集合中的每一个元素，返回处理的数组。 如何附加的参数会传入到调用方法中。如果方法名是个函数，集合中的每个元素都会被调用到。

```js
_.invokeMap(collection, path, [args])
```

```js
/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results of each invoked method. Any additional arguments
 * are provided to each invoked method. If `path` is a function, it's invoked
 * for, and `this` bound to, each element in `collection`.
 *
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array|Function|string} path The path of the method to invoke or
 *  the function invoked per iteration.
 * @param {Array} [args] The arguments to invoke each method with.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * invokeMap([[5, 1, 7], [3, 2, 1]], 'sort')
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * invokeMap([123, 456], String.prototype.split, [''])
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
function invokeMap(collection, path, args) {
  let index = -1
  const isFunc = typeof path == 'function'
  const result = isArrayLike(collection) ? new Array(collection.length) : []

  baseEach(collection, (value) => {
    result[++index] = isFunc ? path.apply(value, args) : invoke(value, path, args)
  })
  return result
}
```

`invokeMap` 函数接收 3 个参数，`collection` 集合、`path` 调用的方法名、`args` `argments` 。

申明初始变量 `index` 为 -1 ，`isFunc` 变量保存 `path` 是否是一个函数，申明返回的数组 `result` 变量，
调用 `baseEach` 传入 `collection` 和回调函数，最后将 `result` 返回。

