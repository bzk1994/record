const puppeteer = require('puppeteer')

const url = 'https://juejin.im/post/5b10dd36e51d4506e04cf802';

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })
  await page.pdf({ path: 'example-A4.pdf', format: 'A4' })
  await browser.close()
})()
