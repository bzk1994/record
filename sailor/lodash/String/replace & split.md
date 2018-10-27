## replace

> 替换字符串中匹配的内容为给定的内容 

```js
_.replace([string=''], pattern, replacement)
```

```js
/**
 * Replaces matches for `pattern` in `string` with `replacement`.
 *
 * **Note:** This method is based on
 * [`String#replace`](https://mdn.io/String/replace).
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to modify.
 * @param {RegExp|string} pattern The pattern to replace.
 * @param {Function|string} replacement The match replacement.
 * @returns {string} Returns the modified string.
 * @see truncate, trim
 * @example
 *
 * replace('Hi Fred', 'Fred', 'Barney')
 * // => 'Hi Barney'
 */
function replace(...args) {
  const string = `${args[0]}`
  return args.length < 3 ? string : string.replace(args[1], args[2])
}
```

`replace` 函数会申明 `string` 赋值为 `args` 的第一个，然后返回一个 3 元表达式，如果 `args.length < 3` 直接返回 `string`，否则调用 `replace` 直线字符串替换。

## split

> _.split([string=''], separator, [limit])


```js
_.split([string=''], separator, [limit])
```

```js
/**
 * Splits `string` by `separator`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the string segments.
 * @example
 *
 * split('a-b-c', '-', 2)
 * // => ['a', 'b']
 */
function split(string, separator, limit) {
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0
  if (!limit) {
    return []
  }
  if (string && (
        typeof separator == 'string' ||
        (separator != null && !isRegExp(separator))
      )) {
    if (!separator && hasUnicode(string)) {
      return castSlice(stringToArray(string), 0, limit)
    }
  }
  return string.split(separator, limit)
}
```

首先对 `limit` 处理，如果为 `undefined`，赋值为 `MAX_ARRAY_LENGTH`，否则用右移运算符 `>>> 0` 进行取整，`limit` 取非为真，返回空数组。

```js
/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295
```

接着会判断如果是 `separator` 是字符串或者 `separator` 不等于 `null` 并且不是正则，里面又有一个判断，
没有 `separator` 并且 `string` 是 `Unicode` 字符串，调用 `castSlice` 进行切割，不满足上面情况调用原生的 `split` 进行处理。
