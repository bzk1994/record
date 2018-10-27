## escape

> 转义字符 "&", "<", ">", '"', "'", 以及 "`" 为HTML实体字符。 

```js
_.escape([string=''])
```

```js
/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @since 0.1.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @see escapeRegExp, unescape
 * @example
 *
 * escape('fred, barney, & pebbles')
 * // => 'fred, barney, &amp pebbles'
 */
function escape(string) {
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])
    : string
}
```

`escape` 返回一个 3 元表达式，如果有 `string` 并且调用 `reHasUnescapedHtml` 匹配 `HTML` 字符串。

```js
/** Used to match HTML entities and HTML characters. */
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)
```
如果匹配成功调用 `replace` 方法，并传入回调函数，将匹配 `reUnescapedHtml` 到的 `HTML` 字符串字母映射到转义字符。

```js
/** Used to map characters to HTML entities. */
const htmlEscapes = {
  '&': '&amp',
  '<': '&lt',
  '>': '&gt',
  '"': '&quot',
  "'": '&#39'
}

const reUnescapedHtml = /[&<>"']/g
```

最后将处理完成 `string` 返回。

## escapeRegExp

> 转义RegExp 中特殊的字符 "^", "$", "\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", 以及 "|"。

```js
_.escapeRegExp([string=''])
```

```js
/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @see escape, escapeRegExp, unescape
 * @example
 *
 * escapeRegExp('[lodash](https://lodash.com/)')
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string
}
```

`escapeRegExp` 返回一个 3 元表达式，如果 `reHasRegExpChar` 匹配到特殊字符。

```js
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
const reHasRegExpChar = RegExp(reRegExpChar.source)
```

调用 `replace` 函数 `reRegExpChar` 匹配的字符串前面加上 `\`，最后将 `string` 返回。
