
## fromPairs

> 反向版 _.toPairs，这个方法返回一个由键值对构成的对象。

```js
/**
 * The inverse of `_.toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.fromPairs([['a', 1], ['b', 2]]);
 * // => { 'a': 1, 'b': 2 }
 */
function fromPairs(pairs) {
  var index = -1,
    length = pairs == null ? 0 : pairs.length,
    result = {};

  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
}
```

`fromPairs` 接收 `pairs` 参数，通过 `while` 循环，以 `pair[0]` 为 `key` 、`pair[1]` 为 `value` 向 `result` 对象赋值，最近将 `result` 返回。
