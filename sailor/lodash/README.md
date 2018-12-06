## 目录

* [Array c ~ h](https://github.com/zhanghao-zhoushan/record/issues/17)
* [Array i - s](https://github.com/zhanghao-zhoushan/record/issues/18)
* [Array t - z](https://github.com/zhanghao-zhoushan/record/issues/19)
* [Collection](https://github.com/zhanghao-zhoushan/record/issues/20)
* [Date](https://github.com/zhanghao-zhoushan/record/issues/21)
* [Function](https://github.com/zhanghao-zhoushan/record/issues/22)
* [Lang](https://github.com/zhanghao-zhoushan/record/issues/23)
* [Math](https://github.com/zhanghao-zhoushan/record/issues/24)
* [Number](https://github.com/zhanghao-zhoushan/record/issues/25)
* [Object a ~ f](https://github.com/zhanghao-zhoushan/record/issues/26)
* [Object g ~ v](https://github.com/zhanghao-zhoushan/record/issues/27)
* [Seq](https://github.com/zhanghao-zhoushan/record/issues/28)
* [String](https://github.com/zhanghao-zhoushan/record/issues/29)
* [Util](https://github.com/zhanghao-zhoushan/record/issues/30)
* [Collection](https://github.com/zhanghao-zhoushan/record/issues/31)
* [Methods](https://github.com/zhanghao-zhoushan/record/issues/32)

## Branch: master

在 `Lodash` 的 [README.md](https://github.com/lodash/lodash/blob/master/README.md) 中我们看到 `master` 分支中没有 `package.json` 文件，并不是通过 `npm` 构建的，而是了通过 `lodash-cli` 构建了 `master` 分支。

```js
The [Lodash](https://lodash.com/) library exported as a [UMD](https://github.com/umdjs/umd) module.
Generated using [lodash-cli](https://www.npmjs.com/package/lodash-cli):

$ npm run build
$ lodash -o ./dist/lodash.js
$ lodash core -o ./dist/lodash.core.js
```

在 [CONTRIBUTING.md](https://github.com/lodash/lodash/blob/master/.github/CONTRIBUTING.md) 中作者也给出了解释，正在进行 `Lodash v5` 版本的开发，导致 `master` 用于贡献的 `npm` 脚本无法正常工作。

```js
:construction: Notice :construction:

Pardon the mess. The `master` branch is in flux while we work on Lodash v5. This
means things like npm scripts, which we encourage using for contributions, may
not be working. Thank you for your patience.
```

## 分支管理

开始阅读 `Lodash` 源码时，我是 `checkout` 到 `4.17.11-pre` 分支来进行阅读的，现在 `github` 上已经删除了 `4.17.11-pre` 分支，增加了新的 `Releases` 包 `4.17.11` 版本，并且增加了 `4.17.12-pre` 分支。

我们可以推测下，`lodash` 通过建立 `4.17.11-pre` 分支，做为功能开发分支，功能完成之后，生成 `Releases` 包，`checkout` 到 `4.17.12-pre` 分支，并且删除 `4.17.11-pre` 分支，这样实现功能开发及分支管理。

## 阅读建议

我是按照 [Lodash 文档](https://lodash.com/docs/4.17.10#partial) 顺序进行阅读，会优先在 [Branch: master](https://github.com/lodash/lodash) 中寻找 `es6` 实现的 `method`，如果没有实现再去看 `4.17.11-pre` 分支。

作者正在进行 `v5` 版本的开发，估计到时候会全面拥抱 `es6` 语法，摒弃 `es5`， 因为 `lodash.js` 已经十分庞大了，有 `17102` 行代码，大约 `540k` ，功能迭代全在一个 `js` 中，肯定对功能迭代或者开发过程有一定影响。

而 `es6` 基于模块化开发，并且新增很多强大的功能，大可以进行 `lodash` 的功能精简。

在阅读过程中，建议将项目 `clone` 到本地， `checkout` 到 `4.17.11-pre` 分支，方面查找 `lodash.js` 中的方法，而在浏览器中打开 [Branch: master](https://github.com/lodash/lodash)，建议下载 `Chrome` 的 `Octotree` 、`Awesome Autocomplete for GitHub` 插件，方面切换、查找文件。

## 参考文档

* [lodash](https://lodash.com/docs/4.17.10#chunk)
* [lodash 中文文档](http://lodash.think2011.net/)

## 扩展

* shuffle Fisher-Yates shuffle 洗牌算法