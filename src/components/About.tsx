"use client"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AboutProps {
  children: ReactNode // This is the type for the content inside the component
}

export default function About({ children }: AboutProps) {
  return (
    <motion.div
      className="relative flex h-full min-h-[400px] w-full max-w-[785px] auto-rows-[176px] grid-cols-4 flex-col gap-4 rounded-xl bg-primary-foreground/50 p-4 shadow-aboutcard backdrop-blur-sm md:grid"
      initial={{
        opacity: 0,
        rotateX: 50,
        y: 300,
      }}
      whileInView={{
        rotateX: 0,
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "500px" }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 100,
        duration: 600,
        delay: 0.6,
      }}
    >
      {children}
    </motion.div>
  )
}
