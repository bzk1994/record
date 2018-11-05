## flip

> 创建一个翻转接收参数的 func 函数。

```js
_.flip(func)
```

```js
/**
 * Creates a function that invokes `func` with arguments reversed.
 *
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to flip arguments for.
 * @returns {Function} Returns the new flipped function.
 * @see reverse
 * @example
 *
 * const flipped = flip((...args) => args)
 *
 * flipped('a', 'b', 'c', 'd')
 * // => ['d', 'c', 'b', 'a']
 */
function flip(func) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    return func.apply(this, args.reverse())
  }
}
```

`flip` 函数会返回一个 `function`，`function` 内部又返回了一个使用 `apply` 调用的 `func`，内部传入的参数使用 `reverse` 方法进行了反转。
