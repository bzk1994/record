## times

> 调用 iteratee N 次，每次调用返回的结果存入到数组中。 iteratee 会传入1个参数：(index)。

```js
_.times(n, [iteratee=_.identity])
```

```js
/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argumentindex).
 *
 * @since 0.1.0
 * @category Util
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * times(3, String)
 * // => ['0', '1', '2']
 *
 *  times(4, () => 0)
 * // => [0, 0, 0, 0]
 */
function times(n, iteratee) {
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return []
  }
  let index = -1
  const length = Math.min(n, MAX_ARRAY_LENGTH)
  const result = new Array(length)
  while (++index < length) {
    result[index] = iteratee(index)
  }
  index = MAX_ARRAY_LENGTH
  n -= MAX_ARRAY_LENGTH
  while (++index < n) {
    iteratee(index)
  }
  return result
}
```

`times` 函数接收 2 个参数，`n` 调用函数次数、`iteratee` 迭代函数。

首选会对 `n` 做限制，小于 0 或者大于 `MAX_SAFE_INTEGER` 返回 `[]`，

```js
/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295
```

接着从 `n` 与 `MAX_ARRAY_LENGTH` 数组最大长度取最小值，申明一个 `length` 长度的数组，随后进入 `while` 循环， `index` 累加，不断调用 `iteratee` 迭代函数，插入 `result` 数组，
