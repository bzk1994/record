## values

> 创建 object 自身可枚举属性的值为数组 

```js
_.values(object)
```

```js
/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @see keys, valuesIn
 * @example
 *
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * values(new Foo)
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * values('hi')
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object))
}
```

`values` 函数返回一个三元表达式，如果是 `null` 返回 `[]`，否则返回调用 `baseValues` 函数后返回的数组，`keys` 函数是 `object` 的 `key` 数组。


## baseValues

```js
/**
 * The base implementation of `values` and `valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return props == null ? [] : props.map((key) => object[key])
}
```

`baseValues` 函数返回一个三元表达式，如果 `props` 为 `null` 返回空数组，否则调用 `map` 函数返回 `object[key]`，也就是 `value`，此时就是 `value` 的集合，将其返回。

## valuesIn

> 创建一个自己的数组，并继承可枚举的对象的字符串键控属性值。

```js
_.valuesIn(object)
```

```js
/**
  * Creates an array of the own and inherited enumerable string keyed property
  * values of `object`.
  *
  * **Note:** Non-object values are coerced to objects.
  *
  * @static
  * @memberOf _
  * @since 3.0.0
  * @category Object
  * @param {Object} object The object to query.
  * @returns {Array} Returns the array of property values.
  * @example
  *
  * function Foo() {
  *   this.a = 1;
  *   this.b = 2;
  * }
  *
  * Foo.prototype.c = 3;
  *
  * _.valuesIn(new Foo);
  * // => [1, 2, 3] (iteration order is not guaranteed)
  */
function valuesIn(object) {
  return object == null ? [] : baseValues(object, keysIn(object));
}
```

`valuesIn` 函数与 `values` 函数相似，只是调用了 `keysIn` 函数获取了自身和继承的 `key` 数组。

## keysIn

```js
/**
  * Creates an array of the own and inherited enumerable property names of `object`.
  *
  * **Note:** Non-object values are coerced to objects.
  *
  * @static
  * @memberOf _
  * @since 3.0.0
  * @category Object
  * @param {Object} object The object to query.
  * @returns {Array} Returns the array of property names.
  * @example
  *
  * function Foo() {
  *   this.a = 1;
  *   this.b = 2;
  * }
  *
  * Foo.prototype.c = 3;
  *
  * _.keysIn(new Foo);
  * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
  */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
```

