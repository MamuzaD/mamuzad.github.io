import { motion } from "framer-motion"

import { languages, type skill, technologies, tools } from "@/content/skills"

const Skills = () => {
  const rows: skill[][] = [languages, technologies, tools]

  return (
    <section className="z-10 rounded-3xl bg-primary-foreground/80 p-10 px-4 backdrop-blur-md md:px-16">
      <div className="space-y-4">
        {rows.map((skills, rI) => {
          let title
          if (rI === 0) title = "languages"
          else if (rI === 1) title = "technologies"
          else if (rI === 2) title = "tools"

          return (
            <div key={rI}>
              <h4 className="mb-3 text-center font-medium">{title}</h4>
              <div className="flex w-full flex-wrap justify-center gap-2">
                {skills.map((skill, i) => {
                  return (
                    <motion.div
                      className="flex w-20 flex-col items-center justify-center gap-1 transition-transform hover:scale-110 focus:scale-90"
                      key={i}
                      initial={{
                        opacity: 0,
                        transform:
                          "translateY(35px) rotateX(80deg) scaleX(0.75)",
                      }}
                      whileInView={{
                        opacity: 1,
                        transform: "translateY(0px) rotateX(0deg) scaleX(1)",
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 16,
                        duration: 0.15,
                        delay: 0.25 * (rI + 1) + 0.25 * i,
                      }}
                    >
                      <motion.span
                        className="size-12 md:size-14"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          whileHover: { duration: 500 },
                          whileTap: { duration: 100 },
                        }}
                      >
                        {skill.icon}
                      </motion.span>
                      <span className="text-center text-xs">{skill.name}</span>
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
