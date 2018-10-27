## endsWith

> 检查给定的字符是否是字符串的结尾

```js
_.endsWith([string=''], [target], [position=string.length])
```

```js
/**
 * Checks if `string` ends with the given target string.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @see includes, startsWith
 * @example
 *
 * endsWith('abc', 'c')
 * // => true
 *
 * endsWith('abc', 'b')
 * // => false
 *
 * endsWith('abc', 'b', 2)
 * // => true
 */
function endsWith(string, target, position) {
  const { length } = string
  position = position === undefined ? length : +position
  if (position < 0 || position != position) {
    position = 0
  }
  else if (position > length) {
    position = length
  }
  const end = position
  position -= target.length
  return position >= 0 && string.slice(position, end) == target
}
```

`endsWith` 函数接收 3 个参数，`string` 检索字符串、`target` 要搜索的字符串、`position` 搜索位置。

取出 `string` 的 `length`，判断是否传入 `position` ，默认搜索全部长度，以及做 `position` 大小的限制，这里会调用 `slice` 取出 `string` 最后与 `target` 相等的字符串与 `target` 比较，并且 `position >= 0`。
