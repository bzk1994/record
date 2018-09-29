## gt

> 检查 value 是否大于 other

```js
_.gt(value, other)
```

```js

/**
 * Checks if `value` is greater than `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 * @see gte, lt, lte
 * @example
 *
 * gt(3, 1)
 * // => true
 *
 * gt(3, 3)
 * // => false
 *
 * gt(1, 3)
 * // => false
 */
function gt(value, other) {
  if (!(typeof value == 'string' && typeof other == 'string')) {
    value = +value
    other = +other
  }
  return value > other
}
```

`gt` 首先会进行类型的判断，如果当 `value` 、`other` 都为字符串时，为防止字符串拼接，使用 `+` 转化为数字，当只有一个字符串时使用 `>` 有会隐式转换的效果，将另一个不是数字的 `value` 转化为数字。

## gte

> 检查 value 是否大于等于 other。

```js
/**
 * Checks if `value` is greater than or equal to `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than or equal to
 *  `other`, else `false`.
 * @see gt, lt, lte
 * @example
 *
 * gte(3, 1)
 * // => true
 *
 * gte(3, 3)
 * // => true
 *
 * gte(1, 3)
 * // => false
 */
function gte(value, other) {
  if (!(typeof value == 'string' && typeof other == 'string')) {
    value = +value
    other = +other
  }
  return value >= other
}
```

`gte` 与 `gt` 实现一致，返回 `value >= other` 。

## lt

> 检查 value 是否是 小于 other。

```js
_.lt(value, other)
```

```js
/**
 * Checks if `value` is less than `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`,
 *  else `false`.
 * @see gt, gte, lte
 * @example
 *
 * lt(1, 3)
 * // => true
 *
 * lt(3, 3)
 * // => false
 *
 * lt(3, 1)
 * // => false
 */
function lt(value, other) {
  if (!(typeof value == 'string' && typeof other == 'string')) {
    value = +value
    other = +other
  }
  return value < other
}
```

与 `gt` 实现基本一致，返回 `value > other`。

## lte

> 检查 value 是否是 小于等于 other.

```js
_.lte(value, other)
```

```js
/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than or equal to
 *  `other`, else `false`.
 * @see gt, gte, lt
 * @example
 *
 * lte(1, 3)
 * // => true
 *
 * lte(3, 3)
 * // => true
 *
 * lte(3, 1)
 * // => false
 */
function lte(value, other) {
  if (!(typeof value == 'string' && typeof other == 'string')) {
    value = +value
    other = +other
  }
  return value <= other
}
```

与 `gt` 实现基本一致，返回 `value <= other`。
