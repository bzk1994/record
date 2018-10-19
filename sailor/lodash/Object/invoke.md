## invoke

> 调用对象路径的方法

```js
_.invoke(object, path, [args])
```

```js
/**
 * Invokes the method at `path` of `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} [args] The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] }
 *
 * invoke(object, 'a[0].b.c.slice', [1, 3])
 * // => [2, 3]
 */
function invoke(object, path, args) {
  path = castPath(path, object)
  object = parent(object, path)
  const func = object == null ? object : object[toKey(last(path))]
  return func == null ? undefined : func.apply(object, args)
}
```

`invoke` 函数接收 3 个参数，`object` 检索对象、`path` 路径、`args` 调用参数。

`invoke` 函数首先会调用 `castPath` 获取对象路径表数组 `path`， 调用 `parent` 函数获取 `object` 的 `path` 父值，这里会尝试获取 `path` 的最后一个 `key`，得到 `func` 处理函数，随后调用 `func`，并传入 `args` 参数后返回。
