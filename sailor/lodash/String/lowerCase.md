## lowerCase

> 以空格分开单词并转换为小写。

```js
_.lowerCase([string=''])
```

```js
const reQuotes = /['\u2019]/g

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @see camelCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * lowerCase('--Foo-Bar--')
 * // => 'foo bar'
 *
 * lowerCase('fooBar')
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__')
 * // => 'foo bar'
 */
const lowerCase = (string) => (
  words(`${string}`.replace(reQuotes, '')).reduce((result, word, index) => (
    result + (index ? ' ' : '') + word.toLowerCase()
  ), '')
)
```

`kebabCase` 函数与 `camelCase` 函数相似，调用 `words` 函数连缀调用 `reduce` 函数，在回调函数中会将 `word` 转化为小写，并且用空格拼接。


## lowerFirst

> 转换首字母为小写。

```js
_.lowerFirst([string=''])
```

```js
/**
 * Converts the first character of `string` to lower case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * lowerFirst('Fred')
 * // => 'fred'
 *
 * lowerFirst('FRED')
 * // => 'fRED'
 */
const lowerFirst = createCaseFirst('toLowerCase')
```

`lowerFirst` 函数是调用 `createCaseFirst` 函数，传入 `toLowerCase` 返回的函数。

## createCaseFirst

```js
/**
 * Creates a function like `lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return (string) => {
    const strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined

    const chr = strSymbols
      ? strSymbols[0]
      : string[0]

    const trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1)

    return chr[methodName]() + trailing
  }
}
```

`createCaseFirst` 返回一个 `function`，申明 `strSymbols` 标识是否 `Unicode` 字符串，有就调用 `stringToArray` 转化为字符串，没有就赋值为 `undefined`，申明 `chr` 从 `strSymbols` 取出第一个，申明 `trailing` 变量保存删除第一个字符串的 `string`，最后调用传入的 `methodName` 方法也就是 `toLowerCase` 函数并且拼接后返回。
