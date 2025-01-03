import chromium from "@sparticuz/chromium"
import puppeteer from "puppeteer"

export async function scrapeFilmDetails(url: string) {
  let browser
  try {
    console.log("Starting browser launch...")

    if (process.env.NODE_ENV === "development") {
      console.log("Launching in development mode...")
      browser = await puppeteer.launch({ headless: true })
    } else {
      console.log("Launching in production mode with Chromium...")
      chromium.setHeadlessMode = true
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
      })
    }

    console.log("Browser launched successfully.")

    const page = await browser.newPage()
    console.log(`Navigating to URL: ${url}`)
    await page.goto(url, { waitUntil: "load", timeout: 20000 })
    console.log("Page loaded successfully.")

    console.log("Waiting for the .td-film-details selector...")
    await page.waitForSelector(".td-film-details", { timeout: 10000 })
    console.log("Element .td-film-details found.")

    const filmDetails = await page.evaluate(() => {
      console.log("Scraping film details...")

      const filmElement = document.querySelector(".td-film-details")
      if (!filmElement) return null

      const titleElement = filmElement.parentElement?.querySelector("h3.headline-3 a")
      const title = titleElement ? titleElement.textContent?.trim() : null

      const imgElement = filmElement.querySelector("img")
      let imageUrl = imgElement ? imgElement.getAttribute("src")?.replace("35", "100") : null
      imageUrl = imageUrl?.replace(/-0-(\d+)-0-(\d+)/, "-0-100-0-150")

      const starsElement = document.querySelector("span.rating")
      const stars = starsElement ? starsElement.textContent?.trim() : null

      return { title, imageUrl, stars }
    })

    console.log("Scraping completed.")
    console.log("Film details:", filmDetails)
    return filmDetails
  } catch (error) {
    console.error("Error occurred while scraping:", error)
    return null
  } finally {
    if (browser) {
      console.log("Closing browser...")
      await browser.close()
      console.log("Browser closed")
    }
  }
}
