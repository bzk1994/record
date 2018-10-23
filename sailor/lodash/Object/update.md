## update

> 此方法类似于_.set，除了接受 updater 生成要设置的值。

```js
_.update(object, path, updater)
```

```js
/**
 * This method is like `set` except that it accepts `updater` to produce the
 * value to set. Use `updateWith` to customize `path` creation. The `updater`
 * is invoked with one argument: (value).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 4.6.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} updater The function to produce the updated value.
 * @returns {Object} Returns `object`.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * update(object, 'a[0].b.c', n => n * n)
 * console.log(object.a[0].b.c)
 * // => 9
 *
 * update(object, 'x[0].y.z', n => n ? n + 1 : 0)
 * console.log(object.x[0].y.z)
 * // => 0
 */
function update(object, path, updater) {
  return object == null ? object : baseUpdate(object, path, updater)
}
```

`update` 函数接收 `object` 目标对象、`path` 路径、`updater` 更新函数。

`update` 函数是 `baseUpdate` 的简单包装。



## baseUpdate

```js
/**
 * The base implementation of `update`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to update.
 * @param {Function} updater The function to produce the updated value.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseUpdate(object, path, updater, customizer) {
  return baseSet(object, path, updater(baseGet(object, path)), customizer)
}
```

`baseUpdate` 函数内部会调用 `baseSet` 函数。

调用 `baseSet` 的第三个参数:

```js
`updater(baseGet(object, path))` 
```

这里调用 `baseGet` 函数获取 `object` 上 `path` 对应的 `value`，然后调用 `updater` 函数生成新的 `value`，最后将调用 `baseSet` 函数后的 `object` 返回。

## updateWith

> 此方法类似于_.setWith，除了接受 updater 生成要设置的值。

```js
_.updateWith(object, path, updater, [customizer])
```

```js
/**
 * This method is like `update` except that it accepts `customizer` which is
 * invoked to produce the objects of `path`. If `customizer` returns `undefined`
 * path creation is handled by the method instead. The `customizer` is invoked
 * with three arguments: (nsValue, key, nsObject).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 4.6.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} updater The function to produce the updated value.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * const object = {}
 *
 * updateWith(object, '[0][1]', () => 'a', Object)
 * // => { '0': { '1': 'a' } }
 */
function updateWith(object, path, updater, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined
  return object == null ? object : baseUpdate(object, path, updater, customizer)
}
```

`updateWith` 函数与 `update` 函数相似，只是多了一个参数 `customizer` 自定义函数，首先会对 `customizer` 做类型判断，不是 `function` 置为 `undefined`，然后调用 `baseUpdate` 函数，多传入了 `customizer` 函数，最后将处理后的 `object` 返回。