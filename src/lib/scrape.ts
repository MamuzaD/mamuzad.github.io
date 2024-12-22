// src/lib/scrape.ts
import puppeteer from "puppeteer"

export async function scrapeFilmDetails(url: string) {
  let browser

  try {
    browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: "load", timeout: 20000 })

    await page.waitForSelector(".td-film-details", { timeout: 10000 })

    const filmDetails = await page.evaluate(() => {
      const filmElement = document.querySelector(".td-film-details")
      if (!filmElement) return null

      const titleElement =
        filmElement.parentElement?.querySelector("h3.headline-3 a")
      const title = titleElement ? titleElement.textContent?.trim() : null

      const imgElement = filmElement.querySelector("img")
      const imageUrl = imgElement ? imgElement.getAttribute("src") : null

      const starsElement = document.querySelector("span.rating")
      const stars = starsElement ? starsElement.textContent?.trim() : null

      return { title, imageUrl, stars }
    })

    return filmDetails
  } catch (error) {
    console.error("Error occurred while scraping:", error)
    return null
  } finally {
    if (browser) await browser.close()
  }
}
