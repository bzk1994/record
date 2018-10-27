
## unescape

> 反向版 _.escape。 这个方法转换 HTML 实体 &amp;, &lt;, &gt;, &quot;, &#39;, 以及 &#96; 为对应的字符。 

```js
_.unescape([string=''])
```

```js
/** Used to map HTML entities to characters. */
const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
}

/** Used to match HTML entities and HTML characters. */
const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)

/**
 * The inverse of `escape`this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to
 * their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional
 * HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @since 0.6.0
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @returns {string} Returns the unescaped string.
 * @see escape, escapeRegExp
 * @example
 *
 * unescape('fred, barney, &amp; pebbles')
 * // => 'fred, barney, & pebbles'
 */
function unescape(string) {
  return (string && reHasEscapedHtml.test(string))
    ? string.replace(reEscapedHtml, (entity) => htmlUnescapes[entity])
    : string
}
```

`unescape` 函数返回一个 3 元表达式，首先会调用 `reHasEscapedHtml` 检测 `string` 中是否有 `HTML` 转义字符串，如果有的话就调用 `replace` 函数将将匹配 `reEscapedHtml` 到的 `HTML` 转义字符映射到`HTML` 字符串。

## 

> 

```js

```

```js

```

## 

> 

```js

```

```js

```

## 

> 

```js

```

```js

```