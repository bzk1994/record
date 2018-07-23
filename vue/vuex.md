
## 稍微看了下文档 想了几个问题

[vuex 文档](https://vuex.vuejs.org/zh/)

### 带着问题去看源码

0. global event bus 有何缺陷
1. $store 如何注入到所有子组件
2. mapState 实现
3. mapGetter 如何映射
4. Mutation 同步 && Action 异步
5. dispatch 方法实现
6. module 分割实现 && 局部状态 namespaced
7. 如何调用 vue-devtools
8. 内置 logger 插件实现
9. hotUpdate
10. 时空穿梭功能实现

## 在源码中 `debugger`

> 下载 `Vue` 源码

```bash
$ git clone git@github.com:vuejs/vuex.git
```

> 依赖安装
```bash
cd vue && yarn install
```

> 调试
```base
cd vue && yarn dev
```

