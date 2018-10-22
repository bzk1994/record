## set

> 设置值到对象对应的属性路径上，如果没有则创建这部分路径。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 使用 _.setWith 定制创建。

```js
_.set(object, path, value)
```

```js
/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @see has, hasIn, get, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * set(object, 'a[0].b.c', 4)
 * console.log(object.a[0].b.c)
 * // => 4
 *
 * set(object, ['x', '0', 'y', 'z'], 5)
 * console.log(object.x[0].y.z)
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value)
}
```

`set` 函数接收 3 个参数，`object` 设置对象、`path` 设置路径、`value` 设置的值。

`set` 函数时 `baseSet` 的简单包装。

## baseSet

```js
/**
 * The base implementation of `set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object
  }
  path = castPath(path, object)

  const length = path.length
  const lastIndex = length - 1

  let index = -1
  let nested = object

  while (nested != null && ++index < length) {
    const key = toKey(path[index])
    let newValue = value

    if (index != lastIndex) {
      const objValue = nested[key]
      newValue = customizer ? customizer(objValue, key, nested) : undefined
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {})
      }
    }
    assignValue(nested, key, newValue)
    nested = nested[key]
  }
  return object
}
```

`baseSet` 函数首先会调用 `isObject` 判断 `object` 是否是对象，不是的话立刻返回，调用 `castPath` 函数尝试处理 `path`，申明一些基本变量，进入 `while` 循环， `index` 累加，在回调中会取出 `key` 和对应的 `value`，这里会对取出 `nested` 也就是 `obejct` 对象的 `key`，如果有传入的 `customizer` 函数会调用 `customizer` 生成新的 `newValue`，如果 `newValue` 为 `undefined`，说明当前对象没有对应路径的 `key`，这里会根据 `objValue` 的类型，尝试将 `newValue` 赋值为空数组或空对象，接着调用 `assignValue` 函数进行属性的赋值，并且对 `nested` 赋值为取出 `key` 后的值，最后将 `object` 返回。

## setWith

> 这个方法类似 _.set。 除了它接受一个 customizer 决定如何设置对象路径的值。 如果 customizer 返回 undefined 将会有它的处理方法代替。 customizer 会传入3个参数：(nsValue, key, nsObject) 注意: 这个方法会改变源对象。

```js
_.setWith(object, path, value, [customizer])
```

```js
/**
 * This method is like `set` except that it accepts `customizer` which is
 * invoked to produce the objects of `path`. If `customizer` returns `undefined`
 * path creation is handled by the method instead. The `customizer` is invoked
 * with three arguments: (nsValue, key, nsObject).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * const object = {}
 *
 * setWith(object, '[0][1]', 'a', Object)
 * // => { '0': { '1': 'a' } }
 */
function setWith(object, path, value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined
  return object == null ? object : baseSet(object, path, value, customizer)
}
```

`setWith` 函数与 `set` 相似，只是多了一个 `customizer` 处理函数，首先会对 `customizer` 对一些处理，如果不是 `fucntion` 就赋值为 `undefined`，然后调用 `baseSet` 函数传入 `customizer` 处理函数。