## merge

> 递归合并来源对象的自身和继承的可枚举属性到目标对象。 跳过来源对象解析为 undefined 的属性。 数组和普通对象会递归合并，其他对象和值会被直接分配。 来源对象从左到右分配，后续的来源对象属性会覆盖之前分配的属性。

```js
_.merge(object, [sources])
```

```js
/**
 * This method is like `assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * const object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * }
 *
 * const other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * }
 *
 * merge(object, other)
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
const merge = createAssigner((object, source, srcIndex) => {
  baseMerge(object, source, srcIndex)
})
```

`createAssigner` 函数时 `createAssigner` 函数的返回函数，并传入了回调函数，回调函数接收 3 个参数，会调用 `baseMerge` 函数处理 `object`，`createAssigner` 函数在 `assign` 函数中说过。

## baseMerge

> baseMerge 函数时 merge 的基本实现。

```js
/**
 * The base implementation of `merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return
  }
  baseFor(source, (srcValue, key) => {
    if (isObject(srcValue)) {
      stack || (stack = new Stack)
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
    }
    else {
      let newValue = customizer
        ? customizer(object[key], srcValue, `${key}`, object, source, stack)
        : undefined

      if (newValue === undefined) {
        newValue = srcValue
      }
      assignMergeValue(object, key, newValue)
    }
  }, keysIn)
}
```

`baseMerge` 函数接收 5 个参数，`object` 目标对象、`source` 源对象、`srcIndex` 源对象索引、`customizer` 自定义合并函数、`stack` 跟踪栈堆。

首先会判断 `object` 目标对象 和 `source` 源对象如果是同一指针直接 `return`，然后调用 `baseFor` 函数进行
迭代，传入 `source` 源对象、回调函数、`keysIn` 返回对象的 `key` 数组函数。

我们来看看 `baseFor` 函数：

```js
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseFor(object, iteratee, keysFunc) {
  const iterable = Object(object)
  const props = keysFunc(object)
  let { length } = props
  let index = -1

  while (length--) {
    const key = props[++index]
    if (iteratee(iterable[key], key, iterable) === false) {
      break
    }
  }
  return object
}
```

`baseFor` 函数就是会获取源对象的 `key` 数组，进行 `while` 循环，不断调用 `iteratee` 迭代函数，直到 `iteratee` 返回 `false`，中断循环。

```js
(srcValue, key) => {
  if (isObject(srcValue)) {
    stack || (stack = new Stack)
    baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
  }
  else {
    let newValue = customizer
      ? customizer(object[key], srcValue, `${key}`, object, source, stack)
      : undefined

    if (newValue === undefined) {
      newValue = srcValue
    }
    assignMergeValue(object, key, newValue)
  }
}
```

而在这个迭代函数中，会判断 `srcValue` 是否是对象，如果是的话调用 `baseMergeDeep` 进行属性拷贝，并传入
`baseMerge` 函数自身实现递归调用，`stack` 用来跟踪栈堆。

否则会判断是否有 `customizer` 函数，有的话调用 `customizer` 产生新的 `value`，调用 `assignMergeValue` 进行 `value` 复制。

## baseMergeDeep

```js
/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  const objValue = object[key]
  const srcValue = source[key]
  const stacked = stack.get(srcValue)

  if (stacked) {
    assignMergeValue(object, key, stacked)
    return
  }
  let newValue = customizer
    ? customizer(objValue, srcValue, `${key}`, object, source, stack)
    : undefined

  let isCommon = newValue === undefined

  if (isCommon) {
    const isArr = Array.isArray(srcValue)
    const isBuff = !isArr && isBuffer(srcValue)
    const isTyped = !isArr && !isBuff && isTypedArray(srcValue)

    newValue = srcValue
    if (isArr || isBuff || isTyped) {
      if (Array.isArray(objValue)) {
        newValue = objValue
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue)
      }
      else if (isBuff) {
        isCommon = false
        newValue = cloneBuffer(srcValue, true)
      }
      else if (isTyped) {
        isCommon = false
        newValue = cloneTypedArray(srcValue, true)
      }
      else {
        newValue = []
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue)
      }
      else if ((srcIndex && typeof objValue == 'function') || !isObject(objValue)) {
        newValue = initCloneObject(srcValue)
      }
    }
    else {
      isCommon = false
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue)
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack)
    stack['delete'](srcValue)
  }
  assignMergeValue(object, key, newValue)
}
```

`baseMergeDeep` 函数时深拷贝的基本实现，在 `baseMerge` 函数中是这样调用的：

```js
baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
```

首先会申明 `objValue`、`srcValue` 取出对应 `key` 的 `value`，`stack.get(srcValue)` 函数尝试获取 `stack` 缓存是否有这个 `value`，接着判断是否有这个缓存，如果有的话直接调用 `assignMergeValue` 进行值的复制。

`customizer` 迭代函数：

```js
let newValue = customizer
  ? customizer(objValue, srcValue, `${key}`, object, source, stack)
  : undefined

let isCommon = newValue === undefined
```

这里会申明一个 `newValue` ，来处理是否有 `customizer` 函数，如果有就调用并且将值赋值，否则就是 `undefined`，`isCommon` 就是没有传入 `customizer` 函数的情况。

在 `if (isCommon) {}` 判断中就是几个 `if` 判断，是数组、`Buffer`、类数组的情况进行 `newValue` 的赋值，如果是对象、`arguments` 也调用对应的方法进行 `newValue` 的复制，否则就将 `isCommon` 置为 `false`，最后一个 `if` 判断，如果 `isCommon` 为真调用 `stack.set` 设置栈堆，递归调用传入的 `mergeFunc` 函数，调用 `stack['delete']` 删除栈堆，最后调用 `assignMergeValue` 函数进行 `value` 的复制。

## assignMergeValues

```js
/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value)
  }
}
```

`assignMergeValue` 函数是 `baseAssignValue` 包装，排除了 `object[key]` 、`value` 值相同或者 `object` 没有 `key` 这个键值。

## baseAssignValue

```js
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    })
  } else {
    object[key] = value
  }
}
```

`baseAssignValue` 函数会判断 `key` 等于 `__proto__` 就调用 `Object.defineProperty` 方法给对象加上属性，否则采用 `object[key]` 直接赋值。

## mergeWith

> 这个方法类似 _.merge。 除了它接受一个 customizer 决定如何合并。 如果 customizer 返回 undefined 将会由合并处理方法代替。

```js
_.mergeWith(object, sources, customizer)
```

```js
/**
 * This method is like `merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue)
 *   }
 * }
 *
 * const object = { 'a': [1], 'b': [2] }
 * const other = { 'a': [3], 'b': [4] }
 *
 * mergeWith(object, other, customizer)
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
const mergeWith = createAssigner((object, source, srcIndex, customizer) => {
  baseMerge(object, source, srcIndex, customizer)
})
```

`mergeWith` 与 `merge` 方法相似，只是多传了一个 `customizer` 函数。
