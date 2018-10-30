## noop

> 无论传递什么参数，都返回 undefined。

```js
/**
  * This method returns `undefined`.
  *
  * @static
  * @memberOf _
  * @since 2.3.0
  * @category Util
  * @example
  *
  * _.times(2, _.noop);
  * // => [undefined, undefined]
  */
function noop() {
  // No operation performed.
}
```

一个空的函数而已。