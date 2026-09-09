import { useCallback, useState } from "react"

import type { Game } from "@/lib/games"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface GameCardProps {
  game: Game
}

function useFallbackImage(images: string[]) {
  const [index, setIndex] = useState(0)
  const advance = useCallback(() => {
    setIndex((current) => (current === index ? current + 1 : current))
  }, [index])
  const imageRef = useCallback(
    (image: HTMLImageElement | null) => {
      // SSR images can fail before hydration attaches onError.
      if (image?.complete && image.naturalWidth === 0) advance()
    },
    [advance]
  )

  return [images[index], advance, imageRef] as const
}

const GameCard = ({ game }: GameCardProps) => {
  const [heroImg, advanceHeroImg, heroRef] = useFallbackImage(game.artwork?.square ?? [])
  const [bannerImg, advanceBannerImg, bannerRef] = useFallbackImage(game.artwork?.banner ?? [])

  const text = game.playtime_2weeks
    ? `i've played ${
        game.playtime_2weeks < 120 ? `${game.playtime_2weeks} mins` : `${(game.playtime_2weeks / 60.0).toFixed(1)} hrs`
      } recently`
    : game.playtime_forever === 0
      ? "on the backlog"
      : `i've played ${(game.playtime_forever / 60.0).toFixed(1)} hrs total`

  return (
    <HoverCard openDelay={500} closeDelay={50}>
      <HoverCardTrigger asChild>
        {heroImg ? (
          <img
            ref={heroRef}
            width={80}
            height={80}
            src={heroImg}
            alt={`${game.name}'s Picture`}
            onError={advanceHeroImg}
            style={{ imageRendering: "crisp-edges", objectPosition: game.artwork?.squarePosition }}
            className="no-sound h-16 w-16 rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-110 md:h-19 md:w-19"
          />
        ) : (
          <div
            aria-label={game.name}
            className="flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-200 px-1 text-center text-xs font-semibold transition-transform duration-300 ease-in-out hover:scale-110 md:h-19 md:w-19 dark:bg-neutral-700"
          >
            <span className="line-clamp-3 leading-tight wrap-break-word">{game.name}</span>
          </div>
        )}
      </HoverCardTrigger>
      <HoverCardContent
        className="bg-primary-foreground/80 z-999 flex h-40 w-full flex-col place-items-center justify-between backdrop-blur-xl"
        side="top"
      >
        {bannerImg ? (
          <img
            ref={bannerRef}
            width={231}
            height={87}
            src={bannerImg}
            alt={`${game.name}'s Picture`}
            onError={advanceBannerImg}
            style={{ imageRendering: "crisp-edges" }}
            className="h-[87px] w-[231px] rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <div className="flex h-[87px] w-[231px] items-center justify-center rounded-lg bg-neutral-200 px-3 text-center font-semibold transition-transform duration-300 ease-in-out hover:scale-110 dark:bg-neutral-700">
            <span className="line-clamp-3 leading-tight wrap-break-word">{game.name}</span>
          </div>
        )}
        <span className="font-semibold">{text}</span>
      </HoverCardContent>
    </HoverCard>
  )
}

export default GameCard
