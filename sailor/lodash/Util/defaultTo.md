## defaultTo

> 如果value为NaN，null或undefined，则返回defaultValue。

```js
_.defaultTo(value, defaultValue)
```

```js

/**
 * Checks `value` to determine whether a default value should be returned in
 * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
 * or `undefined`.
 *
 * @since 4.14.0
 * @category Util
 * @param {*} value The value to check.
 * @param {*} defaultValue The default value.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * defaultTo(1, 10)
 * // => 1
 *
 * defaultTo(undefined, 10)
 * // => 10
 */
function defaultTo(value, defaultValue) {
  return (value == null || value !== value) ? defaultValue : value
}
```

`defaultTo` 函数会对 `value` 进行判断，等于 `null` 或者不等于自身(不是 `NaN`)，返回 `defaultValue` 默认值，否则返回 `value`。
