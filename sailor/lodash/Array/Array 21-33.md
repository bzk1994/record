## initial

> 获取数组中除了最后一个元素之外的所有元素。

```js
/**
 * Gets all but the last element of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * initial([1, 2, 3])
 * // => [1, 2]
 */
function initial(array) {
  const length = array == null ? 0 : array.length
  return length ? slice(array, 0, -1) : []
}
```

`initial` 函数接收一个 `array` 参数，首先申明 `length` 变量保存数组长度，默认为 0。

最后返回一个三元表达式，如果 `length` 为真，调用 `slice` 函数切割数组，此时传参为 `0, -1`，会从第 0 个开始截取到数组长度位置，单不包括最后一个，否则就返回空数组。

## intersection

> 创建一个包含所有使用 SameValueZero 进行等值比较后筛选的唯一值数组。

```js
/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * intersection([2, 1], [2, 3])
 * // => [2]
 */
function intersection(...arrays) {
  const mapped = map(arrays, castArrayLikeObject)
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : []
}
```

`intersection` 函数首先申明 `mapped` 变量，调用 `map` 函数处理 `arrays` 数组后赋值给 `mapped`。

`castArrayLikeObject` 函数：

```js
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : []
}
```

`castArrayLikeObject` 函数只是 `isArrayLikeObject` 的简单封装，如果 `value` 是对象类数组则返回 `value`，否则返回空数组。

`map` 函数：

```js
function map(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}
```

`map` 函数接收 2 个参数， `array` 数组、`iteratee` 迭代器函数。

申明 `result` 空数组，通过 `while` 循环，`index` 累加，将经过迭代器函数处理的 `value` 插入 `result`，最后将 `result` 返回。

`intersection` 函数最后会返回一个三元表达式，如果 `mapped` 有长度并且 `mapped[0]` 与 `arrays[0]` 全等，就调用 `baseIntersection` 函数返回处理后的数组，否则就返回空数组。

## intersectionBy

> 这个方法类似 _.intersection，除了它接受一个 iteratee 调用每一个数组和值。iteratee 会传入一个参数：(value)。

```js
/**
 * This method is like `intersection` except that it accepts `iteratee`
 * which is invoked for each element of each `arrays` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [2.1]
 */
function intersectionBy(...arrays) {
  let iteratee = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  if (iteratee === last(mapped)) {
    iteratee = undefined
  } else {
    mapped.pop()
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, iteratee)
    : []
}
```

`intersectionBy` 接收 `arrays` 参数数组。

首先申明 `iteratee` 变量，调用 `last` 函数获取 `arrays` 最后一个，
申明 `mapped` 变量处理 `arrays` 数组。

接着会对判断 `iteratee` 是否全等于 `mapped` 的最后一个，如果是将 `iteratee` 赋值为 `undefined`，否则调用 `pop` 方法删除 `mapped` 最后一个元素，这个 `if` 应该是用来是否传入了判断 `iteratee` 迭代函数，因为 `mapped` 数组排除了不是数组的元素，如果与 `iteratee` 不全等就说明是 `iteratee` 迭代函数。

最后会返回一个三元表达式，如果 `mapped` 有 `length` 并且 `mapped[0]` 全等于 `arrays[0]`， 
调用 `baseIntersection` 函数，此时传入了第 2 个参数 `iteratee` 迭代函数，返回 `baseIntersection` 函数函数调用返回的数组，否则就返回空数组。

## intersectionWith

