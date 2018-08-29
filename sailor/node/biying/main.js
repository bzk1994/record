const fs = require('fs')
const request = require('request')
const path = require('path')
const async = require('async')

const imagesDir = 'imagesDir'
const Bing = 'https://cn.bing.com'

fs.mkdir(imagesDir, err => {
  if (!err) {
    console.log(`create ${imagesDir} Success!`)
  }
})

let imagesArr = []

const downLoad = (url, src) => {
  request(`${Bing}${url}`).pipe(fs.createWriteStream(path.join(`./${imagesDir}`, src))).on('close', () => {
    console.log(`${src} Down Load Success!`)
  })
}

const getImages = url => {
  request(url, (err, res, body) => {
    if (err) {
      console.log(err)
    } else {
      const images = JSON.parse(body).images[0]
      const name = images.url.split('/').pop()
      imagesArr.push(name)
      downLoad(images.url, name)
    }
  })
}

console.log(imagesArr)


// eventproxy控制并发数
new Array(100).fill(0).map((item, i) => {
  let url = `https://cn.bing.com/HPImageArchive.aspx?format=js&idx=${i}&n=1&nc=1520691403044&pid=hp&scope=web&FORM=HDRSC1`
  getImages(url)
})

// let url = `https://cn.bing.com/HPImageArchive.aspx?format=js&idx=${-2}&n=1&nc=1520691403044&pid=hp&scope=web&FORM=HDRSC1`
// imagesArr.push(url)
// getImages(url)

// console.log(imagesArr)
// new Array(10).fill(1).map((item, i) => {
//   let idx = 0
//   let url = `https://cn.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=1&nc=1520691403044&pid=hp&scope=web&FORM=HDRSC1`
//   console.log(idx, url)
//   getImages(url)
// })


