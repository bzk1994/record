## forOwn

> 使用 iteratee 遍历自身的可枚举属性。 iteratee 会传入3个参数：(value, key, object)。 如果返回 false，iteratee 会提前退出遍历。

```js
_.forOwn(object, [iteratee=_.identity])
```

```js
/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @see forEach, forEachRight, forIn, forInRight, forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * forOwn(new Foo, function(value, key) {
 *   console.log(key)
 * })
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forOwn(object, iteratee) {
  object = Object(object)
  Object.keys(object).forEach((key) => iteratee(object[key], key, object))
}
```

`forOwn` 函数接收 2 个参数，`object` 迭代对象、`iteratee` 迭代函数。

首先会调用 `Object` 转化 `object`，然后调用 `Object.keys` 函数获取对象的 `key` 数组，调用 `forEach` 进行迭代，`forEach` 的回调函数中会调用 `iteratee` 函数。

## forOwnRight

> 这个方法类似 _.forOwn。 除了它是反方向开始遍历的。

```js
_.forOwnRight(object, [iteratee=_.identity])
```

```js
/**
 * This method is like `forOwn` except that it iterates over properties of
 * `object` in the opposite order.
 *
 * @since 2.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see forEach, forEachRight, forIn, forInRight, forOwn
 * @example
 *
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * forOwnRight(new Foo, function(value, key) {
 *   console.log(key)
 * })
 * // => Logs 'b' then 'a' assuming `forOwn` logs 'a' then 'b'.
 */
function forOwnRight(object, iteratee) {
  if (object == null) {
    return
  }
  const props = Object.keys(object)
  let length = props.length
  while (length--) {
    iteratee(object[props[length]], iteratee, object)
  }
}
```

`forOwnRight` 函数接收 2 个参数，`object` 迭代对象、`iteratee` 迭代函数。

调用 `Object.keys` 函数返回 `object` 的 `key` 数组，然后采用 `while` 循环，`length` 累减，在迭代中循环调用 `iteratee` 函数。
