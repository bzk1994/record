## reduce

> 通过 iteratee 遍历集合中的每个元素。 每次返回的值会作为下一次 iteratee 使用。 如果没有提供 accumulator，则集合中的第一个元素作为 accumulator。 iteratee 会传入4个参数：(accumulator, value, index|key, collection)。 

```js
_.reduce(collection, [iteratee=_.identity], [accumulator])
```

```js
/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `reduce`, `reduceRight`, and `transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see reduceRight, transform
 * @example
 *
 * reduce([1, 2], (sum, n) => sum + n, 0)
 * // => 3
 *
 * reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
 *   (result[value] || (result[value] = [])).push(key)
 *   return result
 * }, {})
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator) {
  const func = Array.isArray(collection) ? arrayReduce : baseReduce
  const initAccum = arguments.length < 3
  return func(collection, iteratee, accumulator, initAccum, baseEach)
}
```

`reduce` 函数接收 3 个参数，`collection` 集合、 `iteratee` 迭代器函数、`accumulator` 初始值。

判断 `collection` 是否是数组，将不同的迭代函数赋值给 `func` 变量， ，调用 `func` 函数并且将 `reduce` 函数接收的参数传入，并且加入了 2 个参数，`initAccum` 表示 `arguments.length < 3`、`baseEach` 循环方法，最后会返回 `func` 函数处理后的处理后的值。


## arrayReduce

```js
/**
 * A specialized version of `reduce` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  let index = -1
  const length = array == null ? 0 : array.length

  if (initAccum && length) {
    accumulator = array[++index]
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array)
  }
  return accumulator
}
```

接下来看 `arrayReduce` 函数，如果 `reduce` 第一个参数 `collection` 是数组，就会调用 `arrayReduce`，`arrayReduce` 接收 4 个参数，`array` 数组、`iteratee` 迭代器函数、`accumulator` 初始值。

申明初始变量 `index` 、`length`，这里会判断 `initAccum` 变量，`reduce` 函数调用是是 `false`，不会进入判断，这个判断是将数组的第一个插入 `accumulator` 数组，
然后进入 `while` 循环，`index` 累加，调用 `iteratee` 迭代器函数，将参数传入，最后返回 `accumulator`。

## reduceRight

> 这个方法类似 _.reduce ，除了它是从右到左遍历的。

```js
_.reduceRight(collection, [iteratee=_.identity], [accumulator])
```

```js
/**
 * This method is like `reduce` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see reduce
 * @example
 *
 * const array = [[0, 1], [2, 3], [4, 5]]
 *
 * reduceRight(array, (flattened, other) => flattened.concat(other), [])
 * // => [4, 5, 2, 3, 0, 1]
 */
function reduceRight(collection, iteratee, accumulator) {
  const func = Array.isArray(collection) ? arrayReduceRight : baseReduce
  const initAccum = arguments.length < 3
  return func(collection, iteratee, accumulator, initAccum, baseEachRight)
}
```

`reduceRight` 函数与 `reduce` 方法相似，在循环的时候是调用 `arrayReduceRight`，会向右开始循环处理。