## sortBy

> 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 会传入1个参数：(value)。


```js
_.sortBy(collection, [iteratees=[_.identity]])
```

```js
/**
  * Creates an array of elements, sorted in ascending order by the results of
  * running each element in a collection thru each iteratee. This method
  * performs a stable sort, that is, it preserves the original sort order of
  * equal elements. The iteratees are invoked with one argument: (value).
  *
  * @static
  * @memberOf _
  * @since 0.1.0
  * @category Collection
  * @param {Array|Object} collection The collection to iterate over.
  * @param {...(Function|Function[])} [iteratees=[_.identity]]
  *  The iteratees to sort by.
  * @returns {Array} Returns the new sorted array.
  * @example
  *
  * var users = [
  *   { 'user': 'fred',   'age': 48 },
  *   { 'user': 'barney', 'age': 36 },
  *   { 'user': 'fred',   'age': 40 },
  *   { 'user': 'barney', 'age': 34 }
  * ];
  *
  * _.sortBy(users, [function(o) { return o.user; }]);
  * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
  *
  * _.sortBy(users, ['user', 'age']);
  * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
  */
var sortBy = baseRest(function (collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});
```

`orderBy` 是`sortBy` 函数的复杂实现，`sortBy` 接收 2 个参数，`collection` 集合、 `iteratees` 迭代器函数。

`iteratees` 可以接收数组形式的参数，如果长度大于 1，并且调用 `isIterateeCall` 判断是否来自迭代器调用,
最后调用 `baseOrderBy` 方法，将 `collection` 和 调用 `baseFlatten` 函数扁平化的 `iteratees` 迭代器函数数组传入，相比于 `orderBy` 第三个参数传了一个空数组，不会进行定制排序。




## isIterateeCall

> 检查给定参数是否来自迭代器调用。

```js
/**
  * Checks if the given arguments are from an iteratee call.
  *
  * @private
  * @param {*} value The potential iteratee value argument.
  * @param {*} index The potential iteratee index or key argument.
  * @param {*} object The potential iteratee object argument.
  * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
  *  else `false`.
  */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
    ? (isArrayLike(object) && isIndex(index, object.length))
    : (type == 'string' && index in object)
  ) {
    return eq(object[index], value);
  }
  return false;
}
```