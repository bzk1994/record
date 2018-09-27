## overArgs

> 创建一个函数，调用时 func 参数会先一对一的改变。

```js
_.overArgs(func, [transforms=[_.identity]])
```

```js

/**
 * Creates a function that invokes `func` with its arguments transformed.
 *
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to wrap.
 * @param {Function[]} [transforms=[identity]]
 *  The argument transforms.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function doubled(n) {
 *   return n * 2
 * }
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const func = overArgs((x, y) => [x, y], [square, doubled])
 *
 * func(9, 3)
 * // => [81, 6]
 *
 * func(10, 5)
 * // => [100, 10]
 */
function overArgs(func, transforms) {
  const funcsLength = transforms.length
  return function(...args) {
    let index = -1
    const length = Math.min(args.length, funcsLength)
    while (++index < length) {
      args[index] = transforms[index].call(this, args[index])
    }
    return func.apply(this, args)
  }
}
```

`overArgs` 接收 2 个参数，`func` 要包裹的函数、`transforms` 转换函数。

首先会申明 `funcsLength` 变量保存 `transforms` 的 `length`，然后会返回一个 `function`，也就是

```js
const func = overArgs((x, y) => [x, y], [square, doubled])
```

此时这个 `function` 就是这样：

```js
function(...args) {
  let index = -1
  const length = Math.min(args.length, funcsLength)
  while (++index < length) {
    args[index] = transforms[index].call(this, args[index])
  }
  return func.apply(this, args)
}
```

申明 `index` 变量为 -1、`length` 为 `args.length` 与 `funcsLength` 最小值，进行 `while` 循环，这里会对 `args[index]` 进行赋值，赋值方法为 `transforms` 对应的第 `index` 个转换函数，最后将 `func` 返回，以便下次调用。
