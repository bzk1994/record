class Queue {
  constructor() {
    this.list = []
  }
  push(data) {
    return this.list.push(data)
  }
  pop() {
    return this.list.pop()
  }
  quere() {
    return this.list
  }
}

var queue = new Queue()

console.log(queue.quere())

queue.push('zhanghao')

console.log(queue.quere())

queue.pop()

console.log(queue.quere())





