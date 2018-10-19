## has

> 检查 path 是否是对象的直接属性。s

```js
_.has(object, path)
```

```js
/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Checks if `key` is a direct property of `object`.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 * @see hasIn, hasPath, hasPathIn
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * has(object, 'a')
 * // => true
 *
 * has(other, 'a')
 * // => false
 */
function has(object, key) {
  return object != null && hasOwnProperty.call(object, key)
}
```

`has` 函数接收 2 个参数，`object` 检索参数、`key` 检索路径。

如果 `object` 不等于 `null` 并且调用 `Object.prototype.hasOwnProperty` 方法获取 `object` 是否有除原型属性 `key`。

## _.hasIn(object, path)

> 检查 path 是否是对象的直接 或者 继承属性。

```js
_.hasIn(object, path)
```

```js
/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 * @see has, hasPath, hasPathIn
 * @example
 *
 * const object = create({ 'a': create({ 'b': 2 }) })
 *
 * hasIn(object, 'a')
 * // => true
 *
 * hasIn(object, 'b')
 * // => false
 */
function hasIn(object, key) {
  return object != null && key in Object(object)
}
```

`hasIn` 函数与 `has` 相似，这里将 `Object.prototype.hasOwnProperty` 替换成 `key...in` 函数，` key...in` 函数会变量对象的原型属性。
