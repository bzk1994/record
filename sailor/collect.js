
const list = document.getElementById('1024').childNodes
let result = ''

Array.prototype.forEach.call(list, ({ innerText, childNodes = [{}] }) => {
  const href = childNodes[0].href
  if (href && innerText) result += `* [${innerText}](${href}) \n`
})

console.log(result)