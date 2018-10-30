## property

> 创建一个返回给定对象的 path 的值的函数。

```js
_.property(path)
```

```js
/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * const objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ]
 *
 * map(objects, property('a.b'))
 * // => [2, 1]
 *
 * map(sortBy(objects, property(['a', 'b'])), 'a.b')
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path)
}
```

这里会调用 `isKey` 判断 `path` 如果是 `key` 属性，调用 `baseProperty` 函数并且传入 `toKey` 调用后的 `path`，`baseProperty` 函数会返回一个获取函数值的函数。

```js
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}
```

`basePropertyDeep` 函数会返回 `function`，调用 `function` 后会返回 `baseGet` 函数的调用返回

```js
function basePropertyDeep(path) {
    return function (object) {
      return baseGet(object, path);
    };
  }
```

```js
function baseGet(object, path) {
    path = castPath(path, object);

    var index = 0,
      length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }
```

`baseGet` 函数取出 `path`，`while` 循环从 `object` 取出 `path` 对应值。

## propertyOf

> 反向版 _.property。 这个方法创建的函数返回给定 path 在对象上的值。

```js
_.propertyOf(object)
```

```js
/**
 * The opposite of `property`s method creates a function that returns
 * the value at a given path of `object`.
 *
 * @since 3.0.0
 * @category Util
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * const array = [0, 1, 2]
 * const object = { 'a': array, 'b': array, 'c': array }
 *
 * map(['a[2]', 'c[0]'], propertyOf(object))
 * // => [2, 0]
 *
 * map([['a', '2'], ['c', '0']], propertyOf(object))
 * // => [2, 0]
 */
function propertyOf(object) {
  return (path) => object == null ? undefined : baseGet(object, path)
}
```

`propertyOf` 函数返回一个 `function`，该 `function` 接收一个 `path` 路径，返回一个 3 元表达式，如果 `object` 等于 `null`，返回 `undefined`，否则返回 `baseGet` 函数函数调用。
