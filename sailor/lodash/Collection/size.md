## size

> 返回集合的长度或对象中可枚举属性的个数。

```js
_.size(collection)

// Example
_.size([1, 2, 3]);
// => 3
 
_.size({ 'a': 1, 'b': 2 });
// => 2
 
_.size('pebbles');
// => 7
```

```js
/** `Object#toString` result references. */
const mapTag = '[object Map]'
const setTag = '[object Set]'

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * size([1, 2, 3])
 * // => 3
 *
 * size({ 'a': 1, 'b': 2 })
 * // => 2
 *
 * size('pebbles')
 * // => 7
 */
function size(collection) {
  if (collection == null) {
    return 0
  }
  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length
  }
  const tag = getTag(collection)
  if (tag == mapTag || tag == setTag) {
    return collection.size
  }
  return Object.keys(collection).length
}
```

`collection` 可以是数组，对象，字符串。

如果是 `null` 返回 0，调用 `isArrayLike` 判断是否是类数组，如果是有 2 中可能，是字符串就调用 `stringSize` 返回字符串长度，不是字符串就返回 `collection` 的 `length` 。

使用 `getTag` 得到 `[object Type]` 形式的类型字符串，如果是 `Map`、`Set` 类型返回 `collection` 的长度，
经过上面的判断，应该只剩下 `Object` 类型了，调用 `Object.keys()` 将 `collection` 转成数组，返回数组长度。

