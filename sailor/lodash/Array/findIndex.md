## findIndex

> 这个方法类似 _.find。除了它返回最先通过 predicate 判断为真值的元素的 index ，而不是元素本身。

```js
/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, getIteratee(predicate, 3), index);
}
```

`findIndex` 函数接收 3 个参数，`array` 数组、`predicate` 迭代函数，`fromIndex` 搜索开始下标。

首先获取数组长度，没有长度返回 `-1`，`index` 起始下标处理，如果 `index` 小于 0 ，取 `length + index` 和 0 的最大值，最后调用 `baseFindIndex` 返回处理后的数组。


## baseFindIndex

> 返回数组中符合迭代函数的下标。

```js
/**
 * The base implementation of `findIndex` and `findLastIndex`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array
  let index = fromIndex + (fromRight ? 1 : -1)

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}
```

`findIndex` 函数接收 4 个参数，`array` 数组、`predicate` 迭代函数，`fromIndex` 搜索开始下标，`fromRight` 是否从右到左。

开始取出 `array` 长度，初始下标，通过 `while` 循环不断迭代， `fromRight` 为真 说明从右到左，`index` 累减，否则 `index` 累加小于数组长度，这个判断判断 `predicate` 函数的返回值判断是否符合条件，满足的话返回对象下标，否则返回 -1。

## findLastIndex

> 这个方式类似 _.findIndex ， 不过它是从右到左的。

```js
/**
  * This method is like `_.findIndex` except that it iterates over elements
  * of `collection` from right to left.
  *
  * @static
  * @memberOf _
  * @since 2.0.0
  * @category Array
  * @param {Array} array The array to inspect.
  * @param {Function} [predicate=_.identity] The function invoked per iteration.
  * @param {number} [fromIndex=array.length-1] The index to search from.
  * @returns {number} Returns the index of the found element, else `-1`.
  * @example
  *
  * var users = [
  *   { 'user': 'barney',  'active': true },
  *   { 'user': 'fred',    'active': false },
  *   { 'user': 'pebbles', 'active': false }
  * ];
  *
  * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
  * // => 2
  *
  * // The `_.matches` iteratee shorthand.
  * _.findLastIndex(users, { 'user': 'barney', 'active': true });
  * // => 0
  *
  * // The `_.matchesProperty` iteratee shorthand.
  * _.findLastIndex(users, ['active', false]);
  * // => 2
  *
  * // The `_.property` iteratee shorthand.
  * _.findLastIndex(users, 'active');
  * // => 0
  */
function findLastIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = length - 1;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = fromIndex < 0
      ? nativeMax(length + index, 0)
      : nativeMin(index, length - 1);
  }
  return baseFindIndex(array, getIteratee(predicate, 3), index, true);
}
```

`findLastIndex` 函数和 `findIndex` 相似，只是调用 `baseFindIndex` 函数传了第四个参数为 `true`，
在 `baseFindIndex` 中 `fromRight` 为真就从右往左开始循环。

## head

> 获得数组的首个元素。

```js
/**
 * Gets the first element of `array`.
 *
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @see last
 * @example
 *
 * head([1, 2, 3])
 * // => 1
 *
 * head([])
 * // => undefined
 */
function head(array) {
  return (array != null && array.length)
    ? array[0]
    : undefined
}
```

如果 `array` 不为 `null` 并且有长度返回 `array` 的第一个。
