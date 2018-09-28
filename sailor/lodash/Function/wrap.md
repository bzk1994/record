## wrap

> 创建一个函数。提供的 value 包装在 wrapper 函数的第一个参数里。 任何附加的参数都提供给 wrapper 函数。 被调用时 this 绑定在创建的函数上。

```js
_.wrap(value, [wrapper=identity])
```

```js
 /**
  * Creates a function that provides `value` to `wrapper` as its first
  * argument. Any additional arguments provided to the function are appended
  * to those provided to the `wrapper`. The wrapper is invoked with the `this`
  * binding of the created function.
  *
  * @static
  * @memberOf _
  * @since 0.1.0
  * @category Function
  * @param {*} value The value to wrap.
  * @param {Function} [wrapper=identity] The wrapper function.
  * @returns {Function} Returns the new function.
  * @example
  *
  * var p = _.wrap(_.escape, function(func, text) {
  *   return '<p>' + func(text) + '</p>';
  * });
  *
  * p('fred, barney, & pebbles');
  * // => '<p>fred, barney, &amp; pebbles</p>'
  */
function wrap(value, wrapper) {
  return partial(castFunction(wrapper), value);
}
```

## partial

```js
/**
  * Creates a function that invokes `func` with `partials` prepended to the
  * arguments it receives. This method is like `_.bind` except it does **not**
  * alter the `this` binding.
  *
  * The `_.partial.placeholder` value, which defaults to `_` in monolithic
  * builds, may be used as a placeholder for partially applied arguments.
  *
  * **Note:** This method doesn't set the "length" property of partially
  * applied functions.
  *
  * @static
  * @memberOf _
  * @since 0.2.0
  * @category Function
  * @param {Function} func The function to partially apply arguments to.
  * @param {...*} [partials] The arguments to be partially applied.
  * @returns {Function} Returns the new partially applied function.
  * @example
  *
  * function greet(greeting, name) {
  *   return greeting + ' ' + name;
  * }
  *
  * var sayHelloTo = _.partial(greet, 'hello');
  * sayHelloTo('fred');
  * // => 'hello fred'
  *
  * // Partially applied with placeholders.
  * var greetFred = _.partial(greet, _, 'fred');
  * greetFred('hi');
  * // => 'hi fred'
  */
var partial = baseRest(function (func, partials) {
  var holders = replaceHolders(partials, getHolder(partial));
  return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
});
```