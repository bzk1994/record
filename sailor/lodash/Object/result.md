## result

> 这个方法类似 _.get。 除了如果解析到的值是一个函数的话，就绑定 this 到这个函数并返回执行后的结果。

```js
_.result(object, path, [defaultValue])
```

```js
/**
 * This method is like `get` except that if the resolved value is a
 * function it's invoked with the `this` binding of its parent object and
 * its result is returned.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to resolve.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c1': 3, 'c2': () => 4 } }] }
 *
 * result(object, 'a[0].b.c1')
 * // => 3
 *
 * result(object, 'a[0].b.c2')
 * // => 4
 *
 * result(object, 'a[0].b.c3', 'default')
 * // => 'default'
 *
 * result(object, 'a[0].b.c3', () => 'default')
 * // => 'default'
 */
function result(object, path, defaultValue) {
  path = castPath(path, object)

  let index = -1
  let length = path.length

  // Ensure the loop is entered when path is empty.
  if (!length) {
    length = 1
    object = undefined
  }
  while (++index < length) {
    let value = object == null ? undefined : object[toKey(path[index])]
    if (value === undefined) {
      index = length
      value = defaultValue
    }
    object = typeof value == 'function' ? value.call(object) : value
  }
  return object
}
```

`result` 函数接收 3 个参数，`object` 目标对象、`path` 解析路径、`defaultValue` 默认值。

首先会调用 `castPath` 函数尝试转化 `path` 路径，然后处理 `path` 没有长度的情况，进入 `while` 循环，`index` 累加，这里会调用 `toKey` 转化不是字符串的 `key`，如果没有 `value` 就将 `value` 设置为默认值，
接着会对 `value` 做一个类型判断，如果为 `function` 就调用 `call` 返回一个改变 `this` 的 `fucntion`，最后 `object` 返回。
