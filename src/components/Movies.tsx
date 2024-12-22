import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

interface FilmDetails {
  title: string | null
  imageUrl: string | null
  stars: string | null
}

const Movies = () => {
  const [filmDetails, setFilmDetails] = useState<FilmDetails | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchFilmDetails = async () => {
      const url = "https://letterboxd.com/da_ni/films/diary/"
      try {
        const response = await fetch(`/api/scrape?url=${url}`)
        if (!response.ok) {
          throw new Error("Failed to fetch film details")
        }
        const data: FilmDetails = await response.json()
        setFilmDetails(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFilmDetails()
  }, [])

  return (
    <div
      className={`justifify-center row-span-1 flex h-full flex-col items-center gap-0.5 rounded-md bg-muted p-2 backdrop-blur-lg ${loading && "gap-10"}`}
    >
      <span className="font-semibold">recently watched</span>
      {loading && <Loader2 className="h-10 w-10 animate-spin" />}
      {filmDetails && (
        <div className="flex animate-fadeIn flex-wrap items-center justify-center gap-4 transition-opacity duration-500 ease-in-out md:items-end md:gap-1">
          <img
            src={filmDetails.imageUrl || ""}
            alt={filmDetails.title || "Film image"}
            className="w-12 rounded-lg bg-muted-foreground/30"
          />
          <h2 className="text-md ml-1">{filmDetails.title}</h2>
          <p className="text-lg tracking-widest text-primary md:mt-2">
            {filmDetails.stars}
          </p>
        </div>
      )}
    </div>
  )
}

export default Movies
