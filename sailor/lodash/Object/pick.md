## pick

> 创建一个从 object 中选中的属性的对象。

```js
_.pick(object, [paths])
```

```js
/**
 * Creates an object composed of the picked `object` properties.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * pick(object, ['a', 'c'])
 * // => { 'a': 1, 'c': 3 }
 */
function pick(object, ...paths) {
  return object == null ? {} : basePick(object, paths)
}
```

`pick` 函数接收 2 个参数， `object` 目标对象、`paths` 属性数组。

`pick` 函数是 `basePick` 的简单包装。

## basePick

```js
/**
 * The base implementation of `pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, (value, path) => hasIn(object, path))
}
```

`basePick` 函数时 `pick` 的基本实现，会调用 `basePickBy` 函数，并传入回调，`basePickBy` 返回一个新的对象，在回调函数中，接收 2 个参数 `value, path`，并且调用 `hasIn` 函数检查对象的属性：

```js
function hasIn(object, key) {
  return object != null && key in Object(object)
}
```

## basePickBy

```js
/**
 * The base implementation of `pickBy`.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  let index = -1
  const length = paths.length
  const result = {}

  while (++index < length) {
    const path = paths[index]
    const value = baseGet(object, path)
    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value)
    }
  }
  return result
}
```

在 `basePickBy` 函数中会申明一些初始参数，然后进入 `while` 循环，`index` 累加，取出每次循环的 `path`、`value`，这里会调用 `basePick` 传入的 `predicate` 函数，如果对象上有这个 `key` 值就调用 `baseSet` 函数给 `result` 对象添加属性。

## pickBy

> 创建一个从 object 中经 predicate 判断为真值的属性为对象。 predicate 会传入1个参数：(value)

```js
_.pickBy(object, [predicate=_.identity])
```

```js
/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * pickBy(object, isNumber)
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(object, predicate) {
  if (object == null) {
    return {}
  }
  const props = map(getAllKeysIn(object), (prop) => [prop])
  return basePickBy(object, props, (value, path) => predicate(value, path[0]))
}
```

`pickBy` 函数接收 2 个参数，`object` 目标对象、`predicate` 迭代函数。

首先对 `object` 做非空处理，接着调用 `map` 函数，并且传入 `getAllKeysIn` 返回的对象 `key` 数组，和回调函数。

```js
function getAllKeysIn(object) {
  const result = []
  for (const key in object) {
    result.push(key)
  }
  if (!Array.isArray(object)) {
    result.push(...getSymbolsIn(object))
  }
  return result
}
```

`getAllKeysIn` 函数主要是调用 `for...in` 方法收集 `object` 上的 `key`，并插入 `result` 数组，最后将 `result` 返回。

```js
function map(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}
```

`map` 函数内部会调用 `while` 循环，不断将 `iteratee` 迭代函数处理后的 `value` 插入 `result` ，
` (prop) => [prop]` 迭代函数会将 `prop` 包装成数组返回。
最后返回 `result`。

在 `pickBy` 最后会调用 `basePickBy` 函数，传入 `object`、`props`、`(value, path) => predicate(value, path[0])` 回调函数，最后将函数处理后的对象返回。





