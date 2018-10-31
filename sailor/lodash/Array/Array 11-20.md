
## fill

> 指定 value 填充数组，从 start 到 end 的位置，但不包括 end 本身的位置。 

```js
/**
 * Fills elements of `array` with `value` from `start` up to, but not
 * including, `end`.
 *
 * **Note:** This method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.2.0
 * @category Array
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _.fill(array, 'a');
 * console.log(array);
 * // => ['a', 'a', 'a']
 *
 * _.fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * _.fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 */
function fill(array, value, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
    start = 0;
    end = length;
  }
  return baseFill(array, value, start, end);
}
```

`fill` 函数接收 4 个参数，`array` 填充数组、`value` 填充的值、`start` 开始位置，`end` 结束位置。

首先申明 `length` 变量，保存数组 `length`，默认为 0，
如果没有 `length` 返回空数组。

接着判断如果有 `start` 并且 `start` 的类型不是 `number`，并且调用 `isIterateeCall` 函数检查参数是否来自迭代器调用，如果符合条件，将 `start` 赋值为 0，`end` 赋值为数组长度。

最后调用 `baseFill` 函数进行填充，并将填充后的数组返回。


`baseFill` 函数：

```js
function baseFill(array, value, start, end) {
  var length = array.length;

  start = toInteger(start);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : toInteger(end);
  if (end < 0) {
    end += length;
  }
  end = start > end ? 0 : toLength(end);
  while (start < end) {
    array[start++] = value;
  }
  return array;
}
```

`baseFill` 是 `fill` 函数的基本实现，首先是处理 `length`、 `start`、 `end` 变量。

申明 `length` 变量，保存数组 `length`，调用 `toInteger` 对 `start` 取整，这里会对 `start` 做临界判断，如果 `start < 0`，`-start > length` 就将 `start` 赋值为 0，否则就赋值为 `length + start`。

接着对 `end` 也做了临界判断，`end` 等于 `undefined` 或者大于 `length` 情况，将 `end` 赋值为 `length`，否则将 `length` 赋值为调用 `toInteger` 取整后的 `end`，
`end < 0`， 赋值为 `end += length`。

然后进入 `while` 循环， `start` 累加，将 `array[start]` 赋值为 `value`，最后将填充后的 `array` 返回。

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

首先申明 `length` 变量保存数组长度，默认为 0，如果没有长度返回 `-1`，接着会处理 `index` 起始下标，如果 `index` 小于 0 ，取 `length + index` 和 0 的最大值，最后调用 `baseFindIndex` 返回处理后的数组。


`baseFindIndex` 函数

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

开始申明 `length` 变量保存 `array` 长度，申明 `index` 初始下标，
接着通过 `while` 循环不断迭代， `fromRight` 为真 说明从右到左，`index` 累减，否则 `index` 累加小于数组长度，在循环中有个 `if` 判断，判断 `predicate` 函数的返回值判断是否为真，为真的话返回对象下标，否则返回 -1。

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

`findLastIndex` 函数和 `findIndex` 相似，只是调用 `baseFindIndex` 函数时传入了第四个参数为 `true`，
在 `baseFindIndex` 中 `fromRight` 为真就从右往左开始循环。

## first -> head

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

`head` 函数会返回一个三元表达式，如果传入 `array` 不为 `null` 并且有 `length` ，返回 `array` 的第一个，否则返回空数组。

## flatten

> 向上一级展平数组嵌套

```js
/**
 * Flattens `array` a single level deep.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flattenDeep, flattenDepth
 * @example
 *
 * flatten([1, [2, [3, [4]], 5]])
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  const length = array == null ? 0 : array.length
  return length ? baseFlatten(array, 1) : []
}
```

`flatten` 函数只接收 `array` 参数，首先申明 `length` 变量保存数组 `length`。

最后会返回一个三元表达式，如果 `length` 为 `true`，调用 `baseFlatten` 函数传参为 `array, 1` ，`baseFlatten` 会返回扁平化一层后的数组，
如果 `length` 为 `false` ，则返回空数组。

## flattenDeep

> 递归展平数组。

```js
/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/**
 * Recursively flattens `array`.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flatten, flattenDepth
 * @example
 *
 * flattenDeep([1, [2, [3, [4]], 5]])
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep(array) {
  const length = array == null ? 0 : array.length
  return length ? baseFlatten(array, INFINITY) : []
}
```

`flattenDeep` 函数与 `flatten` 函数相似，只是调用 `baseFlatten` 时传入了 `INFINITY`，`baseFlatten` 会去递归展平数组，返回全部展开的数组。

## flattenDepth

> 根据 depth 递归展平数组的层级。

```js
/**
 * Recursively flatten `array` up to `depth` times.
 *
 * @since 4.4.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @param {number} [depth=1] The maximum recursion depth.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flattenDeep
 * @example
 *
 * const array = [1, [2, [3, [4]], 5]]
 *
 * flattenDepth(array, 1)
 * // => [1, 2, [3, [4]], 5]
 *
 * flattenDepth(array, 2)
 * // => [1, 2, 3, [4], 5]
 */
function flattenDepth(array, depth) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  depth = depth === undefined ? 1 : +depth
  return baseFlatten(array, depth)
}
```

`flattenDepth` 函数接收 2 个参数，`array` 数组、`depth` 展平深度。

首先取出 `length` 长度，默认为 0，判断如果 `length` 为 `false`，返回空数组。

接着对 `depth` 进行处理，`depth`默认为 1 ，最后调用 `baseFlatten` 函数，并传入 `array ` 数组、`depth` 展平深度，返回递归展平后的数组。

## fromPairs

> 反向版 _.toPairs，这个方法返回一个由键值对构成的对象。

```js
/**
 * The inverse of `_.toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.fromPairs([['a', 1], ['b', 2]]);
 * // => { 'a': 1, 'b': 2 }
 */
function fromPairs(pairs) {
  var index = -1,
    length = pairs == null ? 0 : pairs.length,
    result = {};

  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
}
```

`fromPairs` 接收 `pairs` 数组，申明 `index` 为 -1、 `length` 数组 `pairs` 长度、`result` 空对象。
 
接着进行 `while` 循环，`index` 累加，申明 `pair` 变量保存当前循环的 `value`，接着以 `pair[0]` 为 `key` 、`pair[1]` 为 `value` 组装 `result` 对象，最后将 `result` 对象返回。

## head

> 获得数组的首个元素。

见 `first -> head`。

## indexOf

> 根据 value 使用 SameValueZero 等值比较返回数组中首次匹配的 index， 如果 fromIndex 为负值，将从数组尾端索引进行匹配，如果将 fromIndex 设置为 true，将使用更快的二进制检索机制。

```js
/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * indexOf([1, 2, 1, 2], 2)
 * // => 1
 *
 * // Search from the `fromIndex`.
 * indexOf([1, 2, 1, 2], 2, 2)
 * // => 3
 */
function indexOf(array, value, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = fromIndex == null ? 0 : +fromIndex
  if (index < 0) {
    index = Math.max(length + index, 0)
  }
  return baseIndexOf(array, value, index)
}
```

`indexOf` 函数接收 3 个参数， `array` 匹配数组、`value` 匹配值、`fromIndex` 起始位置。

申明 `length` 变量，默认为 0，如果 `length` 为 `false` 返回 -1，
申明 `index` 变量保存 `fromIndex` 起始位置，默认为 0，
如果 `index` 小于 0，将 `index` 赋值为 `length + index` 和 0 之间的最大值。

最后会返回调用 `baseIndexOf` 函数返回的下标。
