"use client"
import { LinkPreview } from "@/components/ui/link-preview"
import TypingAnimation from "@/components/ui/typing-animation"
import { Link } from "lucide-react"
import { motion } from "motion/react"

export default function Welcome() {
  return (
    <main className="mx-auto mb-16 flex max-w-md flex-col items-start justify-center px-4">
      <div className="z-0 pt-80">
        <motion.div
          initial={{
            x: -100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 500,
            delay: 0,
          }}
        >
          <TypingAnimation
            className="mb-2 min-h-10 text-3xl font-bold"
            as="h1"
            duration={100}
            delay={100}
          >
            hey, i'm daniel
          </TypingAnimation>
        </motion.div>

        <motion.h2
          className="flex items-center text-2xl"
          initial={{
            x: -200,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 3,
            delay: 0.2,
          }}
        >
          software engineer, student at{" "}
          <LinkPreview
            noUrl
            imageSrc="/experiences/unlv.webp"
            height={80}
            width={80}
            isStatic
            className="ml-1.5 inline-block cursor-default"
            side="right"
            sideOffset={20}
            align="center"
            alignOffset={0}
          >
            unlv
          </LinkPreview>
        </motion.h2>
      </div>
    </main>
  )
}
