import { favoriteAppIds as defaultFavoriteAppIds } from "@/content/games"

import { cacheData, getCachedData } from "../redis"
import { enrichGamesWithArtwork } from "./artwork"
import {
  cachedGamesSchema,
  favoriteAppIdsSchema,
  fetchRecentGamesSchema,
  filteredGameTitlesSchema,
  gameSchema,
  gamesResponseSchema,
} from "./model"
import type { Game } from "./model"

export type { Game } from "./model"

const api = import.meta.env.STEAM_API_KEY
const steamId = "76561197989108352"
const recentGamesUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${api}&steamid=${steamId}&format=json&count=4`
const allGamesUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api}&steamid=${steamId}&format=json&include_appinfo=1&include_played_free_games=1`
const steamRequestTimeoutMs = 5_000

async function getFavoriteAppIds(): Promise<number[]> {
  const cached = favoriteAppIdsSchema.safeParse(await getCachedData<unknown>("games:favorites"))
  if (cached.success) return cached.data

  await cacheData("games:favorites", defaultFavoriteAppIds)
  return defaultFavoriteAppIds
}

// Drops individual malformed entries (e.g. delisted apps) instead of failing the whole response.
function parseGames(rawGames: unknown[]): Game[] {
  return rawGames.flatMap((rawGame) => {
    const parsed = gameSchema.safeParse(rawGame)
    return parsed.success ? [parsed.data] : []
  })
}

async function getCachedGames(key: string): Promise<Game[]> {
  const cached = cachedGamesSchema.safeParse(await getCachedData<unknown>(key))
  return cached.success ? parseGames(cached.data) : []
}

async function fetchRecentGames(): Promise<Game[]> {
  try {
    const response = await fetch(recentGamesUrl, { signal: AbortSignal.timeout(steamRequestTimeoutMs) })
    if (!response.ok) throw new Error(`Steam API returned ${response.status}`)

    const payload = gamesResponseSchema.parse(await response.json())
    if (!payload.response?.games) return []

    const games = parseGames(payload.response.games)
    if (games.length > 0) await cacheData("games:recent", games)
    return games
  } catch (error) {
    console.error("failed to fetch recent games, using cache:", error)
    return getCachedGames("games:recent")
  }
}

async function fetchAllGames(): Promise<Game[]> {
  try {
    const response = await fetch(allGamesUrl, { signal: AbortSignal.timeout(steamRequestTimeoutMs) })
    if (!response.ok) throw new Error(`Steam API returned ${response.status}`)

    const payload = gamesResponseSchema.parse(await response.json())
    if (!payload.response?.games) return getCachedGames("games:all")

    const games = parseGames(payload.response.games)
    await cacheData("games:all", games)
    return games
  } catch (error) {
    console.error("failed to fetch all games, using cache:", error)
    return getCachedGames("games:all")
  }
}

async function selectFavoriteGames(allGames: Game[], recentGames: Game[], needed: number): Promise<Game[]> {
  const favoriteAppIds = new Set(await getFavoriteAppIds())
  const favoriteGames = allGames.filter((game) => favoriteAppIds.has(game.appid))
  const newGames = favoriteGames.filter(
    (favorite) => !recentGames.some((recentGame) => recentGame.appid === favorite.appid)
  )

  return newGames.sort(() => 0.5 - Math.random()).slice(0, needed)
}

async function filterRecentGames(games: Game[]): Promise<Game[]> {
  const cached = filteredGameTitlesSchema.safeParse(await getCachedData<unknown>("games:filtered"))
  if (!cached.success || cached.data.length === 0) return games

  return games.filter(
    (game) => !cached.data.some((filteredTitle) => game.name.toLowerCase() === filteredTitle.toLowerCase())
  )
}

export async function getGames(): Promise<Game[]> {
  let games: Game[] = []

  try {
    const shouldFetchRecent = fetchRecentGamesSchema.safeParse(await getCachedData<unknown>("games:fetch-recent"))
    if (shouldFetchRecent.success && shouldFetchRecent.data) {
      games = await filterRecentGames(await fetchRecentGames())
    }

    if (games.length < 4) {
      const allGames = await fetchAllGames()
      if (allGames.length > 0) {
        games = [...games, ...(await selectFavoriteGames(allGames, games, 4 - games.length))]
      }
    }
  } catch (error) {
    console.error("failed to fetch games:", error)
  }

  return enrichGamesWithArtwork(games)
}
