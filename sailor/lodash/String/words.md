## words

> 拆分字符串中的词为数组

```js
_.words([string=''], [pattern])
```

```js
/**
 * Splits `string` into an array of its words.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * words('fred, barney, & pebbles')
 * // => ['fred', 'barney', 'pebbles']
 *
 * words('fred, barney, & pebbles', /[^, ]+/g)
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern) {
  if (pattern === undefined) {
    const result = hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string)
    return result || []
  }
  return string.match(pattern) || []
}
```

`words` 函数首先会判断 `pattern` 是否为 `undefined`，这个会调用 `hasUnicodeWord` 判断如果有 `Unicode`，就调用 `unicodeWords` 处理 `string`，否则就用 `vasciiWords`，然后将 `result` 返回。

```js
const asciiWords = RegExp.prototype.exec.bind(
  /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g
)
const hasUnicodeWord = RegExp.prototype.test.bind(
  /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
)
```

如果有传入 `pattern` ，直接调用 `pattern` 返回。
