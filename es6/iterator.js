function createIterator(items) {
  let i = 0

  return {
    next() {
      let done = i >= items.length
      let value = !done ? items[i++] : undefined
      return {
        done,
        value
      }
    }
  }
}

let iterator = createIterator([1, 2, 3])

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

function createGenerator() {

}
