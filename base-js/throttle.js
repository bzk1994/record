// 函数节流

// risize scroll

const throttle1 = (fn, delay = 250) => {
  let last = 0
  return function () {
    var now = +new Date()
    if (now > last + delay) {
      fn.apply(this, arguments)
      last = now
    }
  }
}

const throttle2 = (fn, delay = 250) => {
  let last
  let timer

  return function () {
    const context = this
    const args = arguments

    const now = +new Date()

    if (last && now < last + delay) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        last = nowfn.apply(context, args)
      }, delay)

    } else {
      last = now
      fn.apply(context, args)
    }
  }

}

// test
document.body.addEventListener('mousemove', throttle1(
  () => {
    console.log('mousemove')
  }, 1000
))


// underscore.js

var throttle = function (func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function () {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};