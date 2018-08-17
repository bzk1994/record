/** 
 * 
 * status
 *    pending
 *    fulfilled
 *    rejected
 * 
 * methods
 *    then
 *    all
 *    race
 *    reject
 *    resolve
 * 
 * prototype
 *    catch
 *    then
*/

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise

// http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/#%E6%9C%AF%E8%AF%AD
function Promise(fn) {
  var status = 'pending'
  var value = null
  var deferreds = []

  this.then = function (onFulfilled) {
    return new promise(function (resolve) {
      handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve
      })
    })
  }

  function handle(deferred) {
    if (status === 'pending') {
      deferreds.push(onFulfilled)
      return
    }
    var ret = deferred.onFulfilled(value)
    deferred.resolve(ret)
  }

  function resolve(newValue) {
    value = newValue
    setTimeout(function () {
      deferreds.forEach(function (deferred) {
        deferred(value)
      })
    }, 0)
  }

  console.log(fn.toString())
  fn(resolve)
}

function promise() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('promise')
    }, 1000)
  })
}

function promise2() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('promise2')
    }, 2000)
  })
}

promise().then(function (res) {
  promise2
}).then(function (res) {
  console.log(res + ' => promise')
})



