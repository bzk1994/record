class Bar {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return `${this.x}, ${this.y}`
  }
}

const foo = new Bar(1, 2)

console.log(typeof Bar) // function

// 类本身就指向构造函数
console.log(Bar === Bar.prototype.constructor)  // true

console.log(foo.constructor === Bar.prototype.constructor)  // true

console.log(foo.hasOwnProperty('x'))  // true

console.log(foo.hasOwnProperty('toString')) // false


// 私有方法

const symbolBar = Symbol('bar')

class Baz {
  constructor() { }

  [symbolBar]() {
    return 'Baz symbolBar'
  }
}

const baz = new Baz()

// TypeError: baz.symbolBar is not a function
// console.log(baz.symbolBar())

// 静态方法 

class StaticFoo {
  constructor() {
    console.log('new.target ', new.target === StaticFoo)
  }
  static staticMethod() {
    return 'hello'
  }
}

console.log(StaticFoo.staticMethod())

const staticFoo = new StaticFoo()

// TypeError: foo.staticMethod is not a function
// console.log(foo.staticMethod())

class ExtendsFoo extends StaticFoo {
}

console.log(ExtendsFoo.staticMethod())

