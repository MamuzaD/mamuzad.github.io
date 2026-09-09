import { waitUntil } from "@vercel/functions"

import { cacheData, getCachedData } from "../redis"
import {
  artworkOverrides,
  cachedSteamAssetsSchema,
  defaultBannerPreference,
  defaultSquarePreference,
  steamArtworkCacheKey,
  steamArtworkFreshnessMs,
  steamAssetBaseUrl,
  storeResponseSchema,
} from "./model"
import type { ArtworkKind, CachedSteamAssets, Game, GameArtwork, SteamAssets } from "./model"

function getArtworkPolicy(appid: number) {
  const override = artworkOverrides[appid]
  return {
    sourceAppId: override?.sourceAppId ?? appid,
    squarePreference: override?.squarePreference ?? defaultSquarePreference,
    bannerPreference: override?.bannerPreference ?? defaultBannerPreference,
    squarePath: override?.squarePath,
    bannerPath: override?.bannerPath,
    squarePosition: override?.squarePosition,
  }
}

async function fetchAssets(appids: number[]): Promise<Map<number, SteamAssets>> {
  const assets = new Map<number, SteamAssets>()
  if (appids.length === 0) return assets

  try {
    const url = new URL("https://api.steampowered.com/IStoreBrowseService/GetItems/v1/")
    url.searchParams.set(
      "input_json",
      JSON.stringify({
        ids: appids.map((appid) => ({ appid })),
        context: { language: "english", country_code: "US" },
        data_request: { include_assets: true, include_assets_without_overrides: true },
      })
    )
    const response = await fetch(url, { signal: AbortSignal.timeout(5_000) })
    if (!response.ok) throw new Error(`Steam store returned ${response.status}`)

    const payload = storeResponseSchema.parse(await response.json())
    for (const item of payload.response?.store_items ?? []) {
      const canonicalAssets = item.assets_without_overrides ?? item.assets
      if (canonicalAssets) assets.set(item.appid, canonicalAssets)
    }
  } catch (error) {
    console.warn("failed to fetch Steam artwork:", error)
  }

  return assets
}

async function cacheAssets(assets: Map<number, SteamAssets>): Promise<void> {
  const fetchedAt = Date.now()
  await Promise.all(
    [...assets].map(([appid, value]) => cacheData(steamArtworkCacheKey(appid), { fetchedAt, assets: value }))
  )
}

async function refreshAssets(appids: number[]): Promise<void> {
  const fresh = await fetchAssets(appids)
  await cacheAssets(fresh)
}

function resolveArtwork(
  game: Game,
  assets: SteamAssets | undefined,
  policy: ReturnType<typeof getArtworkPolicy>
): GameArtwork {
  const assetUrl = (path?: string) => (path ? `${steamAssetBaseUrl}/${policy.sourceAppId}/${path}` : undefined)
  const hero = assetUrl(assets?.hero_capsule)
  const library = assetUrl(assets?.library_capsule)
  const header = assetUrl(assets?.header)
  const banner = assetUrl(assets?.small_capsule)
  const icon = game.img_icon_url
    ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
    : undefined
  const available = (urls: (string | undefined)[]) => urls.filter((url): url is string => Boolean(url))
  const candidates: Record<ArtworkKind, string | undefined> = { hero, library, header, banner, icon }
  const resolvePreference = (preference: readonly ArtworkKind[]) => preference.map((kind) => candidates[kind])

  return {
    square: available([assetUrl(policy.squarePath), ...resolvePreference(policy.squarePreference)]),
    banner: available([assetUrl(policy.bannerPath), ...resolvePreference(policy.bannerPreference)]),
    squarePosition: policy.squarePosition,
  }
}

export async function enrichGamesWithArtwork(games: Game[]): Promise<Game[]> {
  const policies = new Map(games.map((game) => [game.appid, getArtworkPolicy(game.appid)] as const))
  const appids = [...new Set([...policies.values()].map((policy) => policy.sourceAppId))]
  const assets = new Map<number, SteamAssets>()
  const cachedAssets = new Map<number, CachedSteamAssets>()

  await Promise.all(
    appids.map(async (appid) => {
      const cached = cachedSteamAssetsSchema.safeParse(await getCachedData<unknown>(steamArtworkCacheKey(appid)))
      if (cached.success) {
        cachedAssets.set(appid, cached.data)
        assets.set(appid, cached.data.assets)
      }
    })
  )

  const missingAppIds = appids.filter((appid) => !cachedAssets.has(appid))
  const fresh = await fetchAssets(missingAppIds)
  fresh.forEach((value, appid) => assets.set(appid, value))
  await cacheAssets(fresh)

  const staleBefore = Date.now() - steamArtworkFreshnessMs
  const staleAppIds = appids.filter((appid) => {
    const cached = cachedAssets.get(appid)
    return cached !== undefined && cached.fetchedAt < staleBefore
  })
  if (staleAppIds.length > 0) waitUntil(refreshAssets(staleAppIds))

  return games.map((game) => {
    const policy = policies.get(game.appid)!
    return {
      ...game,
      artwork: resolveArtwork(game, assets.get(policy.sourceAppId), policy),
    }
  })
}
