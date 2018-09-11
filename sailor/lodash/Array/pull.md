
## pull

> 移除所有经过 SameValueZero 等值比较为 true 的元素。

```js
/**
 * Removes all given values from `array` using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `without`, this method mutates `array`. Use `remove`
 * to remove elements from an array by predicate.
 *
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...*} [values] The values to remove.
 * @returns {Array} Returns `array`.
 * @see pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pull(array, 'a', 'c')
 * console.log(array)
 * // => ['b', 'b']
 */
function pull(array, ...values) {
  return pullAll(array, values)
}
```

`pull` 函数式 `pullAll` 函数的简单封装，接收多个参数，转成数组传给 `pullAll` 。

## pullAll

> 这个方式类似 _.pull，除了它接受数组形式的一系列值。 

```js
/**
 * This method is like `pull` except that it accepts an array of values to remove.
 *
 * **Note:** Unlike `difference`, this method mutates `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @returns {Array} Returns `array`.
 * @see pull, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pullAll(array, ['a', 'c'])
 * console.log(array)
 * // => ['b', 'b']
 */
function pullAll(array, values) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values)
    : array
}
```

`pullAll` 函数接收 `array` 函数，`values` ，简单判断 `array` 和 `values` 是数组类数组，调用 `basePullAll` 返回处理后的数组，不满足条件直接返回 `array` 。

## basePullAll

> pullAllBy 的基本实现。

```js
/**
 * The base implementation of `pullAllBy`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns `array`.
 */
function basePullAll(array, values, iteratee, comparator) {
  const indexOf = comparator ? baseIndexOfWith : baseIndexOf
  const length = values.length

  let index = -1
  let seen = array

  if (array === values) {
    values = copyArray(values)
  }
  if (iteratee) {
    seen = map(array, (value) => iteratee(value))
  }
  while (++index < length) {
    let fromIndex = 0
    const value = values[index]
    const computed = iteratee ? iteratee(value) : value

    while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
      if (seen !== array) {
        seen.splice(fromIndex, 1)
      }
      array.splice(fromIndex, 1)
    }
  }
  return array
}
```

`basePullAll` 函数接收 4 个参数，`array` 数组、`values` 要删除的值、`iteratee` 迭代器函数、`comparator` 比较函数。

申明 `indexOf` 方法，保存 `values` 长度，如果 `array` 与 `values` 全等，此时都是一个数组，为复杂对象、指针相同，调用 `copyArray` 函数 赋值给 `values`，如果有 `iteratee` 迭代器函数循环 `array` 调用 `iteratee` 。

下载来是双重 `while` 循环，第一层中 `index` 累加，申明 `fromIndex` 变量为 0 ，`value` 循环的值，`computed` 迭代器处理后的 `value`，在里面再，第二层中会调用 `indexOf` 方法，传入 `seen` 迭代器函数处理后的数组、`computed` 处理后的 `value`、`fromIndex` 循环 `index`，`comparator` 比较函数，取出对应下标，并且赋值给 `fromIndex`，如果当前数组中有这个 `computed`，通过 `while` 会调用 `splice` 方法删除数组其中一个，最后将 `array` 返回。

## pullAllBy

> 这个方法类似 _.pullAll，除了它接受一个 iteratee 调用每一个数组元素的值。 iteratee 会传入一个参数：(value)。 

```js
/**
 * This method is like `pullAll` except that it accepts `iteratee` which is
 * invoked for each element of `array` and `values` to generate the criterion
 * by which they're compared. The iteratee is invoked with one argument: (value).
 *
 * **Note:** Unlike `differenceBy`, this method mutates `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns `array`.
 * @see pull, pullAll, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }]
 *
 * pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x')
 * console.log(array)
 * // => [{ 'x': 2 }]
 */
function pullAllBy(array, values, iteratee) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values, iteratee)
    : array
}
```

`pullAllBy` 接收三个参数，`array` 数组、`values` 要删除的值、`iteratee` 迭代器函数。

首先是 `array` 、 `values` 的非空和长度判断，都满足的情况调用 `basePullAll` 函数返回处理后的数组，否则返回空数组。

## pullAllWith

> > 这个方法类似 _.pullAll，除了它接受一个 comparator 调用每一个数组元素的值。 comparator 会传入一个参数：(value)。 

```js
/**
 * This method is like `pullAll` except that it accepts `comparator` which
 * is invoked to compare elements of `array` to `values`. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `differenceWith`, this method mutates `array`.
 *
 * @since 4.6.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns `array`.
 * @see pull, pullAll, pullAllBy, pullAt, remove, reject
 * @example
 *
 * const array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }]
 *
 * pullAllWith(array, [{ 'x': 3, 'y': 4 }], isEqual)
 * console.log(array)
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 */
function pullAllWith(array, values, comparator) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values, undefined, comparator)
    : array
}
```

`pullAllBy` 接收三个参数，`array` 数组、`values` 要删除的值、`iteratee` 迭代器函数。

首先是 `array` 、 `values` 的非空和长度判断，都满足的情况调用 `basePullAll` 函数返回处理后的数组，否则返回空数组。

## pullAt

> 从与索引对应的数组中删除元素，并返回已删除元素的数组。

```js
/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * **Note:** Unlike `at`, this method mutates `array`.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @returns {Array} Returns the new array of removed elements.
 * @see pull, pullAll, pullAllBy, pullAllWith, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'd']
 * const pulled = pullAt(array, [1, 3])
 *
 * console.log(array)
 * // => ['a', 'c']
 *
 * console.log(pulled)
 * // => ['b', 'd']
 */
function pullAt(array, ...indexes) {
  const length = array == null ? 0 : array.length
  const result = baseAt(array, indexes)

  basePullAt(array, map(indexes, (index) => isIndex(index, length) ? +index : index).sort(compareAscending))
  return result
}
```

`pullAt` 函数接收 2 个参数， `array` 数组、`indexes` 下标数组。

首先会处理 `length` ，调用 `baseAt` 返回处理后的数组保存到 `result`，调用 `basePullAt` 方法，将 `array` 原数组、调用 `map` 方法，传入 `indexes` 下标数组和迭代器函数的数组作为参数传入，最后将 `result` 返回。
