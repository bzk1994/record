## transform

> _.reduce 的代替方法。 这个方法会改变对象为一个新的 accumulator 对象，来自每一次经 iteratee 处理自身可枚举对象的结果。 每次调用可能会改变 accumulator 对象。 iteratee 会传入4个对象：(accumulator, value, key, object)。 如果返回 false，iteratee 会提前退出。

```js
_.transform(object, [iteratee=_.identity], [accumulator])
```

```js
/**
 * An alternative to `reduce` this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @since 1.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @see reduce, reduceRight
 * @example
 *
 * transform([2, 3, 4], (result, n) => {
 *   result.push(n *= n)
 *   return n % 2 == 0
 * }, [])
 * // => [4, 9]
 *
 * transform({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
 *   (result[value] || (result[value] = [])).push(key)
 * }, {})
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */
function transform(object, iteratee, accumulator) {
  const isArr = Array.isArray(object)
  const isArrLike = isArr || isBuffer(object) || isTypedArray(object)

  if (accumulator == null) {
    const Ctor = object && object.constructor
    if (isArrLike) {
      accumulator = isArr ? new Ctor : []
    }
    else if (isObject(object)) {
      accumulator = typeof Ctor == 'function'
        ? Object.create(Object.getPrototypeOf(object))
        : {}
    }
    else {
      accumulator = {}
    }
  }
  (isArrLike ? arrayEach : baseForOwn)(object, (value, index, object) =>
    iteratee(accumulator, value, index, object))
  return accumulator
}
```

`transform` 函数接收 3 个参数，`object` 迭代对象、`iteratee` 迭代函数，`accumulator` 收集器。

首先会对 `object` 进行数组和类数组的判断，接收会判断是否有 `accumulator` ，如果没有进入 `if` 判断，会获取 `object.constructor` 的原型对象 `Ctor`，如果是数组或者类数组，根据 `accumulator` 生产一个初始值 `new Ctor : []`，如果是一个对象并且 `Ctor` 是一个对象，这里会调用 `Object.create` 方法，创建一个具有指定原型且可选择性地包含指定属性的对象，这里只传入了 `Object.getPrototypeOf(object)`，获取 `object` 的原型，如果不满足已上条件将 `accumulator` 赋值为空对象。

接着是一个 3 元表达式，`arrayEach` 和 `baseForOwn` 都是迭代函数，根据 `isArrLike` 进行调用，这里会传入回调函数，回调函数中会调用 `iteratee` 迭代器对 `accumulator` 进行处理，最后将 `accumulator` 返回。
