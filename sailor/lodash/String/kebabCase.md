## kebabCase

> 转换字符串为 kebab case。

```js
_.kebabCase([string=''])
```

```js
/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @see camelCase, lowerCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * kebabCase('Foo Bar')
 * // => 'foo-bar'
 *
 * kebabCase('fooBar')
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__')
 * // => 'foo-bar'
 */
const kebabCase = (string) => (
  words(`${string}`.replace(/['\u2019]/g, '')).reduce((result, word, index) => (
    result + (index ? '-' : '') + word.toLowerCase()
  ), '')
)
```

`kebabCase` 函数与 `camelCase` 函数相似，调用 `words` 函数连缀调用 `reduce` 函数，在回调函数中会将 `word` 转化为小写，并且用 `-` 拼接。
