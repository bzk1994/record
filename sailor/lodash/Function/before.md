## before

> 创建一个调用 func 的函数。 调用次数不超过 N 次。 之后再调用这个函数，将返回最后一个调用的结果。

```js
_.before(n, func)
```

```js
/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', before(5, addContactToList))
 * // => Allows adding up to 4 contacts to the list.
 */
function before(n, func) {
  let result
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    if (--n > 0) {
      result = func.apply(this, args)
    }
    if (n <= 1) {
      func = undefined
    }
    return result
  }
}
```

`before` 函数接收 2 个参数，`n` 调用 `func` 多少次执行、`func` 触发方法。
首先对 `func` 的类型判断，不是 `function` 抛出异常，然后 `return` 了一个 `function`。

调用 `before` 函数，返回的 `code` 函数:

```js
function(...args) {
  if (--n > 0) {
    result = func.apply(this, args)
  }
  if (n <= 1) {
    func = undefined
  }
  return result
}
```

此时内部维持了一个对 `n` 、 `result` 变量的引用，产生了一个闭包，接下来第一次调用 `code`，此时的 `n` 为 2，不满足 `if` 判断，但是执行了 `--n` ，`n` 成了 1，满足第一个 `if` 判断，将使用 `apply` 修正 `this` 指向的函数赋值给 `result` 变量，最后 `return result`，随后满足第二个 `if` 判断，将 `func` 置为 `undefined`，第二次调用 `code` 函数，`--n` 为 0，不满足第一个 `if` 判断，此时不会返回函数，返回的是上次调用 `code` 的返回值 `result`。
