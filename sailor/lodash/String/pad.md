## pad

> 如果字符串长度小于 length 则从左到右填充字符。 如果没法平均分配，则截断超出的长度。

```js
_.pad([string=''], [length=0], [chars=' '])
```

```js
/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * pad('abc', 8)
 * // => '  abc   '
 *
 * pad('abc', 8, '_-')
 * // => '_-abc_-_'
 *
 * pad('abc', 2)
 * // => 'abc'
 */
function pad(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  if (!length || strLength >= length) {
    return string
  }
  const mid = (length - strLength) / 2
  return (
    createPadding(Math.floor(mid), chars) +
    string +
    createPadding(Math.ceil(mid), chars)
  )
}
```

`pad` 函数接收 3 次参数，`string` 填充字符串、`length` 填充长度、`chars` 用作填充的字符串。

申明 `strLength` 变量保存 `string` 的符号长度，做一些非空判断，申明 `mid` 单边需要填充的长度，调用 `createPadding` 函数返回填充字符串，字符串拼接后返回。


## padEnd

> 如果字符串长度小于 length 则在右侧填充字符。 如果超出长度则截断超出的部分。

```js
_.padEnd([string=''], [length=0], [chars=' '])
```

```js
/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * padEnd('abc', 6)
 * // => 'abc   '
 *
 * padEnd('abc', 6, '_-')
 * // => 'abc_-_'
 *
 * padEnd('abc', 2)
 * // => 'abc'
 */
function padEnd(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)
    ? (string + createPadding(length - strLength, chars))
    : string
}
```

`padEnd` 函数与 `pad` 相似，不用做平均填充，直接填充到右侧，返回一个 3 元表达式，如果 `strLength` 大于 `length` 拼接 `string` 和 调用 `createPadding` 后返回的拼接字符串，然后返回。

## padStart

> 如果字符串长度小于 length 则在左侧填充字符。 如果超出长度则截断超出的部分。

```js
_.padStart([string=''], [length=0], [chars=' '])
```

```js
/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * padStart('abc', 6)
 * // => '   abc'
 *
 * padStart('abc', 6, '_-')
 * // => '_-_abc'
 *
 * padStart('abc', 2)
 * // => 'abc'
 */
function padStart(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)
    ? (createPadding(length - strLength, chars) + string)
    : string
}
```

`padStart` 与 `padEnd` 函数相似，只是拼接字符串在前面。

