import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { quotes } from "@/content/quotes"

const Quotes = () => {
  return (
    <Carousel
      className="bg-muted max-h-32 w-full max-w-sm rounded-lg backdrop-blur-lg"
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {quotes.map((q, index) => (
          <CarouselItem key={index} className="">
            <div className="flex h-full w-full flex-col gap-1 rounded-md p-4 font-light">
              <span className="mt-0.5 font-normal">{q.quote}</span>
              <span>
                {`- ${q.author}, `}
                <i>{q.media}</i>
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default Quotes
