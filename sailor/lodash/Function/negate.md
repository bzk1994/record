## negate

> 创建一个对 func 结果 取反的函数。 用 predicate 对 func 检查的时候，this 绑定到创建的函数，并传入对应参数。

```js
_.negate(predicate)
```

```js
/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0
 * }
 *
 * filter([1, 2, 3, 4, 5, 6], negate(isEven))
 * // => [1, 3, 5]
 */
function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    return !predicate.apply(this, args)
  }
}
```

`negate` 首先会函数类型判断，如果 `predicate` 不是函数就抛出异常，
`predicate`最后返回一个函数，此函数会调用 `apply` 方法进行函数调用，最后使用 `!` 取非，返回一个相反的结果。
