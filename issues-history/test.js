// let a = 0
// const b = async () => {
//   a = (() => {
//     console.log('IIFE', 1)
//     return 2
//   })() + await 10
//   console.log('2', a)
//   a = await 10 + a
//   console.log('3', a)
// }
// b()
// a++
// console.log('1', a)

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