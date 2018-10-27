## upperCase

> 转换字符串为空格分割的大写单词

```js
_.upperCase([string=''])
```

```js
/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @see camelCase, kebabCase, lowerCase, snakeCase, startCase, upperFirst
 * @example
 *
 * upperCase('--foo-bar')
 * // => 'FOO BAR'
 *
 * upperCase('fooBar')
 * // => 'FOO BAR'
 *
 * upperCase('__foo_bar__')
 * // => 'FOO BAR'
 */
const upperCase = (string) => (
  words(`${string}`.replace(/['\u2019]/g, '')).reduce((result, word, index) => (
    result + (index ? ' ' : '') + word.toUpperCase()
  ), '')
)
```

`upperCase` 函数与 `kebabCase` 函数相似，只是用空格作为分隔符，并且调用 `toUpperCase` 将 `word` 转化为大写。

## upperFirst

> 

```js

```

```js
/**
 * Converts the first character of `string` to upper case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @see camelCase, kebabCase, lowerCase, snakeCase, startCase, upperCase
 * @example
 *
 * upperFirst('fred')
 * // => 'Fred'
 *
 * upperFirst('FRED')
 * // => 'FRED'
 */
const upperFirst = createCaseFirst('toUpperCase')
```

与 `lowerFirst` 函数相似，`upperFirst` 函数是调用 `createCaseFirst` 函数，传入 `toUpperCase` 返回的函数。



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