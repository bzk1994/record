
## 浅谈异步编程
JavaScript 单线程
使用异步代码的原因在于不希望在执行长时间任务的时候，阻塞下面程序的执行


### 异步编程的各种实现
假定有两个函数f1和f2，后者等待前者的执行结果

> f2 函数

```
function f2(res) {
  console.log(res)
}
```
### 回调函数

回调是将一个函数作为参数传递给另一个函数，并且在第一个函数完成后被调用。

回调函数常见于浏览器的 `EventListener` `Ajax`，`Node` 的文件 `I/O` 操作、 数据请求等

```
function f1(fn) {
  setTimeout(() => {
    fn('f1')
  }, 500)
}

f1(f2)
```

回调函数也有着不好的地方，随着业务需求的增加，多层回调函数的嵌套将形成回调地狱，代码的逻辑会比较混乱。

### jQuery Deferred

`jQuery 1.5.0` 以上版本支持了 `deferred` 对象

```
function f1() {
  const deferred = $.Deferred()

  setTimeout(() => {
    deferred.resolve('f1')
  }, 500)

  return deferred.promise()
}

$.when(f1())
  .then(res => {
    f2(res)
  })
```

### Promise

可以把 `Promise` 看成一个状态机。初始是 `pending` 状态，可以通过函数 `resolve` 和 `reject` ，将状态转变为 `resolved` 或者 `rejected` 状态，状态一旦改变就不能再次变化。

`then` 函数会返回一个 `Promise` 实例，并且该返回值是一个新的实例而不是之前的实例。因为 `Promise` 规范规定除了 `pending` 状态，其他状态是不可以改变的。

```
function f1() {
  return new Promise(resolve => {

    setTimeout(() => {
      resolve('f1')
    }, 500)

  })
}

f1().then(res => {
  f2(res)
})
```

### Generator

`Generator` 是 `ES6` 中新增的语法，和 `Promise` 一样，都可以用来异步编程

```
function* test() {
  let a = 1 + 2
  yield 2
  yield 3
}
let b = test()
console.log(b.next()) // >  { value: 2, done: false }
console.log(b.next()) // >  { value: 3, done: false }
console.log(b.next()) // >  { value: undefined, done: true }
```

使用 `Generator` 实现：
```
function f1() {
  return new Promise(resolve => {

    setTimeout(() => {
      resolve('f1')
    }, 500)

  })
}

function* foo() {
  const res = yield f1()
}
```

for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法
```
for (let n of foo()) {
  n.then && n.then(res => {
    f2(res)
  })
}
```

### async

`async` 函数返回一个 `Promise` 对象，可以使用`then` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

```
function f1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('f1')
    }, 500)
  })
}

(async function() {
  const res = await f1()
  f2(res)
})()
```

### 编译

[Babel](http://babeljs.io/en/repl)

[Traceur](http://google.github.io/traceur-compiler/demo/repl.html#)

### 参考资料

[callbacks-listeners-promises](http://sporto.github.io/blog/2012/12/09/callbacks-listeners-promises/)

[es6-in-depth-generators](https://hacks.mozilla.org/2015/05/es6-in-depth-generators/)

[asynchronous-javascript](https://blog.risingstack.com/asynchronous-javascript/)

[ES6 generator](http://es6.ruanyifeng.com/#docs/generator)

[阮一峰 generator](http://www.ruanyifeng.com/blog/2015/04/generator.html)

[MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)