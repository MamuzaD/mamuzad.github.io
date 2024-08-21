import { motion, useScroll } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-20 md:right-16 md:left-16 right-0 left-0 h-[2px] origin-left bg-[var(--gray-0)] z-[9999] p-0 "
    />
  );
};
