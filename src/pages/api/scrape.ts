import type { APIRoute } from "astro"

import { scrapeFilmDetails } from "../../lib/scrape"

export const GET: APIRoute = async ({ request }) => {
  try {
    const { searchParams } = new URL(request.url)
    const filmUrl = searchParams.get("url")

    if (!filmUrl) {
      console.log("searchParams:", searchParams)
      return new Response("Missing URL parameter", { status: 400 })
    }

    const filmDetails = await scrapeFilmDetails(filmUrl)

    if (filmDetails) {
      return new Response(JSON.stringify(filmDetails), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    } else {
      return new Response("Could not scrape film details", { status: 500 })
    }
  } catch (error) {
    console.error("Error in API route:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