> 这个方法类似 _.intersection，除了它接受一个 comparator 调用每一个数组和值。iteratee 会传入2个参数：((arrVal, othVal)。

```js
/**
 * This method is like `intersection` except that it accepts `comparator`
 * which is invoked to compare elements of `arrays`. The order and references
 * of result values are determined by the first array. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * intersectionWith(objects, others, isEqual)
 * // => [{ 'x': 1, 'y': 2 }]
 */
function intersectionWith(...arrays) {
  let comparator = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  comparator = typeof comparator == 'function' ? comparator : undefined
  if (comparator) {
    mapped.pop()
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, undefined, comparator)
    : []
}
```

`intersectionWith` 函数开始与 `intersectionBy` 函数相似，这里会对 `comparator` 进行类型判断，如果不是 `function` 就将 `comparator` 赋值为 `undefined`，然后判断如果 `comparator` 为真，调用 `pop` 方法将 `mapped` 最后一个元素删除。

最后也是调用了 `baseIntersection` 函数，只是第二个参数是 `undefined`，传了第三个参数是 `comparator` 比较函数。

## join

> 将数组中的所有元素转换为由 separator 分隔的字符串。

```js
/**
  * Converts all elements in `array` into a string separated by `separator`.
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Array
  * @param {Array} array The array to convert.
  * @param {string} [separator=','] The element separator.
  * @returns {string} Returns the joined string.
  * @example
  *
  * _.join(['a', 'b', 'c'], '~');
  * // => 'a~b~c'
  */
function join(array, separator) {
  return array == null ? '' : nativeJoin.call(array, separator);
}
```

`join` 返回一个三元表达式，如果 `array` 等于 `null`，返回空字符串，
否则调用原生数组的 `join` 函数，拼接字符串，然后返回。

```js
var arrayProto = Array.prototype
var nativeJoin = arrayProto.join
```

`nativeJoin` 就是 `Array.prototype.join`，是数组原生方法 `join` 的简单封装。

## last

> 获取数组中的最后一个元素。

```js
/**
 * Gets the last element of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * last([1, 2, 3])
 * // => 3
 */
function last(array) {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}
```

申明 `length` 变量保存 `array.length`，默认为 0。

最后返回一个三元表达式，如果 `length` 为真返回数组最后一个，否则返回 `undefined`。

## lastIndexOf

> 这个方法类似 _.indexOf，除了它是从右到左遍历元素的。

```js
/**
 * This method is like `indexOf` except that it iterates over elements of
 * `array` from right to left.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * lastIndexOf([1, 2, 1, 2], 2)
 * // => 3
 *
 * // Search from the `fromIndex`.
 * lastIndexOf([1, 2, 1, 2], 2, 2)
 * // => 1
 */
function lastIndexOf(array, value, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = length
  if (fromIndex !== undefined) {
    index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1)
  }
  return value === value
    ? strictLastIndexOf(array, value, index)
    : baseFindIndex(array, baseIsNaN, index, true)
}
```

`lastIndexOf` 接收 3 个参数，`array` 数组、`value` 检索值、`fromIndex` 起始位置。

首先申明 `length` 变量，保存数组长度，默认为 0，如果 `length` 为 `false`，返回 -1。

如果 `fromIndex` 不等于 `undefined`，处理起始 `index` 。

最后返回一个三元表达式，如果 `value === value`，这里是做了 `value` 是 `NaN` 的处理，
如果不是 `NaN` 返回 `strictLastIndexOf` 函数返回的下标，
如果是 `NaN` 的话就调用 `baseFindIndex` ，并将 `baseIsNaN` 作为迭代函数传入，返回数组中符合迭代函数的下标。

`strictLastIndexOf` 函数：

```js
function strictLastIndexOf(array, value, fromIndex) {
  let index = fromIndex + 1
  while (index--) {
    if (array[index] === value) {
      return index
    }
  }
  return index
}
```

`strictLastIndexOf` 函数首先申明 `index` 变量为 `fromIndex + 1`，接着进入 `while` 循环，`index` 累减，如果 `array[index]` 与 `value` 全等，返回 `index` 下标，否则循环完毕返回 `index` 为 -1。


`baseFindIndex` 函数：

```js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array
  let index = fromIndex + (fromRight ? 1 : -1)

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}
```

`baseFindIndex` 函数首先会申明 `length` 变量保存数组长度，接着申明 `index`。

接着进入 `while` 循环，这里会根据 `fromRight` 是否为真，最升序、降序的处理，在循环中会调用 `predicate` 函数，如果为真，返回 `index` 下标，否则返回 -1。

## nth

> 获取数组索引的 value

```js
/**
 * Gets the element at index `n` of `array`. If `n` is negative, the nth
 * element from the end is returned.
 *
 * @since 4.11.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=0] The index of the element to return.
 * @returns {*} Returns the nth element of `array`.
 * @example
 *
 * const array = ['a', 'b', 'c', 'd']
 *
 * nth(array, 1)
 * // => 'b'
 *
 * nth(array, -2)
 * // => 'c'
 */
function nth(array, n) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return
  }
  n += n < 0 ? length : 0
  return isIndex(n, length) ? array[n] : undefined
}
```

`nth` 函数接收 2 个参数，`array` 数组、`n` 下标。

申明 `length` 变量保存数组长度，默认为 0，如果 `length` 为 `false` 中端执行，接着就是 `n` 为负数时的处理。

最后返回一个三元表达式，调用 `isIndex` 方法，判断是否是一个有效的索引，如果是有效索引就将 `array[n]` 返回，否则就返回 `undefined`。

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

`pull` 函数是 `pullAll` 函数的简单封装，返回 `pullAll` 执行后的数组。

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

`pullAll` 函数接收 `array` 函数，`values` 要删除的值。

`pullAll` 函数返回一个三元表达式，如果 `array` 和 `values` 不为 `null` 并且有长度，返回调用 `basePullAll` 函数处理后的数组，否则直接返回 `array` 。

`basePullAll` 函数：

```js
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

首先申明 `indexOf` 变量，这里是一个三元表达式，如果有传入 `comparator` ，就是 `baseIndexOfWith`，否则赋值为 `baseIndexOf`。

申明 `length` 变量保存 `values` 长度，如果 `array` 与 `values` 全等，此时都是一个数组，为复杂对象、指针相同，调用 `copyArray` 函数进行数组拷贝，赋值给 `values`。

如果有 `iteratee` 迭代器函数，将循环调用 `iteratee` 后的数组赋值给 `seen`。

接下来是双重 `while` 循环，第一层中 `index` 累加，申明 `fromIndex` 变量为 0 ，申明 `value` 变量保存循环的值，申明 `computed` 变量保存迭代器处理后的 `value`。

在第二层中会调用 `indexOf` 方法，传入 `seen` 迭代器函数处理后的数组、`computed` 处理后的 `value`、`fromIndex` 循环 `index`，`comparator` 比较函数，取出对应下标，并且赋值给 `fromIndex`，如果当前数组中有这个 `computed`，有 `fromIndex` 下标。

接着判断 `seen` 不全等于 `array` 数组，调用 `splice` 删除 `seen` 的 `fromIndex` 下标元素，
然后调用 `splice` 方法删除 `array` 数组的 `fromIndex` 下标元素，最后将 `array` 返回。

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

首先会对 `array` 、`values` 的非空和长度判断，都满足就调用 `basePullAll` 函数返回处理后的数组，调用 `basePullAll` 函数时传入了 `iteratee` 迭代函数，如果不满足返回 `array`。

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

`pullAllWith` 函数与 `pullAllBy` 相似，只是调用 `basePullAll` 函数的时候传入的第三个参数为 `undefined`，增加了第四个参数 `comparator`。

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

首先申明 `length` 变量保存 `array` 长度，默认为 0 ，
申明 `result` 变量保存调用 `baseAt` 返回的数组，`baseAt` 函数会返回 `array` 中对应 `indexes` 的数组。

接调用 `basePullAt` 方法，方法比较长，拆开来看。

```js
map(indexes, (index) => isIndex(index, length) ? +index : index)
```

调用 `map` 函数，循环 `indexes`，在回调函数中调用 `isIndex` 判断有效下标，如果是采用 `+` 隐式转化，确保 `index` 是数字，如果不是仍旧将 `index` 返回。

```js
indexes.sort(compareAscending)
```

经过 `map` 处理后会连缀 `sort` 函数，并传入 `compareAscending` 比较函数，按照升序进行排序，最后将 `result` 返回。

`basePullAt` 函数：

```js
function basePullAt(array, indexes) {
  let length = array ? indexes.length : 0 // 2
  const lastIndex = length - 1 // 1

  while (length--) { // 1 0
    let previous // undiefind 3
    const index = indexes[length] // 3 1
    if (length == lastIndex || index !== previous) {
      previous = index // 3
      if (isIndex(index)) {
        array.splice(index, 1)
      } else {
        baseUnset(array, index)
      }
    }
  }
  return array
}
```

`basePullAt` 函数接收 2 个参数，`array` 要修改数组、`indexes` 删除的元素的索引。

首先申明 `length` 变量保存 `indexes` 长度，默认为 0，`lastIndex` 为 `length - 1`。

进入 `while` 循环，`length` 累减，在循环中会从 `indexes` 取出删除元素下标，
这里有个 `if` 判断，判断 `length == lastIndex`，第一次循环会符合这个条件，第二次循环会比较 `index !== previous`。

进入 `if`，会调用 `isIndex` 判断 `index` 为有效下标，是就调用 `splice` 删除 `index` 所在下标元素，此方法会修改原数组，如果不是就调用 `baseUnset` 删除 `array` 中的这个路径，最后将数组返回。

