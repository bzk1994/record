## 带着问题去看源码

1. 双向绑定实现
2. 如何依赖收集 如何实现观察者？
3. 如何实现异步更新
4. `minxin extend extends`
5. `computed` 如何实现动态计算
6. `vue nextTik` 实现
7. `Vue.use`
8. `filter` 原理 不能访问 `this` ？
9. `vue .sync`
10. Flex理解
11. Vuex理解

## 在源码中 `debugger`

下载 `Vue` 源码

```bash
$ git clone https://github.com/vuejs/vue.git
```

依赖安装
```bash
cd vue && yarn install
```

编辑 `config.js` 增加 `sourceMap`

```base
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

新建test.html

```base
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

可在源代码中 `debugger` 或者在 `Chrome` 调试

```base
cd vue && yarn dev
```


