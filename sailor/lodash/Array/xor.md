## xor

> 创建一个包含了所有唯一值的数组。使用了 symmetric difference 等值比较。

```js
_.xor([arrays])
```

```js
/**
 * Creates an array of unique values that is the
 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
 * of the given arrays. The order of result values is determined by the order
 * they occur in the arrays.
 *
 * @since 2.4.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of filtered values.
 * @see difference, union, unionBy, unionWith, without, xorBy, xorWith
 * @example
 *
 * xor([2, 1], [2, 3])
 * // => [1, 3]
 */
function xor(...arrays) {
  return baseXor(filter(arrays, isArrayLikeObject))
}
```

## xorBy

> 这个方法类似 _.xor，除了它接受一个 iteratee 调用每一个数组和值。iteratee 会传入一个参数：(value)。

```js
_.xorBy([arrays], [iteratee=_.identity])
```

```js
/**
 * This method is like `xor` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by
 * which they're compared. The order of result values is determined
 * by the order they occur in the arrays. The iteratee is invoked with one
 * argument: (value).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @see difference, union, unionBy, unionWith, without, xor, xorWith
 * @example
 *
 * xorBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [1.2, 3.4]
 */
function xorBy(...arrays) {
  let iteratee = last(arrays)
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined
  }
  return baseXor(filter(arrays, isArrayLikeObject), iteratee)
}
```

## xorWith
