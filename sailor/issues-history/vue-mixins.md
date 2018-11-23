# vue mixins && extend

`vue` 提供了 `mixins` 这个 `API`，可以让我们将组件中的可复用功能抽取出来，放到 `mixin` 中，然后在组件中引入 `mixin` 即可，让组件显得不再臃肿，也提高了代码的可复用性。

如何理解 `mixins` 呢？我们可以将 `mixins` 理解成一个数组，数组中有单或多个 `mixin`，`mixin` 本质就是一个 `JS` 对象，它可以有 `data` `created` `methods` 等等等等 `vue` 实例中拥有的所有属性，甚至可以在 `mixin` 中再次嵌套 `mixins`，`It's amazing !`

写个简单的栗子:

```html
<div id="app">
  <h1>{{message}}</h1>
</div>
```

```js
const myMixin = {
  data() {
    return {
      message: 'this is mixin message'
    }
  },
  created() {
    console.log('mixin created')
  }
}

const vm = new Vue({
  el: '#app',
  mixins: [myMixin],
  data() {
    return {
      message: 'this is vue instance message'
    }
  },
  created() {
    console.log(this.message)
    // => Root Vue Instance
    console.log('vue instance created')
    // => created myMixin
    // => created Root Vue Instance
  }
})
```

`miixn` 与 `Vue Instance` 合并时，会将 `created` 等钩子函数合并成数组，`mixin` 钩子先调用，当 `data`、`methods` 对象键值冲突时，以组件优先。

PS: 如果对 mixin 的概念还不太清的小伙伴，可以去 [vue 官方文档](https://cn.vuejs.org/v2/guide/mixins.html) 看一下 vuex 的基本概念和用法。


关于属性合并的代码在 `vue/vue/src/core/util/options.js`。

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
  ...
  const extendsFrom = child.extends
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  // 如果有 mixins 递归调用 mergeOptions 实现属性拷贝
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

其实当我们在 `vue` 实例中使用 `mixin` 时，会实现 `vue.$option` 和 `mixin` 属性的浅拷贝。


## 项目使用 

当我们在项目中使用 `element-ui`:

```js
export default {
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 10,
      tableData: [],
      loading: false
    }
  },

  created() {
    this.searchData && this.searchData()
  },

  methods: {
    handleSizeChange(size) {
      this.pageSize = size
      this.searchData && this.searchData()
    },

    handleCurrentChange(page) {
      this.pageNo = page
      this.searchData && this.searchData()
    },

    handleSearchData() {
      this.pageNo = 1
      this.searchData && this.searchData()
    }
  }
}
```

避免申明，重复的方法
