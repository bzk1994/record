## after

> 反向版 _.before。 这个方法创建一个新函数，当调用 N 次或者多次之后将触发 func 方法。

```js
_.after(n, func)
```

```js
/**
 * The opposite of `before`. This method creates a function that invokes
 * `func` once it's called `n` or more times.
 *
 * @since 0.1.0
 * @category Function
 * @param {number} n The number of calls before `func` is invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * const saves = ['profile', 'settings']
 * const done = after(saves.length, () => console.log('done saving!'))
 *
 * forEach(saves, type => asyncSave({ 'type': type, 'complete': done }))
 * // => Logs 'done saving!' after the two async saves have completed.
 */
function after(n, func) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    if (--n < 1) {
      return func.apply(this, args)
    }
  }
}
```

`after` 函数接收 2 个参数，`n` 调用 `func` 多少次执行、`func` 触发方法。
首先对 `func` 的类型判断，不是 `function` 抛出异常，然后 `return` 了一个 `function`。

调用 `after` 函数，返回的 `done` 函数:

```js
function(...args) {
  if (--n < 1) {}
    return func.apply(this, args)
  }
}
```

此时内部维持了一个对 `n` 变量的引用，产生了一个闭包，接下来第一次调用 `done`，此时的 `n` 为 2，不满足 `if` 判断，但是执行了 `--n` ，`n` 成了 1，第二次调用 `done` 函数，`--n` 后就满足了条件，
在 `function` 内部判断 `n` 小于 1 `return` 一个使用 `apply` 修正 `this` 指向的函数，返回了 `func.apply(this, args)`，调用 `apply` 后会改变 `this` 指向，并且执行。
