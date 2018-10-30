## mixin

> 添加来源对象自身的所有可枚举函数属性到目标对象。 如果 object 是个函数，那么函数方法将被添加到原型链上。 

```js
_.mixin([object=lodash], source, [options={}])
```

```js
/**
  * Adds all own enumerable string keyed function properties of a source
  * object to the destination object. If `object` is a function, then methods
  * are added to its prototype as well.
  *
  * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
  * avoid conflicts caused by modifying the original.
  *
  * @static
  * @since 0.1.0
  * @memberOf _
  * @category Util
  * @param {Function|Object} [object=lodash] The destination object.
  * @param {Object} source The object of functions to add.
  * @param {Object} [options={}] The options object.
  * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
  * @returns {Function|Object} Returns `object`.
  * @example
  *
  * function vowels(string) {
  *   return _.filter(string, function(v) {
  *     return /[aeiou]/i.test(v);
  *   });
  * }
  *
  * _.mixin({ 'vowels': vowels });
  * _.vowels('fred');
  * // => ['e']
  *
  * _('fred').vowels().value();
  * // => ['e']
  *
  * _.mixin({ 'vowels': vowels }, { 'chain': false });
  * _('fred').vowels();
  * // => ['e']
  */
function mixin(object, source, options) {
  var props = keys(source),
    methodNames = baseFunctions(source, props);

  if (options == null &&
    !(isObject(source) && (methodNames.length || !props.length))) {
    options = source;
    source = object;
    object = this;
    methodNames = baseFunctions(source, keys(source));
  }
  var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
    isFunc = isFunction(object);

  arrayEach(methodNames, function (methodName) {
    var func = source[methodName];
    object[methodName] = func;
    if (isFunc) {
      object.prototype[methodName] = function () {
        var chainAll = this.__chain__;
        if (chain || chainAll) {
          var result = object(this.__wrapped__),
            actions = result.__actions__ = copyArray(this.__actions__);

          actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
          result.__chain__ = chainAll;
          return result;
        }
        return func.apply(object, arrayPush([this.value()], arguments));
      };
    }
  });

  return object;
}
```

详见 `Seq/chain.md`