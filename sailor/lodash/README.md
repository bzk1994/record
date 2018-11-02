# Lodash 源码解析

## 目录

> [Array c ~ h](https://github.com/zhanghao-zhoushan/record/issues/17)

> [Array i - s](https://github.com/zhanghao-zhoushan/record/issues/18)

> [Array t - z](https://github.com/zhanghao-zhoushan/record/issues/19)

> [Collection](https://github.com/zhanghao-zhoushan/record/issues/20)

> [Date](https://github.com/zhanghao-zhoushan/record/issues/21)

> [Function](https://github.com/zhanghao-zhoushan/record/issues/22)

> [Lang](https://github.com/zhanghao-zhoushan/record/issues/23)

> [Lang is](https://github.com/zhanghao-zhoushan/record/issues/24)

> [Math](https://github.com/zhanghao-zhoushan/record/issues/25)

> [Number](https://github.com/zhanghao-zhoushan/record/issues/26)

> [Object a ~ f](https://github.com/zhanghao-zhoushan/record/issues/27)

> [Object e ~ v](https://github.com/zhanghao-zhoushan/record/issues/28)

> [Seq](https://github.com/zhanghao-zhoushan/record/issues/29)

> [String](https://github.com/zhanghao-zhoushan/record/issues/30)

> [Util](https://github.com/zhanghao-zhoushan/record/issues/31)

> [Collection](https://github.com/zhanghao-zhoushan/record/issues/32)

> [Methods](https://github.com/zhanghao-zhoushan/record/issues/33)

## Branch: master

> 在 [lodash/README.md](https://github.com/lodash/lodash/blob/master/README.md) 中我们看到 `master` 分支中没有 `package.json` 文件，并不是通过 `npm` 构建的，而是了通过 `lodash-cli` 构建了 `master` 分支。

```js
The [Lodash](https://lodash.com/) library exported as a [UMD](https://github.com/umdjs/umd) module.
Generated using [lodash-cli](https://www.npmjs.com/package/lodash-cli):

$ npm run build
$ lodash -o ./dist/lodash.js
$ lodash core -o ./dist/lodash.core.js
```

> 在 [lodash/.github/CONTRIBUTING.md](https://github.com/lodash/lodash/blob/master/.github/CONTRIBUTING.md) 中作者也给出了解释，正在进行 `Lodash v5` 版本的开发，导致 `master` 用于贡献的 `npm` 脚本无法正常工作。

```js
:construction: Notice :construction:

Pardon the mess. The `master` branch is in flux while we work on Lodash v5. This
means things like npm scripts, which we encourage using for contributions, may
not be working. Thank you for your patience.
```

## 分支管理

开始阅读 `Lodash` 源码时，我是 `checkout` 到 `4.17.11-pre` 分支来进行阅读的，现在 `github` 上已经删除了 `4.17.11-pre` 分支，增加了新的 `Releases` 包 `4.17.11` 版本，并且增加了 `4.17.12-pre` 分支。

我们可以推测下，`lodash` 通过建立 `4.17.11-pre` 分支，做为功能开发分支，功能完成之后，生成 `Releases` 包，`checkout` 到 `4.17.12-pre` 分支，并且删除 `4.17.11-pre` 分支，这样实现功能开发及分支管理。

## package.json

基于 `npm` 托管的项目通常都会有 `package.json` 文件。

`lodash` 的关于项目构建的脚本：

```js
"scripts": {
  "build": "npm run build:main && npm run build:fp",
  "build:fp": "node lib/fp/build-dist.js",
  "build:fp-modules": "node lib/fp/build-modules.js",
  "build:main": "node lib/main/build-dist.js",
  "build:main-modules": "node lib/main/build-modules.js",
  ...
}
```

我们来先看 `build`，命令，执行 `build` 命令后会再次执行 `npm run build:main` 和 `npm run build:fp` 命令，而在 `build:fp`、`build:fp` 等命令中会调用 `node` 执行对应 `js` 文件。


## build:main

`build:main` 命令对应的是 `lib/main/build-dist.js` 文件:

```js
'use strict';

const async = require('async');
const path = require('path');

const file = require('../common/file');
const util = require('../common/util');

const basePath = path.join(__dirname, '..', '..');
const distPath = path.join(basePath, 'dist');
const filename = 'lodash.js';

const baseLodash = path.join(basePath, filename);
const distLodash = path.join(distPath, filename);

/*----------------------------------------------------------------------------*/

/**
 * Creates browser builds of Lodash at the `target` path.
 *
 * @private
 * @param {string} target The output directory path.
 */
function build() {
  async.series([
    file.copy(baseLodash, distLodash),
    file.min(distLodash)
  ], util.pitch);
}

build();
```

`build-dist.js` 首先会引用辅助 `npm` 包：

```js
// 处理异步 JavaScript
const async = require('async');
// 获取模块路径
const path = require('path');

// 封装的公共 file 方法
const file = require('../common/file');
// 封装的公共 util 方法
const util = require('../common/util');

// 基本路径
const basePath = path.join(__dirname, '..', '..');
// dist 路径
const distPath = path.join(basePath, 'dist');
// 文件名
const filename = 'lodash.js';

// lodash/lodash.js
const baseLodash = path.join(basePath, filename);
// lodash/dist/lodash.js
const distLodash = path.join(distPath, filename);
```

接着会申明 `build` 函数，并调用：

```js
// baseLodash lodash/lodash.js
// distLodash lodash/dist/lodash.js
function build() {
  async.series([
    file.copy(baseLodash, distLodash),
    file.min(distLodash)
  ], util.pitch);
}

build();
```

在 `build` 函数中，调用了 [async.series](https://caolan.github.io/async/docs.html#series) 函数，该函数会串行执行函数(包括异步函数)，并且传入 `util.pitch` 回调函数。

`file.copy` 函数：

```js
// srcPath lodash/lodash.js
// destPath lodash/dist/lodash.js
function copy(srcPath, destPath) {
  return _.partial(fs.copy, srcPath, destPath);
}
```

`copy` 函数会调用 `partial` 函数进行参数的预设，`partial` 会返回一个函数，
该函数会调用 [fs.copy](https://github.com/jprichardson/node-fs-extra) 进行文件的复制，就是将 `lodash/lodash.js` 复制为 `lodash/dist/lodash.js`。

`file.min` 函数：

```js
// srcPath lodash/dist/lodash.js
const minify = require('../common/minify.js');

function min(srcPath, destPath) {
  return _.partial(minify, srcPath, destPath);
}
```

`file.min` 函数用来创建部分 `min` 函数，此时传入了 `srcPath` 也就是 `lodash/dist/lodash.js`。

`minify` 函数:

```js
function minify(srcPath, destPath, callback, options) {
  if (_.isFunction(destPath)) {
    if (_.isObject(callback)) {
      options = callback;
    }
    callback = destPath;
    destPath = undefined;
  }
  if (!destPath) {
    destPath = srcPath.replace(/(?=\.js$)/, '.min');
  }
  const output = uglify.minify(srcPath, _.defaults(options || {}, uglifyOptions));
  fs.writeFile(destPath, output.code, 'utf-8', callback);
}
```

在 `minify` 函数中，主要调用了 `uglify.minify` 对 `lodash/dist/lodash.js` 进行压缩，在 `lodash/dist` 文件夹中生成 `lodash.min.js` 文件。

`util.pitch` 函数:

```js
function pitch(error) {
  if (error != null) {
    throw error;
  }
}
```

`pitch` 函数是 `async.series` 的 `error` 回调。

总的来说 `build:main` 命令主要是用来将 `lodash/lodash.js` 拷贝到 `lodash/dist/lodash.js`，接着对 `lodash/dist/lodash.js` 进行压缩生成 `lodash.min.js`，如果就调用 `util.pitch` 函数进行抛出异常信息。

## build:fp

`build:fp` 命令对应的是 `lib/fp/build-dist.js` 文件:

```js
'use strict';

const _ = require('lodash');
const async = require('async');
const path = require('path');
const webpack = require('webpack');

const file = require('../common/file');
const util = require('../common/util');

const basePath = path.join(__dirname, '..', '..');
const distPath = path.join(basePath, 'dist');
const fpPath = path.join(basePath, 'fp');
const filename = 'lodash.fp.js';

const fpConfig = {
  'entry': path.join(fpPath, '_convertBrowser.js'),
  'output': {
    'path': distPath,
    'filename': filename,
    'library': 'fp',
    'libraryTarget': 'umd'
  },
  'plugins': [
    new webpack.optimize.OccurenceOrderPlugin,
    new webpack.optimize.DedupePlugin
  ]
};

const mappingConfig = {
  'entry': path.join(fpPath, '_mapping.js'),
  'output': {
    'path': distPath,
    'filename': 'mapping.fp.js',
    'library': 'mapping',
    'libraryTarget': 'umd'
  }
};

/*----------------------------------------------------------------------------*/

/**
 * Creates browser builds of the FP converter and mappings at the `target` path.
 *
 * @private
 * @param {string} target The output directory path.
 */
function build() {
  async.series([
    _.partial(webpack, mappingConfig),
    _.partial(webpack, fpConfig),
    file.min(path.join(distPath, filename))
  ], util.pitch);
}

build();
```

`lib/fp/build-dist.js` 与 `lib/main/build-dist.js` 基本相似，首先是引用辅助 `npm` 包：

```js
// 引用 lodash
const _ = require('lodash');
// 处理异步 JavaScript
const async = require('async');
// 获取模块路径
const path = require('path');
const webpack = require('webpack');

// 封装的公共 file 方法
const file = require('../common/file');
// 封装的公共 util 方法
const util = require('../common/util');

// 基本路径
const basePath = path.join(__dirname, '..', '..');
// dist 路径
const distPath = path.join(basePath, 'dist');
// fp 路径
const fpPath = path.join(basePath, 'fp');
// 文件名
const filename = 'lodash.fp.js';
```

接着申明 2 个 `webpack` 配置：

```js
const fpConfig = {
  'entry': path.join(fpPath, '_convertBrowser.js'),
  'output': {
    'path': distPath,
    'filename': filename,
    'library': 'fp',
    'libraryTarget': 'umd'
  },
  'plugins': [
    // Order the modules and chunks by occurrence. This saves space, because often referenced modules and chunks get smaller ids.
    new webpack.optimize.OccurenceOrderPlugin,
    // Deduplicates modules and adds runtime code.
    new webpack.optimize.DedupePlugin
  ]
};

const mappingConfig = {
  'entry': path.join(fpPath, '_mapping.js'),
  'output': {
    'path': distPath,
    'filename': 'mapping.fp.js',
    'library': 'mapping',
    'libraryTarget': 'umd'
  }
};
```

然后申明 `build` 函数，并调用：

```js
function build() {
  async.series([
    _.partial(webpack, mappingConfig),
    _.partial(webpack, fpConfig),
    file.min(path.join(distPath, filename))
  ], util.pitch);
}

build();
```

在 `build` 函数内，调用 `async.series` 函数，传入 2 个调用 `partial` 函数进行参数预设后的 `webpack` 函数，`async.series` 函数会串行执行 `webpack` 函数，接着调用 `file.min` 函数，在 `lodash/dist` 文件夹中生成 `lodash.fp.js` 文件。

## 阅读建议

我是按照 [Lodash 文档](https://lodash.com/docs/4.17.10#partial) 目录顺序来阅读的，首先会在 [Lodash Branch: master](https://github.com/lodash/lodash) 中寻找 `es6` 实现的 `method`，如果没有实现再去看 `4.17.11-pre` 的 `lodash.js`。

作者正在进行 `v5` 版本的开发，估计到时候会全面拥抱 `es6` 语法，摒弃 `es5`， 因为 `lodash.js` 已经十分庞大了，有 `17102` 行代码，大约 `540k` ，功能迭代全在一个 `js` 中，肯定对功能迭代或者开发过程有一定影响。

在阅读过程中，建议 `clone` 到本地项目， `checkout` 到 `4.17.11-pre` 分支，方面查找 `lodash.js` 中的方法，而在浏览器中打开 [Lodash Branch: master](https://github.com/lodash/lodash)，建议下载 `Chrome` 的 `Octotree` 、`Awesome Autocomplete for GitHub` 插件，方面切换、查找文件。

## 参考文档

* [lodash](https://lodash.com/docs/4.17.10#chunk)
* [lodash 中文文档](http://lodash.think2011.net/)