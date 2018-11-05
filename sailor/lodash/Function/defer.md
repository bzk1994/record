## defer

> 延迟调用 func 直到当前堆栈清理完毕。 任何附加的参数会传入到 func。

```js
_.defer(func, [args])
```

```js
/**
 * Defers invoking the `func` until the current call stack has cleared. Any
 * additional arguments are provided to `func` when it's invoked.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to defer.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * defer(text => console.log(text), 'deferred')
 * // => Logs 'deferred' after one millisecond.
 */
function defer(func, ...args) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  return setTimeout(func, 1, ...args)
}
```

`defer` 函数接收 2 个参数，`func` 延迟函数、`args` 延迟函数调用参数。

判断如果 `func` 不是 `function` 就抛出异常，接着返回 `setTimeout` 函数，传入 `func` 延迟函数，延迟 `1ms`，`args` 延迟函数调用参数，`func` 延迟函数会在下一次事件循环完成后执行。