const fs = require('fs')
const request = require('request')
const path = require('path')

const imagesDir = path.join(__dirname, 'imagesDir')
const Bing = 'https://cn.bing.com'
const url = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1520691403044&pid=hp&scope=web&FORM=HDRSC1'


fs.mkdir('./imagesDir', err => {
  if (err) {
    return console.error(err)
  }
  console.log('create imagesDir Success!')
})

request(url, (err, res, body) => {
  if (err) {
    console.error(err)
  } else {
    const images = JSON.parse(body).images[0]
    console.log(`${Bing}${images.url}`)
    console.log(images.copyright)
    const arr = images.url.split('/')
    const str = arr[arr.length - 1]
    // request(`${Bing}${images.url}`).pipe(fs.createReadStream(imagesDir, images.copyright))
    request(`${Bing}${images.url}`).pipe(fs.createWriteStream(path.join('./imagesDir', str)))
  }
})