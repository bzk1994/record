// 尾调用优化

function factorial(n) {
  if (n <= 1) return n
  return n * factorial(n - 1)
}

console.time('factorial')
factorial(5000)
console.timeEnd('factorial')

function endFactorial(n, p = 1) {
  if (n <= 1) return 1 * p
  let result = n * p
  return endFactorial(n - 1, result)
}

console.time('endFactorial')
factorial(5000)
console.timeEnd('endFactorial')

// factorial: 0.636ms
// endFactorial: 0.196ms
// factorial: 0.539ms
// endFactorial: 0.198ms
// factorial: 0.565ms
// endFactorial: 0.217ms