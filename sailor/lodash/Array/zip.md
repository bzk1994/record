## zip

> 创建一个打包所有元素后的数组。第一个元素包含所有提供数组的第一个元素，第二个包含所有提供数组的第二个元素，以此类推。

```js
_.zip([arrays])
```

```js
/**
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 *
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @returns {Array} Returns the new array of grouped elements.
 * @see unzip, unzipWith, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * zip(['a', 'b'], [1, 2], [true, false])
 * // => [['a', 1, true], ['b', 2, false]]
 */
function zip(...arrays) {
  return unzip(arrays)
}
```

## zipObject

> 这个方法类似 _.fromPairs，除了它接受2个数组，一个作为属性名，一个作为属性值。

```js
_.zipObject([props=[]], [values=[]])
```

```js
/**
 * This method is like `fromPairs` except that it accepts two arrays,
 * one of property identifiers and one of corresponding values.
 *
 * @since 0.4.0
 * @category Array
 * @param {Array} [props=[]] The property identifiers.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @see unzip, unzipWith, zip, zipObjectDeep, zipWith
 * @example
 *
 * zipObject(['a', 'b'], [1, 2])
 * // => { 'a': 1, 'b': 2 }
 */
function zipObject(props, values) {
  return baseZipObject(props || [], values || [], assignValue)
}
```

## zipObjectDeep

> 这个方法类似 _.zipObject，除了它支持属性路径。 This method is like _.zipObject except that it supports property paths。

```js
_.zipObjectDeep([props=[]], [values=[]])
```

```js
/**
 * This method is like `zipObject` except that it supports property paths.
 *
 * @since 4.1.0
 * @category Array
 * @param {Array} [props=[]] The property identifiers.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @see unzip, unzipWith, zip, zipObject, zipWith
 * @example
 *
 * zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2])
 * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
 */
function zipObjectDeep(props, values) {
  return baseZipObject(props || [], values || [], baseSet)
}
```

## zipWith

> 这个方法类似 _.zip， 除了它接受一个 iteratee 决定如何重组值。 iteratee 会调用每一组元素。

```js
_.zipWith([arrays], [iteratee=_.identity])
```

```js
/**
 * This method is like `zip` except that it accepts `iteratee` to specify
 * how grouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @since 3.8.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @param {Function} iteratee The function to combine
 *  grouped values.
 * @returns {Array} Returns the new array of grouped elements.
 * @see unzip, unzipWith, zip, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c)
 * // => [111, 222]
 */
function zipWith(...arrays) {
  const length = arrays.length
  let iteratee = length > 1 ? arrays[length - 1] : undefined
  iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined
  return unzipWith(arrays, iteratee)
}
```

## unzip

## unzipWith