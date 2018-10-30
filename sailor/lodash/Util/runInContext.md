## runInContext

> 创建一个给定上下文对象的原始的 lodash 函数。

```js
_.runInContext([context=root])
```

```js
/**
  * Create a new pristine `lodash` function using the `context` object.
  *
  * @static
  * @memberOf _
  * @since 1.1.0
  * @category Util
  * @param {Object} [context=root] The context object.
  * @returns {Function} Returns a new `lodash` function.
  * @example
  *
  * _.mixin({ 'foo': _.constant('foo') });
  *
  * var lodash = _.runInContext();
  * lodash.mixin({ 'bar': lodash.constant('bar') });
  *
  * _.isFunction(_.foo);
  * // => true
  * _.isFunction(_.bar);
  * // => false
  *
  * lodash.isFunction(lodash.foo);
  * // => false
  * lodash.isFunction(lodash.bar);
  * // => true
  *
  * // Create a suped-up `defer` in Node.js.
  * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
  */
var runInContext = (function runInContext(context) {
  context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
  ...
  return lodash;
}
```

`runInContext` 返回了整个 `Lodash` 函数。
