## flow

> 创建一个函数。 返回的结果是调用提供函数的结果，this 会绑定到创建函数。 每一个连续调用，传入的参数都是前一个函数返回的结果。

```js
_.flow([funcs])
```

```js
/**
 * Composes a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @since 3.0.0
 * @category Util
 * @param {Function[]} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see flowRight
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const addSquare = flow([add, square])
 * addSquare(1, 2)
 * // => 9
 */
function flow(funcs) {
  const length = funcs ? funcs.length : 0
  let index = length
  while (index--) {
    if (typeof funcs[index] != 'function') {
      throw new TypeError('Expected a function')
    }
  }
  return function(...args) {
    let index = 0
    let result = length ? funcs[index].apply(this, args) : args[0]
    while (++index < length) {
      result = funcs[index].call(this, result)
    }
    return result
  }
}
```

`flow` 函数接收一个 `funcs` 数组，`while` 循环对 `func` 进行类型检测，最后 `return function`，在 `function` 中，如果有 `length` 会调用 `funcs` 的第一个函数保存 `result`，接着进行 `while` 循环，`index` 累加，这里再次使用 `call` 调用 `funcs[index]` ，将 `result` 传入，将调用后的值赋值给 `result`，最后将 `result` 返回。

## flowRight

> 这个方法类似 _.flow，除了它调用函数的顺序是从右往左的。

```js
_.flowRight([funcs])
```

```js
/**
 * This method is like `flow` except that it composes a function that
 * invokes the given functions from right to left.
 *
 * @since 3.0.0
 * @category Util
 * @param {Function[]} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see flow
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const addSquare = flowRight([square, add])
 * addSquare(1, 2)
 * // => 9
 */
function flowRight(funcs) {
  return flow(funcs.reverse())
}
```

`flowRight` 函数就是 `flow` 函数的包装，只是调用 `reverse` 将 `funcs` 反转。
