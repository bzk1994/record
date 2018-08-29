const puppeteer = require('puppeteer')
const url = 'https://juejin.im/post/5b10dd36e51d4506e04cf802';

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }
  })

  console.log('Dimensions:', dimensions)

  await browser.close()
})()