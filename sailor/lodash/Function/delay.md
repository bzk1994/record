## delay

> 延迟 wait 毫秒后调用 func。 任何附加的参数会传入到 func。

```js
_.delay(func, wait, [args])
```

```js
/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * delay(text => console.log(text), 1000, 'later')
 * // => Logs 'later' after one second.
 */
function delay(func, wait, ...args) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  return setTimeout(func, +wait || 0, ...args)
}
```

`delay` 函数接收 3 个参数，`func` 延迟函数、`wait` 延迟时间、`args` 延迟函数调用参数。

判断如果 `func` 不是 `function` 就抛出异常，接着返回 `setTimeout` 函数，传入 `func` 延迟函数，延迟 时间 `wait` 默认为 0，`args` 延迟函数调用参数，`func` 延迟函数会在 `wait` 时间后执行。
