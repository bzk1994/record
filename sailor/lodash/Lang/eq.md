## eq

> 执行 SameValueZero 比较两者的值确定它们是否相等。

```js
_.eq(value, other)
```

```js
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * const object = { 'a': 1 }
 * const other = { 'a': 1 }
 *
 * eq(object, object)
 * // => true
 *
 * eq(object, other)
 * // => false
 *
 * eq('a', 'a')
 * // => true
 *
 * eq('a', Object('a'))
 * // => false
 *
 * eq(NaN, NaN)
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other)
}
```

`eq` 接收 2 个比较的 `value`，使用 `===` 判断是否全等或者是 `value !== value && other !== other`，加上了当 `value` 是 `NaN` 判断。
