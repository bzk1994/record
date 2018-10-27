## parseInt

> 以指定的基数转换字符串为整数。 如果基数是 undefined 或者 0，则基数默认是10，如果字符串是16进制，则基数为16

```js
_.parseInt(string, [radix=10])
```

```js
/**
 * Converts `string` to an integer of the specified radix. If `radix` is
 * `undefined` or `0`, a `radix` of `10` is used unless `string` is a
 * hexadecimal, in which case a `radix` of `16` is used.
 *
 * **Note:** This method aligns with the
 * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
 *
 * @since 1.1.0
 * @category String
 * @param {string} string The string to convert.
 * @param {number} [radix=10] The radix to interpret `string` by.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * parseInt('08')
 * // => 8
 */
function parseInt(string, radix) {
  if (radix == null) {
    radix = 0
  } else if (radix) {
    radix = +radix
  }
  return nativeParseInt(`${string}`.replace(reTrimStart, ''), radix || 0)
}
```

`parseInt` 函数首先会判断 `radix`，默认为 0，否则就尝试转化为数字，这里会调用 `nativeParseInt` 函数：

```js
/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeParseInt = root.parseInt
```

`nativeParseInt` 是全局对象 `parseInt` 函数。

这里会调用 `replace` 函数，疲累空格替换成空字符串，传入 `radix` 或者 0。

```js
/** Used to match leading and trailing whitespace. */
const reTrimStart = /^\s+/
```

最后将结果返回。

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

