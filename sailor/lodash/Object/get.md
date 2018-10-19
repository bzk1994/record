## get

> 根据对象路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。

```js
_.get(object, path, [defaultValue])
```

```js
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @see has, hasIn, set, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
function get(object, path, defaultValue) {
  const result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}
```

`get` 函数接收 3 个参数，`object` 检索对象、`path` 路径、`defaultValue` 默认值。

`get` 函数开始是一个三元表达式，判断 `object` 等于 `null` 将 `undefined` 赋值给 `result` ，否则就将 `baseGet` 函数调用结果赋值，最后返回一个三元表达式，这里会根据 `result` 是否等于 `undefined` ，返回 `defaultValue` 默认值或者 `result`。
 


## baseGet

```js
/**
 * The base implementation of `get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object)

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[toKey(path[index++])]
  }
  return (index && index == length) ? object : undefined
}
```

在 `baseGet` 函数中，首先会调用 `castPath` 函数解析 `path`，此时 `path` 为一个数组，进行 `while` 循环，不断将 `object` 赋值为 `object` 的 `key`，最后将 `object` 或者 `undefined` 返回。
