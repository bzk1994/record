## toLower

> 转换整体的字符串为小写

```js
_.toLower([string=''])
```

```js
/**
  * Converts `string`, as a whole, to lower case just like
  * [String#toLowerCase](https://mdn.io/toLowerCase).
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category String
  * @param {string} [string=''] The string to convert.
  * @returns {string} Returns the lower cased string.
  * @example
  *
  * _.toLower('--Foo-Bar--');
  * // => '--foo-bar--'
  *
  * _.toLower('fooBar');
  * // => 'foobar'
  *
  * _.toLower('__FOO_BAR__');
  * // => '__foo_bar__'
  */
function toLower(value) {
  return toString(value).toLowerCase();
}
```

`toLower` 函数会将 `value` 处理成字符串，并调用原生 `toLowerCase` 函数。

## toUpper

> 转换整体的字符串为大写

```js
_.toUpper([string=''])
```

```js
/**
  * Converts `string`, as a whole, to upper case just like
  * [String#toUpperCase](https://mdn.io/toUpperCase).
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category String
  * @param {string} [string=''] The string to convert.
  * @returns {string} Returns the upper cased string.
  * @example
  *
  * _.toUpper('--foo-bar--');
  * // => '--FOO-BAR--'
  *
  * _.toUpper('fooBar');
  * // => 'FOOBAR'
  *
  * _.toUpper('__foo_bar__');
  * // => '__FOO_BAR__'
  */
function toUpper(value) {
  return toString(value).toUpperCase();
}
```

`toUpper` 函数会将 `value` 处理成字符串，并调用原生 `toUpperCase` 函数。
