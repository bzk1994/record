## camelCase

> 转换字符串为驼峰写法

```js
_.camelCase([string=''])
```

```js
/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 */
const camelCase = (string) => (
  words(`${string}`.replace(/['\u2019]/g, '')).reduce((result, word, index) => {
    word = word.toLowerCase()
    return result + (index ? capitalize(word) : word)
  }, '')
)
```

`camelCase` 函数接收一个 `string` 字符串，在函数内部可以分为 2 段 `Code`：

```js
words(`${string}`.replace(/['\u2019]/g, ''))
```

`words` 函数负责将 `string` 拆分为数组，``${string}`.replace(/['\u2019]/g, '')` 是将单引号替换成空字符串。

### words

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

`words` 函数内部会判断 `pattern` 是否为 `undefined`，这里会调用 `hasUnicodeWord` 函数，匹配是否有 `Unicode`，就调用 `unicodeWords` 转化 `string`：

```js
const hasUnicodeWord = RegExp.prototype.test.bind(
  /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
)
```

否则就调用 `asciiWords` 函数转化 `string`：

```js
const asciiWords = RegExp.prototype.exec.bind(
  /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g
)
```
如果不是 `undefined`，就返回调用 `macth` 函数返回 `match(pattern)` 后的结果。

当 `words` 返回数组后，调用 `reduce` 函数进行迭代，传入初始值 ''。

```js
words(...).reduce((result, word, index) => {
  word = word.toLowerCase()
  return result + (index ? capitalize(word) : word)
}, '')
```

将字符串转换为小写，`capitalize`  函数会将 `word` 转化为第一个字符串大写，剩余小写，`result` 累加，最后返回累加后的字符串。
