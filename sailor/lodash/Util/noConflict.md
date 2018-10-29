## noConflict

> 释放 _ 为原来的值，并返回一个 lodash 的引用

```js
_.noConflict()
```

```js
/**
  * Reverts the `_` variable to its previous value and returns a reference to
  * the `lodash` function.
  *
  * @static
  * @since 0.1.0
  * @memberOf _
  * @category Util
  * @returns {Function} Returns the `lodash` function.
  * @example
  *
  * var lodash = _.noConflict();
  */
function noConflict() {
  if (root._ === this) {
    root._ = oldDash;
  }
  return this;
}
```

调用 `noConflict` 函数后手下会判断 `root._` 是否与 `this` 全等，如果全等将 `root._` 设置为 `oldDash`。

```js
var oldDash = root._;
````
