## unset

> 移除对象路径的属性。 注意: 这个方法会改变源对象

```js
_.unset(object, path)
```

```js
/**
 * Removes the property at `path` of `object`.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 * @see get, has, set
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 7 } }] }
 * unset(object, 'a[0].b.c')
 * // => true
 *
 * console.log(object)
 * // => { 'a': [{ 'b': {} }] }
 *
 * unset(object, ['a', '0', 'b', 'c'])
 * // => true
 *
 * console.log(object)
 * // => { 'a': [{ 'b': {} }] }
 */
function unset(object, path) {
  return object == null ? true : baseUnset(object, path)
}
```

`unset` 函数与 `set` 函数相似，是 `baseUnset` 函数的简单包装。


## baseUnset

```js
/**
 * The base implementation of `unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object)
  object = parent(object, path)
  return object == null || delete object[toKey(last(path))]
}
```

`baseUnset` 函数时 `unset` 的基本实现，首先调用 `castPath` 处理 `path`，调用 `parent` 函数获取 `object` 的父值，这里会返回 `object` 为 `null` 或者删除 `object` 的最后一个 `path` 的 `key` 值。
