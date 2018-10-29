## attempt

> 尝试调用函数，返回结果 或者 错误对象。 任何附加的参数都会在调用时传给函数。

```js
_.attempt(func, [args])
```

```js
/**
 * Attempts to invoke `func`, returning either the result or the caught error
 * object. Any additional arguments are provided to `func` when it's invoked.
 *
 * @since 3.0.0
 * @category Util
 * @param {Function} func The function to attempt.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // Avoid throwing errors for invalid selectors.
 * const elements = attempt(selector =>
 *   document.querySelectorAll(selector), '>_>')
 *
 * if (isError(elements)) {
 *   elements = []
 * }
 */
function attempt(func, ...args) {
  try {
    return func.apply(undefined, args)
  } catch (e) {
    return isError(e) ? e : new Error(e)
  }
}
```

`attempt` 函数会接收 `func` 函数和剩余参数，这里会用 `try...catch` 包裹代码块，这里用 `apply` 将 `this` 指向 `window` 并执行，如果抛出异常，就调用 `isError` 函数处理错误信息。

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

## 

> 

```js

```

```js

```