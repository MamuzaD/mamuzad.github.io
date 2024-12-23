import { motion, useScroll } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 right-0 top-24 z-[0] h-[2px] origin-left bg-primary p-0 md:left-5 md:right-5 md:top-[75px]"
    />
  )
}
