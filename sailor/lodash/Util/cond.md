## cond

> 创建一个函数。 这个函数会遍历 pairs，并执行最先返回真值对应的函数，并绑定 this 及传入创建函数的参数。

```js
_.cond(pairs)
```

```js
/**
 * Creates a function that iterates over `pairs` and invokes the corresponding
 * function of the first predicate to return truthy. The predicate-function
 * pairs are invoked with the `this` binding and arguments of the created
 * function.
 *
 * @since 4.0.0
 * @category Util
 * @param {Array} pairs The predicate-function pairs.
 * @returns {Function} Returns the new composite function.
 * @example
 *
 * const func = cond([
 *   [matches({ 'a': 1 }),         () => 'matches A'],
 *   [conforms({ 'b': isNumber }), () => 'matches B'],
 *   [() => true,                  () => 'no match']
 * ])
 *
 * func({ 'a': 1, 'b': 2 })
 * // => 'matches A'
 *
 * func({ 'a': 0, 'b': 1 })
 * // => 'matches B'
 *
 * func({ 'a': '1', 'b': '2' })
 * // => 'no match'
 */
function cond(pairs) {
  const length = pairs == null ? 0 : pairs.length

  pairs = !length ? [] : map(pairs, (pair) => {
    if (typeof pair[1] != 'function') {
      throw new TypeError('Expected a function')
    }
    return [pair[0], pair[1]]
  })

  return (...args) => {
    for (const pair of pairs) {
      if (pair[0].apply(this, args)) {
        return pair[1].apply(this, args)
      }
    }
  }
}
```

`cond` 函数首先会对 `pairs` 做非空判断，接着调用 `map` 函数进行遍历， 判断 `pair[1]` 是否为 `function`，不是就抛出异常，这里主要是遍历所以的函数，做类型判断。

接着会返回一个 `fucntion`，在这个 ``fucntion`` 中会调用 `for...of` 循环 `pairs` 数组，如果 `pair[0]` 调用为真，就返回 `pair[1]` 的调用结果。
