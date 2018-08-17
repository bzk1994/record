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

const transOrganizeArr = [
  [{ "id": 796, "label": "测试六组", "parentId": 190 }],
  [
    { "id": 780, "label": "desc", "parentId": 764 },
    { "id": 806, "label": "测试部门11", "parentId": 764 }
  ],
  [
    {
      "id": 764, "label": "技术开发组", "parentId": 194,
      "children": [
        { "id": 780, "label": "desc", "parentId": 764 },
        { "id": 806, "label": "测试部门11", "parentId": 764 }
      ]
    },
    { "id": 782, "label": "22", "parentId": 194 }],
  [{ "id": 798, "label": "产品1小组", "parentId": 200 }],
  [{ "id": 809, "label": "大前端", "parentId": 808 }],
  [
    { "id": 128, "label": "部门名称", "parentId": 49 },
    { "id": 129, "label": "二位测3", "parentId": 49 },
    {
      "id": 190, "label": "测试组", "parentId": 49,
      "children": [
        { "id": 796, "label": "测试六组", "parentId": 190 }]
    },
    { "id": 191, "label": "运维组", "parentId": 49 },
    {
      "id": 194, "label": "开发组", "parentId": 49,
      "children": [
        {
          "id": 764, "label": "技术开发组", "parentId": 194,
          "children": [
            { "id": 780, "label": "desc", "parentId": 764 },
            { "id": 806, "label": "测试部门11", "parentId": 764 }
          ]
        },
        { "id": 782, "label": "22", "parentId": 194 }]
    },
    {
      "id": 200, "label": "产品组", "parentId": 49,
      "children": [
        { "id": 798, "label": "产品1小组", "parentId": 200 }
      ]
    },
    { "id": 213, "label": "部门01", "parentId": 49 },
    { "id": 214, "label": "部门02", "parentId": 49 },
    { "id": 239, "label": "新增部门", "parentId": 49 },
    { "id": 668, "label": "UI组", "parentId": 49 },
    { "id": 669, "label": "技术支持组", "parentId": 49 },
    { "id": 783, "label": "开发一组", "parentId": 49 },
    { "id": 784, "label": "开发二组", "parentId": 49 },
    { "id": 785, "label": "开发三组", "parentId": 49 },
    { "id": 786, "label": "开发四组", "parentId": 49 },
    { "id": 787, "label": "开发五组", "parentId": 49 },
    { "id": 803, "label": "开发组1", "parentId": 49 },
    { "id": 805, "label": "开发组2", "parentId": 49 },
    {
      "id": 808, "label": "测试部门1112", "parentId": 49,
      "children": [
        { "id": 809, "label": "大前端", "parentId": 808 }]
    }
  ],
  [
    {
      "id": 49, "label": "技术部", "parentId": 1,
      "children": [
        {
          "id": 128, "label": "部门名称", "parentId": 49
        },
        {
          "id": 129, "label": "二位测3", "parentId": 49
        },
        {
          "id": 190, "label": "测试组", "parentId": 49,
          "children": [
            { "id": 796, "label": "测试六组", "parentId": 190 }
          ]
        },
        {
          "id": 191,
          "label": "运维组", "parentId": 49
        },
        {
          "id": 194, "label": "开发组", "parentId": 49, "children": [{ "id": 764, "label": "技术开发组", "parentId": 194, "children": [{ "id": 780, "label": "desc", "parentId": 764 }, { "id": 806, "label": "测试部门11", "parentId": 764 }] }, { "id": 782, "label": "22", "parentId": 194 }]
        },
        {
          "id": 200, "label": "产品组", "parentId": 49,
          "children": [
            {
              "id": 798, "label": "产品1小组", "parentId": 200
            }
          ]
        },
        {
          "id": 213, "label": "部门01", "parentId": 49
        },
        {
          "id": 214, "label": "部门02", "parentId": 49
        },
        {
          "id": 239, "label": "新增部门", "parentId": 49
        },
        {
          "id": 668, "label": "UI组", "parentId": 49
        },
        {
          "id": 669, "label": "技术支持组", "parentId": 49
        },
        {
          "id": 783, "label": "开发一组", "parentId": 49
        },
        {
          "id": 784, "label": "开发二组", "parentId": 49
        },
        {
          "id": 785,
          "label": "开发三组", "parentId": 49
        },
        { "id": 786, "label": "开发四组", "parentId": 49 }, { "id": 787, "label": "开发五组", "parentId": 49 }, { "id": 803, "label": "开发组1", "parentId": 49 }, { "id": 805, "label": "开发组2", "parentId": 49 }, { "id": 808, "label": "测试部门1112", "parentId": 49, "children": [{ "id": 809, "label": "大前端", "parentId": 808 }] }]
    }]
]

console.log(transOrganizeArr)


