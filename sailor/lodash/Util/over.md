## over 

> 创建一个传入提供的参数的函数并调用 iteratees 返回结果的函数。

```js
_.over([iteratees=[_.identity]])
```

```js
/**
 * Creates a function that invokes `iteratees` with the arguments it receives
 * and returns their results.
 *
 * @since 4.0.0
 * @category Util
 * @param {Function[]} [iteratees=[identity]]
 *  The iteratees to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * const func = over([Math.max, Math.min])
 *
 * func(1, 2, 3, 4)
 * // => [4, 1]
 */
function over(iteratees) {
  return function(...args) {
    return map(iteratees, (iteratee) => iteratee.apply(this, args))
  }
}
```

`over` 函数会返回一个 `function`，这个 `function` 内部保存第一次调用 `iteratees` 传入的 `iteratees`  函数。

以例子中 `func` 函数来说：

```js
var func = _.over([Math.max, Math.min]);
```

此时 `func` 函数就是这个 `return` 的 `function`：

```js
function(...args) {
  return map(iteratees, (iteratee) => iteratee.apply(this, args))
}
```

此时这个 `iteratee` 函数，就是 `[Math.max, Math.min]`，`func` 函数会返回调用 `map` 函数后的数组，这个数组是调用 `Math.max(args)`、`Math.min(args)` 通过 `map` 组合成的数组。

## overEvery

> 创建一个传入提供的参数的函数并调用 iteratees 判断是否 全部 都为真值的函数。

```js
_.overEvery([predicates=[_.identity]])
```
```js
/**
 * Creates a function that checks if **all** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @since 4.0.0
 * @category Util
 * @param {Function[]} [predicates=[identity]]
 *  The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * const func = overEvery([Boolean, isFinite])
 *
 * func('1')
 * // => true
 *
 * func(null)
 * // => false
 *
 * func(NaN)
 * // => false
 */
function overEvery(iteratees) {
  return function(...args) {
    return every(iteratees, (iteratee) => iteratee.apply(this, args))
  }
}
```

`overEvery` 函数与 `over` 函数相似，只不过是将调用 `map` 改为了 `every` 函数而已。

## overSome

> 创建一个传入提供的参数的函数并调用 iteratees 判断是否 存在 有真值的函数。

```js
_.overSome([predicates=[_.identity]])
```

```js
/**
 * Creates a function that checks if **any** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @since 4.0.0
 * @category Util
 * @param {Function[]} [predicates=[identity]]
 *  The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * const func = overSome([Boolean, isFinite])
 *
 * func('1')
 * // => true
 *
 * func(null)
 * // => true
 *
 * func(NaN)
 * // => false
 */
function overSome(iteratees) {
  return function(...args) {
    return some(iteratees, (iteratee) => iteratee.apply(this, args))
  }
}
```

`overSome` 函数与 `over` 函数相似，只不过是将调用 `map` 改为了 `some` 函数而已。
