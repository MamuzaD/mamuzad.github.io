import { z } from "zod"

export type ArtworkKind = "hero" | "library" | "header" | "banner" | "icon"

export type ArtworkOverride = {
  sourceAppId?: number
  squarePreference?: readonly ArtworkKind[]
  bannerPreference?: readonly ArtworkKind[]
  squarePath?: string
  bannerPath?: string
  squarePosition?: string
}

export const defaultSquarePreference = ["hero", "library", "header", "banner", "icon"] as const
export const defaultBannerPreference = ["banner", "header", "hero", "library", "icon"] as const

export const artworkOverrides: Readonly<Partial<Record<number, ArtworkOverride>>> = {
  // AC3 instead
  911400: { sourceAppId: 208480 },
  // Revelations' header composes better when cropped into the square slot.
  201870: { squarePreference: ["header", "library", "banner", "icon"], squarePosition: "right center" },
  // Preserve the cleaner legacy store artwork still served at Steam's stable paths.
  553850: { squarePath: "hero_capsule.jpg", bannerPath: "capsule_231x87.jpg" }, // HELLDIVERS™ 2
  1771300: { bannerPath: "capsule_231x87.jpg" }, // Kingdom Come: Deliverance II
  2767030: { squarePath: "hero_capsule.jpg", bannerPath: "capsule_231x87.jpg" }, // Marvel Rivals
}

export const gameSchema = z.object({
  appid: z.number(),
  name: z.string(),
  playtime_2weeks: z.number().optional(),
  playtime_forever: z.number(),
  img_icon_url: z.string().optional(),
  img_logo_url: z.string().optional(),
})

export const gamesResponseSchema = z.object({
  response: z.object({ games: z.array(z.unknown()).optional() }).optional(),
})

export const favoriteAppIdsSchema = z.array(z.number().int().positive())
export const cachedGamesSchema = z.array(z.unknown())
export const filteredGameTitlesSchema = z.array(z.string())
export const fetchRecentGamesSchema = z.boolean()

export const assetsSchema = z.object({
  hero_capsule: z.string().optional(),
  library_capsule: z.string().optional(),
  small_capsule: z.string().optional(),
  header: z.string().optional(),
})

export const cachedSteamAssetsSchema = z.object({
  fetchedAt: z.number().int().nonnegative(),
  assets: assetsSchema,
})

export const storeResponseSchema = z.object({
  response: z
    .object({
      store_items: z
        .array(
          z.object({
            appid: z.number(),
            assets: assetsSchema.optional(),
            assets_without_overrides: assetsSchema.optional(),
          })
        )
        .optional(),
    })
    .optional(),
})

export const steamAssetBaseUrl = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps"
export const steamArtworkFreshnessMs = 1000 * 60 * 60 * 24 * 7
export const steamArtworkCacheKey = (appid: number) => `steam-assets:${appid}`

export type SteamAssets = z.infer<typeof assetsSchema>
export type CachedSteamAssets = z.infer<typeof cachedSteamAssetsSchema>

export type GameArtwork = {
  square: string[]
  banner: string[]
  squarePosition?: string
}

export type Game = z.infer<typeof gameSchema> & {
  artwork?: GameArtwork
}
