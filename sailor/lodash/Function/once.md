## once

> 创建一个只能调用一次的函数。 重复调用返回第一次调用的结果。 func 调用时，this 绑定到创建的函数，并传入对应参数。

```js
_.once(func)
```

```js
/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * const initialize = once(createApplication)
 * initialize()
 * initialize()
 * // => `createApplication` is invoked once
 */
function once(func) {
  return before(2, func)
}
```

`once` 函数是对 `before` 函数的包装，第一个参数为 2，调用次数不超过 2 次。
