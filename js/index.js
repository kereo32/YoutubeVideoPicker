const puppeteer = require("puppeteer");
console.log("1");

async function getElText(page, selector) {
  return await page.evaluate((selector) => {
    return document.querySelector(selector).innerText;
  }, selector);
}

(async () => {
  console.log("2");

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 2560, height: 1329 });
  console.log("3");

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://www.youtube.com/c/madseasonshow/videos");
  await page.waitForSelector("ytd-channel-name");
  console.log("4");

  await page.evaluate((_) => {
    let timesUp = 0;
    let interval = setInterval(() => {
      timesUp++;
      window.scrollBy(0, window.innerHeight);
      console.log("interval run");
      if (timesUp == 10) {
        clearInterval(interval);
      }
    }, 1000);
  });
  console.log("5");

  await page.waitForSelector("#contents");
  console.log("6");

  await navigationPromise;

  const videos = [];
  for (let i = 1; i < 300; i++) {
    const titleSelector = `ytd-grid-video-renderer.style-scope:nth-child(${i}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(2)`;
    await page.waitForSelector(titleSelector);
    const titleText = await getElText(page, titleSelector);
    if (titleText) {
      console.log(titleText);
      videos.push();
    }
  }

  // await browser.close();
})();
