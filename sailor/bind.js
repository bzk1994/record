var foo = {
  value: 26
}

function bar(age) {
  console.log(this.value)
  console.log(age)
}

Function.prototype.bind2 = function (context) {
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  return function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    self.apply(context, args.concat(bindArgs))
  }
}

Function.prototype.bind3 = function (context) {

  var self = this

  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function () { }
  var fbound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    self.apply(this instanceof self ? this : context, args.concat(bindArgs))
  }

  fNOP.prototype = this.prototype
  fbound.prototype = new fNOP()
  return fbound
}

var bindFoo = bar.bind3(foo, 'daisy');

var obj = new bindFoo('18');



// bindFoo(18)
