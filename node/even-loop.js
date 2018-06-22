process.nextTick(function () {
  console.log('process.nextTick1')
})

setImmediate(function () {
  console.log('setImmediate1')
  process.nextTick(function () {
    console.log('process.nextTick3')
  })

  setImmediate(function () {
    console.log('setImmediate3')
  })
})

process.nextTick(function () {
  console.log('process.nextTick2')
})

setImmediate(function () {
  console.log('setImmediate2')
})

setTimeout(function () {
  console.log('setTimeout')
}, 0)



console.log(process.memoryUsage())