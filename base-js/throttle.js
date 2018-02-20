var throttle = function (action, delay) {
  var last = 0
  return function () {
    var curr = +new Date()
    if (curr - last > delay) {
      action.apply(this, arguments)
      last = curr
    }
  }
}