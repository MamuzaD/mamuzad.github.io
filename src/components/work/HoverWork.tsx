import type { CollectionEntry } from "astro:content"
import { useState } from "react"

interface RecentWorkProps {
  projects: CollectionEntry<"work">[]
}

const HoverWork = ({ projects }: RecentWorkProps) => {
  const [highlightedProject, setHighlightedProject] = useState<any | null>(null)
  return (
    <section className="flex flex-col items-center justify-center gap-8 md:flex-row">
      <h3 className="block text-3xl font-semibold md:hidden">recent work</h3>
      {/* image */}
      <div className="hidden h-[500px] w-[500px] flex-shrink-0 items-center justify-center rounded-3xl bg-primary-foreground/50 p-5 md:flex">
        {highlightedProject ? (
          <div className="rounded-lg border p-4 shadow-md">
            <img
              src={highlightedProject.data.card.img.src}
              alt={
                highlightedProject.data.card.alt ||
                highlightedProject.data.title
              }
              className="h-full w-full animate-fadeIn rounded-lg object-cover duration-200"
              style={{ viewTransitionName: highlightedProject.data.card.alt }}
            />
          </div>
        ) : (
          <div className="duration-1500 animate-bounce rounded-lg border p-4 text-center text-neutral-500 transition-transform">
            hover for a preview
          </div>
        )}
      </div>
      {/* list */}
      <div className="flex-1 md:max-w-sm">
        <ul className="space-y-10">
          {projects.map((project) => (
            <li
              key={project.id}
              className="cursor-pointer rounded-[2.5rem] border bg-muted/70 px-10 py-4 backdrop-blur hover:bg-primary/30 md:rounded-xl md:bg-transparent"
              onMouseEnter={() => setHighlightedProject(project)}
              onMouseLeave={() => setHighlightedProject(null)}
            >
              <div className="mt-4 block rounded-lg border shadow-md md:hidden">
                <img
                  src={project.data.card.img.src}
                  alt={project.data.card.alt || project.data.title}
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
              <a
                href={`/work/${project.id}`}
                className="mt-4 block pb-3 transition-transform duration-200 hover:-translate-x-4 md:mt-0 md:pb-0"
              >
                <h3 className="text-lg font-medium">{project.data.title}</h3>
                <p className="text-base text-gray-600">
                  {project.data.caption}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HoverWork
