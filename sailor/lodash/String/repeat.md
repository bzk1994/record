## repeat

> 重复 N 次字符串

```js
_.repeat([string=''], [n=1])
```

```js
/**
 * Repeats the given string `n` times.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=1] The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 * @example
 *
 * repeat('*', 3)
 * // => '***'
 *
 * repeat('abc', 2)
 * // => 'abcabc'
 *
 * repeat('abc', 0)
 * // => ''
 */
function repeat(string, n) {
  let result = ''
  if (!string || n < 1 || n > Number.MAX_SAFE_INTEGER) {
    return result
  }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
  do {
    if (n % 2) {
      result += string
    }
    n = Math.floor(n / 2)
    if (n) {
      string += string
    }
  } while (n)

  return result
}
```

`repeat` 函数首先申明 `result` 空字符串，对 `n` 做些限制，这里采用了 `do...while` 循环，如果 `n % 2` 为真，字符串拼接，接着将 `n` 赋值为 `n / 2` ，如果有 `n` 再次进行拼接，这样可以实现更好的性能，最后将 `result` 返回。

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

