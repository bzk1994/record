## template

> 创建一个预编译模板方法，可以插入数据到模板中 "interpolate" 分隔符相应的位置。 HTML会在 "escape" 分隔符中转换为相应实体。 在 "evaluate" 分隔符中允许执行JavaScript代码。 在模板中可以自由访问变量。 如果设置了选项对象，则会优先覆盖 _.templateSettings 的值。 

```js
_.template([string=''], [options={}])
```

```js
/**
 * Creates a compiled template function that can interpolate data properties
 * in "interpolate" delimiters, HTML-escape interpolated data properties in
 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
 * properties may be accessed as free variables in the template. If a setting
 * object is given, it takes precedence over `_.templateSettings` values.
 *
 * **Note:** In the development build `_.template` utilizes
 * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
 * for easier debugging.
 *
 * For more information on precompiling templates see
 * [lodash's custom builds documentation](https://lodash.com/custom-builds).
 *
 * For more information on Chrome extension sandboxes see
 * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The template string.
 * @param {Object} [options={}] The options object.
 * @param {RegExp} [options.escape=_.templateSettings.escape]
 *  The HTML "escape" delimiter.
 * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
 *  The "evaluate" delimiter.
 * @param {Object} [options.imports=_.templateSettings.imports]
 *  An object to import into the template as free variables.
 * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
 *  The "interpolate" delimiter.
 * @param {string} [options.sourceURL='lodash.templateSources[n]']
 *  The sourceURL of the compiled template.
 * @param {string} [options.variable='obj']
 *  The data object variable name.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the compiled template function.
 * @example
 */
function template(string, options, guard) {
  // Based on John Resig's `tmpl` implementation
  // (http://ejohn.org/blog/javascript-micro-templating/)
  // and Laura Doktorova's doT.js (https://github.com/olado/doT).
  var settings = lodash.templateSettings;

  if (guard && isIterateeCall(string, options, guard)) {
    options = undefined;
  }
  string = toString(string);
  options = assignInWith({}, options, settings, customDefaultsAssignIn);

  var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
    importsKeys = keys(imports),
    importsValues = baseValues(imports, importsKeys);

  var isEscaping,
    isEvaluating,
    index = 0,
    interpolate = options.interpolate || reNoMatch,
    source = "__p += '";

  // Compile the regexp to match each delimiter.
  var reDelimiters = RegExp(
    (options.escape || reNoMatch).source + '|' +
    interpolate.source + '|' +
    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
    (options.evaluate || reNoMatch).source + '|$'
    , 'g');

  // Use a sourceURL for easier debugging.
  var sourceURL = '//# sourceURL=' +
    ('sourceURL' in options
      ? options.sourceURL
      : ('lodash.templateSources[' + (++templateCounter) + ']')
    ) + '\n';

  string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);

    // Escape characters that can't be included in string literals.
    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

    // Replace delimiters with snippets.
    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }
    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }
    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    index = offset + match.length;

    // The JS engine embedded in Adobe products needs `match` returned in
    // order to produce the correct `offset` value.
    return match;
  });

  source += "';\n";

  // If `variable` is not specified wrap a with-statement around the generated
  // code to add the data object to the top of the scope chain.
  var variable = options.variable;
  if (!variable) {
    source = 'with (obj) {\n' + source + '\n}\n';
  }
  // Cleanup code by stripping empty strings.
  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
    .replace(reEmptyStringMiddle, '$1')
    .replace(reEmptyStringTrailing, '$1;');

  // Frame code as the function body.
  source = 'function(' + (variable || 'obj') + ') {\n' +
    (variable
      ? ''
      : 'obj || (obj = {});\n'
    ) +
    "var __t, __p = ''" +
    (isEscaping
      ? ', __e = _.escape'
      : ''
    ) +
    (isEvaluating
      ? ', __j = Array.prototype.join;\n' +
      "function print() { __p += __j.call(arguments, '') }\n"
      : ';\n'
    ) +
    source +
    'return __p\n}';

  var result = attempt(function () {
    return Function(importsKeys, sourceURL + 'return ' + source)
      .apply(undefined, importsValues);
  });

  // Provide the compiled function's source by its `toString` method or
  // the `source` property as a convenience for inlining compiled templates.
  result.source = source;
  if (isError(result)) {
    throw result;
  }
  return result;
}
```

`template` 函数接收 3 个参数，`string` 模板字符串、`options` 选项、`guard` 警卫。

我们从一个基本的例子说起。

```js
// Use the "interpolate" delimiter to create a compiled template.
var compiled = _.template('hello <%= user %>!');
compiled({ 'user': 'fred' });
// => 'hello fred!'
```

`compiled` 是调用 `template` 函数，并且传入了 `hello <%= user %>!` 模板字符串返回的函数。

调用 `compiled` 函数，并传入 `{ 'user': 'fred' }` 对象，会返回 `hello fred!` 字符串，
 `compiled` 内部会将 `<%= user %>` 模板字符串替换成 `fred`，也就是传入对象的中 `user` 对应的 `value`。

来看一下 `template` 函数是怎么实现的：

```js
var settings = lodash.templateSettings;

if (guard && isIterateeCall(string, options, guard)) {
  options = undefined;
}
string = toString(string);
options = assignInWith({}, options, settings, customDefaultsAssignIn);

var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
  importsKeys = keys(imports),
  importsValues = baseValues(imports, importsKeys);

var isEscaping,
  isEvaluating,
  index = 0,
  interpolate = options.interpolate || reNoMatch,
  source = "__p += '";
```

`template` 函数开始会申明初始变量，`settings` 为 `lodash` 的 `templateSettings` 默认配置，
`imports` 导入对象、`importsKeys` 导入对象 `key` 数组、`importsValues` 导入对象的 `value` 数组。

```js
// Compile the regexp to match each delimiter.
var reDelimiters = RegExp(
  (options.escape || reNoMatch).source + '|' +
  interpolate.source + '|' +
  (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
  (options.evaluate || reNoMatch).source + '|$'
  , 'g');
```





```js
string = toString(string);
options = assignInWith({}, options, settings, customDefaultsAssignIn);
```

对传入的 `string` 进行字符串转化，对 `options` 进行属性拷贝并传入 `customDefaultsAssignIn` 回调函数。
