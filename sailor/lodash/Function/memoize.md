## memoize

> 创建一个会缓存 func 结果的函数。 如果提供了 resolver，就用 resolver 的返回值作为 key 缓存函数的结果。 默认情况下用第一个参数作为缓存的 key。 func 在调用时 this 会绑定在缓存函数上。

```js
_.memoize(func, [resolver])
```

```js
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * const object = { 'a': 1, 'b': 2 }
 * const other = { 'c': 3, 'd': 4 }
 *
 * const values = memoize(values)
 * values(object)
 * // => [1, 2]
 *
 * values(other)
 * // => [3, 4]
 *
 * object.a = 2
 * values(object)
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b'])
 * values(object)
 * // => ['a', 'b']
 *
 * // Replace `memoize.Cache`.
 * memoize.Cache = WeakMap
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError('Expected a function')
  }
  const memoized = function(...args) {
    const key = resolver ? resolver.apply(this, args) : args[0]
    const cache = memoized.cache

    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = func.apply(this, args)
    memoized.cache = cache.set(key, result) || cache
    return result
  }
  memoized.cache = new (memoize.Cache || MapCache)
  return memoized
}

memoize.Cache = MapCache
```

`memoize` 接收 2 个参数，`func` 需要缓存的函数、`resolver` 解析缓存 `key` 的函数。

函数开始是一个类型的 `func` 、`resolver` 的非空和类型判断，接着申明 `memoized` 函数：

```js
const memoized = function(...args) {
  const key = resolver ? resolver.apply(this, args) : args[0]
  const cache = memoized.cache

  if (cache.has(key)) {
    return cache.get(key)
  }
  const result = func.apply(this, args)
  memoized.cache = cache.set(key, result) || cache
  return result
}
```

`memoized` 函数内中首先申明 `resolver` 函数处理后的 `key`、函数的缓存对象 `cache`，接着调用 `has` 方法判断缓存中如果有这个 `key` 值，调用 `cache` 的 `get` 返回对象的 `value`。

如果缓存中没有 `key` 值，申明 `result` 变量保存使用 `apply` 调用的 `func` 函数的结果，然后为 `memoized` 的 `cache` 初始化缓存方法，最后返回 `result`。

```js
function memoize(func, resolver) {
  ...
  memoized.cache = new (memoize.Cache || MapCache)
  return memoized
}
```

`memoize` 函数的最后会为 `memoized` 添加 `cache` 属性，是 `memoize.Cache` 或者 `MapCache` 的实例，最后将 `memoized` 返回。

