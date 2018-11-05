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

首先对 `func` 的类型判断，如果不是 `function` 抛出异常，然后 `return` 了一个 `function`。

调用 `after` 函数，返回的 `done` 函数:

```js
function(...args) {
  if (--n < 1) {}
    return func.apply(this, args)
  }
}
```

此时内部维持了一个对 `n` 变量的引用，产生了一个闭包，接下来第一次调用 `done`，此时的 `n` 为 2，不满足 `if` 判断，但是执行了 `--n` ，`n` 成了 1。

第二次调用 `done` 函数，`--n` 后就满足了条件，在 `function` 内部判断 `n` 小于 1 `return` 一个使用 `apply` 修正 `this` 指向的函数，返回了 `func.apply(this, args)`，调用 `apply` 后会改变 `this` 指向，并且执行。

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

首先对 `func` 的类型判断，如果不是 `function` 抛出异常，然后 `return` 了一个 `function`。

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

此时内部维持了一个对 `n` 、 `result` 变量的引用，产生了一个闭包，接下来第一次调用 `code`，此时的 `n` 为 2，不满足 `if` 判断，但是执行了 `--n` ，`n` 成了 1，满足第一个 `if` 判断，将使用 `apply` 修正 `this` 指向的函数赋值给 `result` 变量，最后 `return result`。

随后满足第二个 `if` 判断，将 `func` 置为 `undefined`，第二次调用 `code` 函数，`--n` 为 0，不满足第一个 `if` 判断，此时不会返回函数，返回的是上次调用 `code` 的返回值 `result`。
