## create

> 创建一个继承 prototype 的对象。 如果提供了 properties，它的可枚举属性会被分配到创建的对象上。

```js
_.create(prototype, [properties])
```

```js
/**
 * Creates an object that inherits from the `prototype` object. If a
 * `properties` object is given, its own enumerable string keyed properties
 * are assigned to the created object.
 *
 * @since 2.3.0
 * @category Object
 * @param {Object} prototype The object to inherit from.
 * @param {Object} [properties] The properties to assign to the object.
 * @returns {Object} Returns the new object.
 * @example
 *
 * function Shape() {
 *   this.x = 0
 *   this.y = 0
 * }
 *
 * function Circle() {
 *   Shape.call(this)
 * }
 *
 * Circle.prototype = create(Shape.prototype, {
 *   'constructor': Circle
 * })
 *
 * const circle = new Circle
 * circle instanceof Circle
 * // => true
 *
 * circle instanceof Shape
 * // => true
 */
function create(prototype, properties) {
  prototype = prototype === null ? null : Object(prototype)
  const result = Object.create(prototype)
  return properties == null ? result : Object.assign(result, properties)
}
```

`create` 函数接收 2 个参数， `prototype` 要继承的对象、`properties` 继承的属性。

首先会判断 `prototype` 是否是 `null`，否则就调用 `Object` 转化为对象，这里调用了原生的 `Object.create` 方法，创建一个具有指定原型且可选择性地包含指定属性的 `result`，最后会 `return` 一个三元表达式，如果有 `properties` 直接返回 `result`，否则调用 ` Object.assign` 实现属性的拷贝后返回。
