// function f1() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('f1')
//     }, 500)
//   })
// }

// function f2(res) {
//   console.log(res)
// }

// f1().then(res => {
//   f2(res)
// })

// async function foo() {
//   const res = await f1()
//   f2(res)
// }

// foo()

// var wait = function () {
//   var dtd = $.Deferred()

//   setTimeout(function () {
//     dtd.resolve('f1')
//   }, 500)

//   return dtd.promise()
// }

// $.when(wait())
//   .done(res => {
//     f2(res)
//   })
//   .fail(() => { })
