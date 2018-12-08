process.nextTick(function() {
  console.log('process.nextTick1')
})

new Promise(resolve => {
  resolve()
}).then(() => {
  console.log('Promise1')
})

setImmediate(function() {
  console.log('setImmediate1')
  new Promise(resolve => {
    resolve()
  }).then(() => {
    console.log('Promise2')
  })
  process.nextTick(function() {
    console.log('process.nextTick3')
  })

  setImmediate(function() {
    console.log('setImmediate3')
  })
})

process.nextTick(function() {
  console.log('process.nextTick2')
})

setImmediate(function() {
  console.log('setImmediate2')
})

setTimeout(function() {
  console.log('setTimeout')
}, 0)
