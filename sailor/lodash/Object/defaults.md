## defaults

> 分配来源对象的可枚举属性到目标对象所有解析为 undefined 的属性上。 来源对象从左到右应用。 一旦设置了相同属性的值，后续的将被忽略掉。 

```js
_.defaults(object, [sources])
```

```js
/** Used for built-in method references. */
const objectProto = Object.prototype

/** Used to check objects for own properties. */
const hasOwnProperty = objectProto.hasOwnProperty

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see defaultsDeep
 * @example
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 })
 * // => { 'a': 1, 'b': 2 }
 */
function defaults(object, ...sources) {
  object = Object(object)
  sources.forEach((source) => {
    if (source != null) {
      source = Object(source)
      for (const key in source) {
        const value = object[key]
        if (value === undefined ||
            (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
          object[key] = source[key]
        }
      }
    }
  })
  return object
}
```

`defaults` 函数接收 2 个参数，`object` 目标对象、`sources` 其他对象。

首先调用 `Object` 转化 `object` 对象，然后遍历 `sources` 数组，使用 `for...in` 循环遍历 `source` 的属性，申明 `value` 遍历保存对象 `key` 的 `value`，如果不为 `undefined` 或者 `value` 与原型上的对象 `key` 相等并且 `object` 上的没有这个属性就将 `source` 对应的 `key` 赋值给 `object` ，最后将 `object` 返回，总的来说就是循环调用 `sources` 参数数组，并且遍历参数的 `key` ，没有重复 `key` 就往原对象加 `key: value`，最后返回 `object`。


## defaultsDeep

> 这个方法类似 _.defaults，除了它会递归分配默认属性。 

```js
_.defaultsDeep(object, [sources])
```

```js
/**
 * This method is like `defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see defaults
 * @example
 *
 * defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } })
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
function defaultsDeep(...args) {
  args.push(undefined, customDefaultsMerge)
  return mergeWith.apply(undefined, args)
}
```

`defaultsDeep` 首先会将 `undefined, customDefaultsMerge` 插入到 `args`，调用 `mergeWith` 函数返回。

## customDefaultsMerge

```js
/**
 * Used by `defaultsDeep` to customize its `merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue)
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack)
    stack['delete'](srcValue)
  }
  return objValue
}
```

`customDefaultsMerge` 会判断 `objValue`、`srcValue` 均为对象，调用 `set` 为 `srcValue` 增加 `objValue`，调用 `baseMerge` 函数，并且传入 `customDefaultsMerge` 自身，`baseMerge` 函数内部，递归调用 `customDefaultsMerge`，实现属性的深拷贝，最后删除 `srcValue`，返回 `objValue`。