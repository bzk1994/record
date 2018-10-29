## method

> 创建一个调用给定对象 path 上的函数。 任何附加的参数都会传入这个调用函数中。

```js
_.method(path, [args])
```

```js
import invoke from './invoke.js'

/**
 * Creates a function that invokes the method at `path` of a given object.
 * Any additional arguments are provided to the invoked method.
 *
 * @since 3.7.0
 * @category Util
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} [args] The arguments to invoke the method with.
 * @returns {Function} Returns the new invoker function.
 * @example
 *
 * const objects = [
 *   { 'a': { 'b': () => 2 } },
 *   { 'a': { 'b': () => 1 } }
 * ]
 *
 * map(objects, method('a.b'))
 * // => [2, 1]
 *
 * map(objects, method(['a', 'b']))
 * // => [2, 1]
 */
function method(path, args) {
  return (object) => invoke(object, path, args)
}
```

`method` 函数会 `return` 一个 `function`，在这个 `function` 中，接收一个 `object` 入参，并且调用 `invoke` 函数，将 `object`、`path`、`args` 参数传入。

## invoke

```js
 /**
  * Invokes the method at `path` of `object`.
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Object
  * @param {Object} object The object to query.
  * @param {Array|string} path The path of the method to invoke.
  * @param {...*} [args] The arguments to invoke the method with.
  * @returns {*} Returns the result of the invoked method.
  * @example
  *
  * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
  *
  * _.invoke(object, 'a[0].b.c.slice', 1, 3);
  * // => [2, 3]
  */
var invoke = baseRest(baseInvoke);
```

`invoke` 函数是调用 `baseRest` 函数，并传入 `baseInvoke` 后返回的函数。

## baseInvoke

```js
/**
  * The base implementation of `_.invoke` without support for individual
  * method arguments.
  *
  * @private
  * @param {Object} object The object to query.
  * @param {Array|string} path The path of the method to invoke.
  * @param {Array} args The arguments to invoke the method with.
  * @returns {*} Returns the result of the invoked method.
  */
function baseInvoke(object, path, args) {
  path = castPath(path, object);
  object = parent(object, path);
  var func = object == null ? object : object[toKey(last(path))];
  return func == null ? undefined : apply(func, object, args);
}
```

`baseInvoke` 函数调用 `castPath` 处理 `path` 得到 `path` 数组，调用 `parent` 获取 `object` 父级，这里会尝试获取 `path` 对应的 `object` 中的 `value`，然后返回一个 `apply` 将 `this` 指向 `object` 的 `func`。

## baseRest

`baseRest` 详见 `assign.md`

## methodOf

> 反向版 _.method。 这个创建一个函数调用给定 object 的 path 上的方法， 任何附加的参数都会传入这个调用函数中。

```js
_.methodOf(object, [args])
```

```js
import invoke from './invoke.js'

/**
 * The opposite of `method` this method creates a function that invokes
 * the method at a given path of `object`. Any additional arguments are
 * provided to the invoked method.
 *
 * @since 3.7.0
 * @category Util
 * @param {Object} object The object to query.
 * @param {Array} [args] The arguments to invoke the method with.
 * @returns {Function} Returns the new invoker function.
 * @example
 *
 * const array = times(3, i => () => i)
 * const object = { 'a': array, 'b': array, 'c': array }
 *
 * map(['a[2]', 'c[0]'], methodOf(object))
 * // => [2, 0]
 *
 * map([['a', '2'], ['c', '0']], methodOf(object))
 * // => [2, 0]f
 */
function methodOf(object, args) {
  return (path) => invoke(object, path, args)
}
```

`methodOf` 与 `method` 函数相似。