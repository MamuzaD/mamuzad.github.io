import { motion } from "framer-motion"
import { Loader2, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

interface FilmDetails {
  title: string | null
  imageUrl: string | null
  stars: string | null
}

const EXPIRATION_TIME = 24 * 60 * 60 * 1000 // one day

const Movies = () => {
  const [filmDetails, setFilmDetails] = useState<FilmDetails | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchFilmDetails = async () => {
    setLoading(true)
    const url = "https://letterboxd.com/da_ni/films/diary/"
    try {
      const response = await fetch(`/api/scrape?url=${url}`)
      if (!response.ok) {
        throw new Error("Failed to fetch film details")
      }
      const data: FilmDetails = await response.json()
      const storedData = { data, timestamp: Date.now() }
      localStorage.setItem("filmDetails", JSON.stringify(storedData))
      setFilmDetails(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadFilmDetailsFromStorage = () => {
    const stored = localStorage.getItem("filmDetails")
    if (stored) {
      const { data, timestamp } = JSON.parse(stored)
      const isExpired = Date.now() - timestamp > EXPIRATION_TIME
      if (!isExpired) {
        setFilmDetails(data)
        setLoading(false)
        return true
      } else {
        localStorage.removeItem("filmDetails")
      }
    }
    return false
  }

  useEffect(() => {
    const hasValidData = loadFilmDetailsFromStorage()
    if (!hasValidData) {
      fetchFilmDetails()
    }
  }, [])

  const retry = () => {
    fetchFilmDetails()
  }

  return (
    <div
      className={`justifify-center row-span-1 flex h-full flex-col items-center gap-0.5 rounded-xl bg-muted/60 py-4 backdrop-blur-lg md:p-2 ${loading && "gap-10"}`}
    >
      <span className="text-base font-medium">recently watched</span>
      {loading && <Loader2 className="h-10 w-10 animate-spin" />}
      {filmDetails && !loading && (
        <>
          <div className="flex h-full animate-fadeIn flex-wrap items-center justify-center gap-2 transition-opacity duration-500 ease-in-out md:gap-1 md:pb-8">
            <motion.img
              src={filmDetails.imageUrl || ""}
              alt={filmDetails.title || "Film image"}
              className="w-12 rounded-lg bg-muted-foreground/30"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                whileHover: { duration: 500 },
                whileTap: { duration: 100 },
              }}
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-md text-center">
                {filmDetails.title
                  ? filmDetails.title.includes(":") // for sequels
                    ? `${filmDetails.title.split(":")[0]}`
                    : filmDetails.title.length > 18 // for longer titles
                      ? `${filmDetails.title.slice(0, 18)}...`
                      : filmDetails.title
                  : ""}
              </h2>
              <p className="text-center text-lg tracking-widest text-primary md:mt-1">
                {filmDetails.stars}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={retry}
            className="absolute bottom-1 right-1 rounded-full"
          >
            <RotateCcw className="size-5" />
          </Button>
        </>
      )}
      {!filmDetails && !loading && (
        <div className="flex animate-fadeIn flex-col flex-wrap items-center justify-center gap-6 transition-opacity duration-500 ease-in-out">
          <span className="mt-2 font-medium text-red-600">{"error :("}</span>
          <Button variant="default" size="sm" onClick={retry}>
            retry?
          </Button>
        </div>
      )}
    </div>
  )
}

export default Movies
