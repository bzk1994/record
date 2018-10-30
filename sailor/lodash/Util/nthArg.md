## nthArg

> 创建一个返回第 N 个参数的函数。

```js
_.nthArg([n=0])
```

```js
/**
 * Creates a function that gets the argument at index `n`. If `n` is negative,
 * the nth argument from the end is returned.
 *
 * @since 4.0.0
 * @category Util
 * @param {number} [n=0] The index of the argument to return.
 * @returns {Function} Returns the new pass-thru function.
 * @example
 *
 * const func = nthArg(1)
 * func('a', 'b', 'c', 'd')
 * // => 'b'
 *
 * const func = nthArg(-2)
 * func('a', 'b', 'c', 'd')
 * // => 'c'
 */
function nthArg(n) {
  return (...args) => nth(args, n)
}
```

`nthArg` 函数返回一个 `function`，这个 `function` 接收 `args` 数组参数，返回调用 `nth` 函数后的返回。

## nth

```js
/**
  * Gets the element at index `n` of `array`. If `n` is negative, the nth
  * element from the end is returned.
  *
  * @static
  * @memberOf _
  * @since 4.11.0
  * @category Array
  * @param {Array} array The array to query.
  * @param {number} [n=0] The index of the element to return.
  * @returns {*} Returns the nth element of `array`.
  * @example
  *
  * var array = ['a', 'b', 'c', 'd'];
  *
  * _.nth(array, 1);
  * // => 'b'
  *
  * _.nth(array, -2);
  * // => 'c';
  */
function nth(array, n) {
  return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
}
```

`nth` 会对 `array` 做长度判断吗，如果有长度返回调用 `baseNth` 函数的值，否则返回 `undefined`。

## baseNth

```js
/**
  * The base implementation of `_.nth` which doesn't coerce arguments.
  *
  * @private
  * @param {Array} array The array to query.
  * @param {number} n The index of the element to return.
  * @returns {*} Returns the nth element of `array`.
  */
function baseNth(array, n) {
  var length = array.length;
  if (!length) {
    return;
  }
  n += n < 0 ? length : 0;
  return isIndex(n, length) ? array[n] : undefined;
}
```

`baseNth` 函数会返回数组对应的 `n` 个，如果没返回 `undefined`。
