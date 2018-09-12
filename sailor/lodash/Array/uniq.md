## uniq

> 创建一个不重复的数组副本。使用了 SameValueZero 等值比较。只有首次出现的元素才会被保留。

```js
_.uniq(array)
```

```
/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @see uniqBy, uniqWith
 * @example
 *
 * uniq([2, 1, 2])
 * // => [2, 1]
 */
function uniq(array) {
  return (array != null && array.length)
    ? baseUniq(array)
    : []
}
```

## uniqBy

> 这个方法类似 _.uniq，除了它接受一个 iteratee 调用每一个数组和值来计算唯一性。iteratee 会传入一个参数：(value)。

```js
_.uniqBy(array, [iteratee=_.identity])
```

```js
/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @see uniqBy, uniqWith
 * @example
 *
 * uniq([2, 1, 2])
 * // => [2, 1]
 */
function uniq(array) {
  return (array != null && array.length)
    ? baseUniq(array)
    : []
}
```

## uniqWith

> 这个方法类似 _.uniq，除了它接受一个 iteratee 调用每一个数组和值来计算唯一性。iteratee 会传入一个参数：(value)。

```js
_.uniqWith(array, [comparator])
```

```js
/**
 * This method is like `uniq` except that it accepts `comparator` which
 * is invoked to compare elements of `array`. The order of result values is
 * determined by the order they occur in the array.The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @see uniq, uniqBy
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * uniqWith(objects, isEqual)
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 */
function uniqWith(array, comparator) {
  comparator = typeof comparator == 'function' ? comparator : undefined
  return (array != null && array.length)
    ? baseUniq(array, undefined, comparator)
    : []
}
```