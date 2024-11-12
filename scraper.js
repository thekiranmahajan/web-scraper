const puppeteer = require("puppeteer");
const fs = require("fs");
async function scrapeWebsite(url) {
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Scrape the content
  const data = await page.evaluate(() => {
    // Extract title, headers, and paragraphs
    const title = document.title;
    const headers = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).map((h) => h.innerText);
    const paragraphs = Array.from(document.querySelectorAll("p")).map(
      (p) => p.innerText
    );

    return { title, headers, paragraphs };
  });

  // Close the browser
  await browser.close();

  return data;
}

// // Run the scraper
// (async () => {
//   const url = "https://pptr.dev/guides/installation"; // Replace with the target URL
//   const content = await scrapeWebsite(url);
//   console.log(JSON.stringify(content, null, 4));
// })();
// const fs = require('fs');

// Run the scraper
(async () => {
  const url = "https://www.articulate.com/360/training/"; // Replace with the target URL
  const content = await scrapeWebsite(url);
  fs.writeFileSync("output.json", JSON.stringify(content, null, 4));
  console.log("Scraping completed. Check output.json for results.");
})();
