import { motion } from "motion/react"
import { useState } from "react"

import { tabContent } from "@/content/skills"

const tabs = ["general", "frontend", "backend", "other"] as const
type TabType = (typeof tabs)[number]

const Skills = () => {
  const [activeTab, setActiveTab] = useState<TabType>("general")
  const [visitedTabs, setVisitedTabs] = useState<Set<TabType>>(() => new Set())
  const shouldAnimate = !visitedTabs.has(activeTab)

  const selectTab = (tab: TabType) => {
    if (tab === activeTab) return

    setVisitedTabs((previousTabs) => {
      if (previousTabs.has(activeTab)) return previousTabs
      return new Set(previousTabs).add(activeTab)
    })
    setActiveTab(tab)
  }

  return (
    <section className="bg-primary-foreground/80 shadow-aboutcard z-10 rounded-3xl px-4 pt-5 pb-10 backdrop-blur-md md:px-16">
      <div
        className={`no-visible-scrollbar relative mb-4 flex w-full max-w-full flex-row items-center justify-center overflow-auto sm:overflow-visible`}
      >
        {tabs.map((tab) => (
          <button key={tab} type="button" onClick={() => selectTab(tab)} className={`relative rounded-full px-4 py-2`}>
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={`absolute inset-0 z-0 rounded-full bg-neutral-200 dark:bg-neutral-800`}
              />
            )}
            <span className="relative z-10 block text-black dark:text-white">{tab}</span>
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {tabContent[activeTab].map(({ title, skills }, rI) => {
          return (
            <div key={`${activeTab}-${title}`} className="w-full max-w-xl">
              <h4 className="mb-3 text-center font-medium">{title}</h4>
              <div className="flex w-full flex-wrap justify-center gap-2">
                {skills.map((skill, i) => {
                  return (
                    <motion.div
                      className="flex w-20 flex-col items-center justify-start gap-1"
                      key={i}
                      initial={
                        shouldAnimate
                          ? {
                              y: 45,
                              rotateX: "80deg",
                              perspective: "1500px",
                              opacity: 0,
                            }
                          : { opacity: 1 }
                      }
                      whileInView={
                        shouldAnimate
                          ? {
                              y: 0,
                              rotateX: "0deg",
                              perspective: "1500px",
                              opacity: 1,
                            }
                          : undefined
                      }
                      viewport={{ once: true, margin: "-50px" }}
                      transition={
                        shouldAnimate
                          ? {
                              type: "spring",
                              stiffness: 150,
                              duration: 0.15,
                              delay: 0.25 * (rI + 1) + 0.25 * i,
                            }
                          : undefined
                      }
                    >
                      <motion.span
                        className="size-12 md:size-14"
                        whileHover={{ scale: 1.15, transition: { duration: 0.5 } }}
                        whileTap={{ scale: 0.8, transition: { duration: 0.025 } }}
                      >
                        {skill.icon}
                      </motion.span>
                      <span className="text-center text-xs font-medium">{skill.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Skills
