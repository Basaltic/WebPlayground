

// export const puppeteer = require('puppeteer');
export const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file:///Users/basaltic/Desktop/Own/WebPlayground/src/Node/index.html`);
  
  page.on('console', msg => console.log(msg.text()))

  await page.addScriptTag({
    path: `/Users/basaltic/Desktop/Own/WebPlayground/src/Node/script.js`
  })
  await page.waitForFunction('flag')
  await page.screenshot({path: 'element.png'});

  await browser.close();
})();

