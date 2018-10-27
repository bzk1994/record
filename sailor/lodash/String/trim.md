## trim

> 从字符串中移除前面和后面的空白 或 指定的字符。

```js
_.trim([string=''], [chars=whitespace])
```

```js
/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trimEnd, trimStart
 * @example
 *
 * trim('  abc  ')
 * // => 'abc'
 *
 * trim('-_-abc-_-', '_-')
 * // => 'abc'
 */
function trim(string, chars) {
  if (string && chars === undefined) {
    return string.trim()
  }
  if (!string || !chars) {
    return string
  }
  const strSymbols = stringToArray(string)
  const chrSymbols = stringToArray(chars)
  const start = charsStartIndex(strSymbols, chrSymbols)
  const end = charsEndIndex(strSymbols, chrSymbols) + 1

  return castSlice(strSymbols, start, end).join('')
}
```

`trim` 函数首先会对判断传入 `string` 的情况，没有传入 `chars`，调用 `trim` 函数取出字符串，接着是 `string` 和 `chars` 的非空判断。

这里会调用 `stringToArray` 函数将 `string`、`chars` 处理数组， 然后调用 `charsStartIndex` 函数得到 `start`、`end`。

最后调用 `castSlice` 进行数组切割，最后调用 `join('')` 合并成字符串返回。

## trimEnd

> 移除字符串后面的空白 或 指定的字符。

```js
_.trimEnd([string=''], [chars=whitespace])
```

```js
/**
 * Removes trailing whitespace or specified characters from `string`.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trim, trimStart
 * @example
 *
 * trimEnd('  abc  ')
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-')
 * // => '-_-abc'
 */
function trimEnd(string, chars) {
  if (string && chars === undefined) {
    return string[methodName]()
  }
  if (!string || !chars) {
    return string
  }
  const strSymbols = stringToArray(string)
  const end = charsEndIndex(strSymbols, stringToArray(chars)) + 1
  return castSlice(strSymbols, 0, end).join('')
}
```

`trimEnd` 函数判断如果没有 `chars` 直接调用 `trimRight` 或者 `trimEnd` 函数，然后会进行非空判断。

调用 `stringToArray` 将 `string` 处理成数组，调用 `charsEndIndex` 函数获取 `end`，最后调用 `castSlice` 函数切割数组，调用 `join('')` 组合成 `string` 返回。

## trimStart

> 移除字符串中前面的空白 或 指定的字符。

```js
_.trimStart([string=''], [chars=whitespace])
```

```js
const methodName =  ''.trimLeft ? 'trimLeft' : 'trimStart'

/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trim, trimEnd
 * @example
 *
 * trimStart('  abc  ')
 * // => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-')
 * // => 'abc-_-'
 */
function trimStart(string, chars) {
  if (string && chars === undefined) {
    return string[methodName]()
  }
  if (!string || !chars) {
    return string
  }
  const strSymbols = stringToArray(string)
  const start = charsStartIndex(strSymbols, stringToArray(chars))
  return castSlice(strSymbols, start).join('')
}
```

`trimStart` 函数与 `trimEnd`  函数相似，只是调用了 `charsStartIndex` 获取 `start`，调用 `castSlice` 截取数组后合并成 `string`。
