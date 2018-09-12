## union

> 创建顺序排列的唯一值组成的数组。所有值经过 SameValueZero 等值比较。

```js
_.union([arrays])
```

```js
/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @see difference, unionBy, unionWith, without, xor, xorBy
 * @example
 *
 * union([2, 3], [1, 2])
 * // => [2, 3, 1]
 */
function union(...arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true))
}
```

`union` 函数使用 `reset` 运算符将参数转成数组，调用 `baseUniq` 函数，并将 `baseFlatten` 扁平化 `arrays` 数组作为参数传入，最后返回 `baseUniq` 调用后的数组。

## unionBy

> 这个方法类似 _.union，除了它接受一个 iteratee 调用每一个数组和值。iteratee 会传入一个参数：(value)。

```js
_.unionBy([arrays], [iteratee=_.identity])
```

```js
/**
 * This method is like `union` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by
 * which uniqueness is computed. Result values are chosen from the first
 * array in which the value occurs. The iteratee is invoked with one argument:
 * (value).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new array of combined values.
 * @see difference, union, unionWith, without, xor, xorBy
 * @example
 *
 * unionBy([2.1], [1.2, 2.3], Math.floor)
 * // => [2.1, 1.2]
 */
function unionBy(...arrays) {
  let iteratee = last(arrays)
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined
  }
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), iteratee)
}
```

`unionBy` 接收 `arrays` 数组，调用 `last` 方法获取 `iteratee` 迭代函数，判断 `isArrayLikeObject` 是数组对象，就将 `iteratee` 值为 `null`，最后调用 `baseUniq` 函数，并且之前的 `iteratee` 函数传入。

## unionWith

> 这个方法类似 _.union， 除了它接受一个 comparator 调用每一个数组元素的值。 comparator 会传入2个参数：(arrVal, othVal)。

```js
_.unionWith([arrays], [comparator])
```

```js
/**
 * This method is like `union` except that it accepts `comparator` which
 * is invoked to compare elements of `arrays`. Result values are chosen from
 * the first array in which the value occurs. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of combined values.
 * @see difference, union, unionBy, without, xor, xorBy
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * unionWith(objects, others, isEqual)
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
function unionWith(...arrays) {
  let comparator = last(arrays)
  comparator = typeof comparator == 'function' ? comparator : undefined
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator)
}
```

`unionWith` 函数接收 `arrays` 数组，调用 `last` 函数取出 `comparator` 比较函数，如果 `comparator` 不是 `function` 就将 `comparator` 置为 `null`，最后调用 `baseUniq` 方法，只是此时的参数与 `unionBy` 不同，第 2 个参数为 `undefined` ，第 3 个参数为 `comparator` 函数。

## baseUniq

> union 函数的基本实现。

```js
/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

/**
 * The base implementation of `uniqBy`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  let index = -1
  let includes = arrayIncludes
  let isCommon = true

  const { length } = array
  const result = []
  let seen = result

  if (comparator) {
    isCommon = false
    includes = arrayIncludesWith
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    const set = iteratee ? null : createSet(array)
    if (set) {
      return setToArray(set)
    }
    isCommon = false
    includes = cacheHas
    seen = new SetCache
  }
  else {
    seen = iteratee ? [] : result
  }
  outer:
  while (++index < length) {
    let value = array[index]
    const computed = iteratee ? iteratee(value) : value

    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let seenIndex = seen.length
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer
        }
      }
      if (iteratee) {
        seen.push(computed)
      }
      result.push(value)
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed)
      }
      result.push(value)
    }
  }
  return result
}
```

`baseUniq` 函数接收 3 个参数，`array` 数组、`iteratee` 迭代函数、`comparator` 比较函数。

开始是申明一些初始变量，如果有 `comparator` 比较函数，将 `isCommon` 置为 `true` ，`includes` 赋值为
`arrayIncludesWith` 函数，如果数组长度大于 `LARGE_ARRAY_SIZE` 200 ，会使用 `SetCache` 类做缓存优化，接着进入 `while` 循环，`index` 累加


## arrayIncludes

## SetCache