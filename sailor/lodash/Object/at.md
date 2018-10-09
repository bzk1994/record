## at

> 根据 object 的路径获取值为数组。

```js
_.at(object, [paths])
```

```js
/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @since 1.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Array} Returns the picked values.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }, 4] }
 *
 * at(object, ['a[0].b.c', 'a[1]'])
 * // => [3, 4]
 */
function at(...paths) {
  return baseAt(paths)
}
```

`at` 是 `baseAt` 的包装。

## baseAt

```js
/**
 * The base implementation of `at` without support for individual paths.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {string[]} paths The property paths to pick.
 * @returns {Array} Returns the picked elements.
 */
function baseAt(object, paths) {
  let index = -1
  const length = paths.length
  const result = new Array(length)
  const skip = object == null

  while (++index < length) {
    result[index] = skip ? undefined : get(object, paths[index])
  }
  return result
}
```

`baseAt` 函数接收 2 个参数，`object` 迭代对象、`paths` 路径数组。

申明初始变量，进入 `while` 循环， `index` 累加，如果 `object` 为 `null`，就赋值为 `undefined`，如果有值就调用 `get` 获取对应的属性值，然后插入 `result` 数组，最后将数组返回。

## get

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

`get` 函数接收 3 个参数，`object` 对象、`path` 路径、`defaultValue` 默认值。

如果 `object` 不为 `null`，调用 `baseGet` 函数赋值给 `result`，最后判断 `result` 为 `undefined` 返回默认值，否则返回 `result`。



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

`baseGet` 函数接收 2 个参数，`object` 对象、`path` 路径。

调用 `castPath` 函数将路径解析成数组形式，然后进入 `while` 循环，不断从 `object` 取出路径对应的值，最后将 `object` 最终取出的值返回，否则返回 `undefined`。


## castPath

```js
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (Array.isArray(value)) {
    return value
  }
  return isKey(value, object) ? [value] : stringToPath(value)
}
```
