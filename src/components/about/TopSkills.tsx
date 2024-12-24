import { topSkills } from "@/content/skills"
import { motion } from "framer-motion"

const TopSkills = () => {
  return (
    <div className="z-10 col-span-2 flex w-full flex-col flex-wrap items-center justify-center gap-4 rounded-lg bg-muted/60 py-4 md:py-2 backdrop-blur-lg">
      <span className="font-medium">most used technologies</span>
      <div className="flex flex-wrap gap-4">
        {topSkills.map((skill, i) => {
          return (
            <div
              className="mx-auto flex flex-col items-center justify-center gap-1 transition-transform hover:scale-110 focus:scale-90"
              key={i}
            >
              <motion.span
                className="h-11 w-11 md:h-12 md:w-12"
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TopSkills
