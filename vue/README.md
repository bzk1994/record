## 带着问题去看源码

1. 如何双向绑定实现 v-modole core/observer/index
2. 如何依赖收集 如何实现观察者？
3. 如何实现异步更新
4. `minxin extend extends`  core/util/mergeOptions core/global-api/extend
5. `computed` 如何实现动态计算
6. `vue nextTik` 实现
7. `Vue.use`
8. `filter` 原理 不能访问 `this` ？
9. `vue .sync`
10. $watch
11. 生命周期钩子的实现
11. VNode构建

...
99. 源码收获

## 在源码中 `debugger`

> 下载 `Vue` 源码

```bash
$ git clone https://github.com/vuejs/vue.git
```

> 依赖安装
```bash
cd vue && yarn install
```

> 编辑 `config.js` 增加 `sourceMap`

```js
  // vue/scripts/config.js
  ...
  function genConfig (name) {
    const config = {
    input: opts.entry,
    external: opts.external,
    sourceMap: true,
    plugins: [...],
    output: {...}
  }
  ...
```

> 新建test.html

```js
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="./vue/dist/vue.js"></script>
    <title>Document</title>
  </head>

  <body>
    <div id="app">{{test}}</div>
  </body>

  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        test: 1
      }
    })
  </script>

  </html>
```

> 可在源代码中 `debugger` 或者在 `Chrome` 调试

```base
cd vue && yarn dev
```

```base
.
├── compiler                # 编译相关
├── core                    # 核心代码
│   ├── components            通用组件keep-alive
│   ├── config.js             组件默认配置
│   ├── global-api            工具函数
│   ├── index.js              Vue构造函数加工加工
│   ├── instance              Vue构造函数
│   ├── observer              数据响应核心代码
│   ├── util                  通用工具函数
│   └── vdom                  虚拟DOM相关
├── platforms               # 平台相关代码
│   ├── web                   web入口
│   └── weex                  weex入口
├── server                  # 服务端渲染相关
├── sfc                     # vue文件解析
└── shared                  # 通用代码
```

## 入口

运行 `yarn dev` 相当于执行了 `package.json` 的 `rollup -w -c scripts/config.js --environment TARGET:web-full-dev`

```js
{
...
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
    "dev:test": "karma start test/unit/karma.dev.config.js",
    "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
    "dev:compiler": "rollup -w -c scripts/config.js --environment TARGET:web-compiler ",
    ...
  }
}

在 `src/scripts/config.js` 中
编译的入口在  `src/platforms/web/entry-runtime-with-compiler.js` 中

```js
{
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  }
}
```

而 `entry-runtime-with-compiler.js` 也不是真正申明 `Vue` 构造函数的地方
通过引用找到申明 `Vue` 的文件

```js
// entry-runtime-with-compiler.js
import Vue from './runtime/index'

// runtime/index
import Vue from 'core/index'

// core/index
import Vue from './instance/index'

// instance/index
...
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

在 `initMixin` 中增加了 `_init` 方法 让后在`Vue` 构造函数中调用

```js
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    ...
    // expose real self
    vm._self = vm
    initLifecycle(vm) // vm上添加一些属性作为标识
    initEvents(vm)  // 初始化事件中心
    initRender(vm)  // 初始化渲染相关
    callHook(vm, 'beforeCreate')  // 调用生命钩子
    initInjections(vm) // resolve injections before data/props
    initState(vm)   // 初始化 props methods data computed watch
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created') // 调用生命钩子

    ...
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

```js
export function initState(vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

### 1. 双向数据绑定 v-model

只是一个语法糖而已

```html
<input
  :value="name"
  @input="name=$event.target.value">
```

邪术 v-model 父子组件通信

### 2. `Vue.use` 实现

```js
// vue/src/core/global-api/use.js
/* @flow */

import { toArray } from '../util/index'

export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 通过数组储存已注册插件 防止重复注册
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    // 判断有没有install方法 有直接调用 如果plugin是函数直接执行
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

### mixins extends extned

mixins extend 实现代码复用

数据对象在内部会进行浅合并 (一层属性深度)，在和组件的数据发生冲突时以组件数据优先

```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```


```js
/**
 * vue/src/core/util/options.js
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions(
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)
  const extendsFrom = child.extends
  // 递归调用 mergeOptions
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField(key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```


* 双向数据绑定 模板编译 数据劫持 Watcher










