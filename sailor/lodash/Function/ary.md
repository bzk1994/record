## ary

> 创建一个最多接受 N 个参数，忽略多余参数的方法。

```js
_.ary(func, [n=func.length])
```

```js
/**
  * Creates a function that invokes `func`, with up to `n` arguments,
  * ignoring any additional arguments.
  *
  * @static
  * @memberOf _
  * @since 3.0.0
  * @category Function
  * @param {Function} func The function to cap arguments for.
  * @param {number} [n=func.length] The arity cap.
  * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
  * @returns {Function} Returns the new capped function.
  * @example
  *
  * _.map(['6', '8', '10'], _.ary(parseInt, 1));
  * // => [6, 8, 10]
  */
function ary(func, n, guard) {
  n = guard ? undefined : n;
  n = (func && n == null) ? func.length : n;
  return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
}
```

## createWrap

```js
/**
  * Creates a function that either curries or invokes `func` with optional
  * `this` binding and partially applied arguments.
  *
  * @private
  * @param {Function|string} func The function or method name to wrap.
  * @param {number} bitmask The bitmask flags.
  *    1 - `_.bind`
  *    2 - `_.bindKey`
  *    4 - `_.curry` or `_.curryRight` of a bound function
  *    8 - `_.curry`
  *   16 - `_.curryRight`
  *   32 - `_.partial`
  *   64 - `_.partialRight`
  *  128 - `_.rearg`
  *  256 - `_.ary`
  *  512 - `_.flip`
  * @param {*} [thisArg] The `this` binding of `func`.
  * @param {Array} [partials] The arguments to be partially applied.
  * @param {Array} [holders] The `partials` placeholder indexes.
  * @param {Array} [argPos] The argument positions of the new function.
  * @param {number} [ary] The arity cap of `func`.
  * @param {number} [arity] The arity of `func`.
  * @returns {Function} Returns the new wrapped function.
  */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
      holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}
```