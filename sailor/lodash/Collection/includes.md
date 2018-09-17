## includes

> 检查 值 是否在 集合中，如果集合是字符串，那么检查 值 是否在字符串中。 其他情况用 SameValueZero 等值比较。 如果指定 fromIndex 是负数，从结尾开始检索。

```js
_.includes(collection, value, [fromIndex=0])
```

```js
/**
  * Checks if `value` is in `collection`. If `collection` is a string, it's
  * checked for a substring of `value`, otherwise
  * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
  * is used for equality comparisons. If `fromIndex` is negative, it's used as
  * the offset from the end of `collection`.
  *
  * @static
  * @memberOf _
  * @since 0.1.0
  * @category Collection
  * @param {Array|Object|string} collection The collection to inspect.
  * @param {*} value The value to search for.
  * @param {number} [fromIndex=0] The index to search from.
  * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
  * @returns {boolean} Returns `true` if `value` is found, else `false`.
  * @example
  *
  * _.includes([1, 2, 3], 1);
  * // => true
  *
  * _.includes([1, 2, 3], 1, 2);
  * // => false
  *
  * _.includes({ 'a': 1, 'b': 2 }, 1);
  * // => true
  *
  * _.includes('abcd', 'bc');
  * // => true
  */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}
```

`includes` 函数接收 4 个参数，`collection` 集合、`value` 检索的值、`fromIndex` 检索下标、`guard` 是否允许迭代器语法。

处理 `collection` 成为数组，申明 `fromIndex` 、`length` 初始变量，接着处理 `fromIndex` 为负数的情况，`Math.max` 方法返回最大值。

```js
var nativeMax = Math.max
```

最后返回一个三元表达式，如果 `collection` 是字符串，使用 `indexOf` ，否则使用 `baseIndexOf` 方法返回布尔值。

