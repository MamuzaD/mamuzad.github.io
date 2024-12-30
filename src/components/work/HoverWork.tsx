import type { CollectionEntry } from "astro:content"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Button } from "@/components/ui/button"

interface RecentWorkProps {
  projects: CollectionEntry<"work">[]
}

const HoverWork = ({ projects }: RecentWorkProps) => {
  const [highlightedProject, setHighlightedProject] = useState<any | null>(null)

  useEffect(() => {
    console.log(highlightedProject)
  }, [highlightedProject])

  return (
    <section className="z-50 flex flex-col items-center justify-center gap-12">
      <h3 className="block text-3xl font-semibold md:hidden">recent work</h3>
      <div className="flex gap-8">
        {/* image */}
        <div className="z-50 hidden h-[500px] w-[500px] flex-shrink-0 items-center justify-center rounded-3xl bg-primary-foreground/50 p-5 shadow-experiencard-card-light backdrop-blur dark:shadow-experiencard-card-dark md:flex">
          {highlightedProject ? (
            <CardContainer className="rounded-lg p-4">
              <CardBody>
                <CardItem translateZ="100">
                  <motion.img
                    key={highlightedProject?.data.card.img.src}
                    src={highlightedProject.data.card.img.src}
                    alt={
                      highlightedProject.data.card.alt ||
                      highlightedProject.data.title
                    }
                    className="h-full w-full rounded-lg object-cover"
                    initial={{ opacity: 0, translateY: 25 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      duration: 3,
                      delay: 0.2,
                    }}
                    style={{
                      viewTransitionName: highlightedProject.data.card.alt,
                    }}
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          ) : (
            <div className="animate-bounce rounded-lg p-4 text-center text-neutral-500 transition-transform duration-1500">
              hover over a project
            </div>
          )}
        </div>
        {/* list */}
        <div className="flex-1 md:max-w-md">
          <ul className="space-y-10">
            {projects.map((project) => (
              <li
                key={project.id}
                onMouseEnter={() => setHighlightedProject(project)}
              >
                <a
                  href={`/work/${project.id}`}
                  className={`group mt-4 block cursor-pointer rounded-[2.5rem] px-10 py-5 backdrop-blur-sm transition-[background_color] duration-300 md:mt-0 md:rounded-xl md:hover:bg-primary/30 ${highlightedProject && highlightedProject.id === project.id ? "bg-primary/40" : "bg-muted/70 md:bg-transparent"}`}
                >
                  <div className="mt-4 block rounded-lg shadow-md md:hidden">
                    <img
                      src={project.data.card.img.src}
                      alt={project.data.card.alt || project.data.title}
                      className="h-full w-full rounded-3xl object-cover"
                    />
                  </div>
                  <span className="flex w-full flex-row justify-between gap-6">
                    <span className="">
                      <h3 className="text-lg font-medium text-neutral-950 transition-none dark:text-neutral-50">
                        {project.data.title}
                      </h3>
                      <p className="text-base text-neutral-500 dark:text-neutral-600">
                        {project.data.caption}
                      </p>
                    </span>
                    <p className="flex items-center text-sm text-neutral-500 dark:text-neutral-600">
                      <span className="transition-[transform_opacity] duration-200 md:group-hover:opacity-0">
                        {project.data.publishDate.toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <ArrowRight className="ml-2 hidden scale-0 transform transition-transform delay-150 duration-300 group-hover:scale-100 md:block" />
                    </p>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button>
        <a href="/work" className="">
          view all
        </a>
      </Button>
    </section>
  )
}

export default HoverWork
