## conforms

> 创建一个函数。 这个函数会调用 source 的属性名对应的 predicate 与传入对象相对应属性名的值进行 predicate 处理。 如果都符合返回 true，否则返回 false

```js
_.conforms(source)
```

```js
/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1

/**
 * Creates a function that invokes the predicate properties of `source` with
 * the corresponding property values of a given object, returning `true` if
 * all predicates return truthy, else `false`.
 *
 * **Note:** The created function is equivalent to `conformsTo` with
 * `source` partially applied.
 *
 * @since 4.0.0
 * @category Util
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 * @example
 *
 * const objects = [
 *   { 'a': 2, 'b': 1 },
 *   { 'a': 1, 'b': 2 }
 * ]
 *
 * filter(objects, conforms({ 'b': function(n) { return n > 1 } }))
 * // => [{ 'a': 1, 'b': 2 }]
 */
function conforms(source) {
  return baseConforms(baseClone(source, CLONE_DEEP_FLAG))
}
```

`conforms` 函数是 `baseConforms` 函数的返回函数，并且传入了 `baseClone` 函数处理的 `source`，调用 `baseClone` 函数是传入了 `CLONE_DEEP_FLAG` 深度为 1，只会拷贝一层。


## baseConforms

```js

/**
 * The base implementation of `conforms` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 */
function baseConforms(source) {
  const props = keys(source)
  return (object) => baseConformsTo(object, source, props)
}
```

`baseConforms` 函数会调用 `keys` 取出 `source` 的 `key` 数组，然后返回 `function`，在这个函数中
会调用 `baseConformsTo`。

## baseConformsTo

```js
/**
 * The base implementation of `conformsTo` which accepts `props` to check.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 */
function baseConformsTo(object, source, props) {
  let length = props.length
  if (object == null) {
    return !length
  }
  object = Object(object)
  while (length--) {
    const key = props[length]
    const predicate = source[key]
    const value = object[key]

    if ((value === undefined && !(key in object)) || !predicate(value)) {
      return false
    }
  }
  return true
}
```

`baseConformsTo` 函数中循环 `props`，并且在迭代中取出 `predicate` 函数，如果 `value` 为 `undefined` 并且 `object` 中没有对应的 `key` 或者调用 `predicate` 返回为 `false`，就 `return false`，如果没有就在最后返回 `true`。
