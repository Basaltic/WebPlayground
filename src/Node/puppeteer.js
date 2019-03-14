// Screen shot for html element

export const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  async function screenshotDOMElement(selector, padding = 0) {
    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }, selector);

    await page.evaluate(() => {
      document.querySelector('#serialize').click();
      return {};
    });

    return await page.screenshot({
      path: 'element.png',
      clip: {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      },
    });
  }

  await screenshotDOMElement('#test-capture', 0);

  await browser.close();
})();

// export default puppeteer;
