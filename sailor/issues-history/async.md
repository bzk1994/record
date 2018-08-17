## 一个栗子
```
let a = 0
const b = async () => {
  a = a + await 10
  console.log('2', a)
  a = await 10 + a
  console.log('3', a)
}
b()
a++
console.log('1', a)
```
## async
`async`函数返回一个`Promise`对象

## await
正常情况下，`await`命令后面是一个`Promise`对象。如果不是，会被转成一个立即`resolve`的`Promise`对象。

### 执行步骤
执行 `a = 0`
申明 `async` 函数 `b` 并执行
运行 `async` 函数内 `a = a + await 10`
遇到 `await` 返回 等到异步操作完成再继续执行
此时的 `a = 0`

运行 `a++`
打印 `console.log('1', a)`
// 1 1

主线程执行完成，执行 `b` 函数的异步操作

`a = a + await 10` => `a = 0 + 10` `console.log('2', a)`
// 2 10

`a = await 10 + a` => `a = 10 + 10`
`console.log('3', a)`
// 3 20

### 试试 `await 10 + a`
```
let a = 0
const b = async () => {
  a = await 10 + a
  console.log('2', a)
  a = await 10 + a
  console.log('3', a)
}
b()
a++
console.log('1', a)

// result
// 1 1
// 2 11
// 3 21
// 疑问 `await` 后的变量 `a` 为什么是 `1`
```

### `await` Trans `Promise`
```
let a = 0
const b = async () => {
  a = a + await new Promise((resolve) => {
    resolve(10)
  })
  console.log('2', a)
  a = await new Promise((resolve) => {
    resolve(10 + a)
  })
  console.log('3', a)
}
b()
a++
console.log('1', a)
```

### 变量 `a` 的两个值

```
let a = 'a'
let c = 'c'
const b = async function () {
  // 这里可以发现变量a有两种值，唯一区别就是在await之前之后
  // 之前的 a = 'a'
  // 之后的 a = 'A' 说明await后 的 a 找到的全部变量赋值 'A'后的 a
  // a = 'a' + 'a' + 10 + 'aA'
  // 刚开始认为遇到await返回执行主线程, 分成2步骤执行
  // a = a + a
  // a = a + await 10 + a
  // 但是先执行a = a + a 后 a 应该等于 'aa' 明显不对
  // 遇到await返回执行主线程后这里的a保留了原先 'a' 的值
  a = a + a + await 10 + a
  console.log('2', a)
  a = await 10 + a
  console.log('3', a)
}

b()
a += 'A'
console.log('1', a)

// 1 aA
// 2 aa10aA
// 3 10aa10aA
```

### Use `Generator`

```
function* g() {
  let i = 0
  yield i++
  yield i++
  yield i++
}

const gen = g()
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())

// 每一次调用 next ，generator总是保留了上次yield停留的上下文环境，导致变量 i 逐渐累加
// { value: 0, done: false }
// { value: 1, done: false }
// { value: 2, done: false }
// { value: undefined, done: true }
```

### `async` Trans `Generator`

`vasync` 的本质就是 `Generator` 函数的语法糖
尝试用在线 `babel` 转一波, 编译成 `Generator`
`Generator` 函数本意是 `iterator` 生成器，函数运行到` yield` 时退出，并保留上下文，在下次进入时可以继续运行
~~发现函数b是一个自执行函数，返回了 `function b` ，形成了一个闭包，维持了变量 `a` 的引用~~

[babeljs](http://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&code_lz=DYUwLgBAhhC8EAYBQSDGB7AdgZ0gIzmmwE9NUIAKASjgD4IBvJCaQmAamgHcoBLSAIzIWGHOlAA6YOgDmFAOQAmeQBpoVZq3hQe_CEIicom0dnEgpshQGZV6pAF8Ueakijt2aLGcnS58gTsoDSA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&lineWrap=true&presets=es2016%2Cstage-3&prettier=false&targets=&version=6.26.0&envVersion=)

```
function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error); return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value)
            .then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
        }
      }
      return step("next");
    });
  };
}

let a = 0;

const b = (() => {
  var _ref = _asyncToGenerator(function* () {
    a = a + (yield 10);
    console.log('2', a);
    a = (yield 10) + a;
    console.log('3', a);
  });

  return function b() {
    console.log('_asyncToGenerator', a)
    return _ref.apply(this, arguments);
  };
})();

b();
a++;
console.log('1', a);
```

## 稍微总结

[es6-in-depth-generators](https://hacks.mozilla.org/2015/05/es6-in-depth-generators/)

In technical terms, each time a generator yields, its stack frame—the local variables, arguments, temporary values, and the current position of execution within the generator body—is removed from the stack. However, the Generator object keeps a reference to (or copy of) this stack frame, so that a later .next() call can reactivate it and continue execution.

### 最关键的原因: 
 `Generator` 保留原先栈帧的引用（保留上下文）
`yield` 语句的执行会暂停当前函数的执行并保存当前的堆栈，返回当前 `yield` 语句的值
 但是 `Generator` 又是如何保留原先栈帧的引用

