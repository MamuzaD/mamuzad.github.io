import TypingAnimation from "@/components/ui/typing-animation"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <TypingAnimation className="min-h-20">page not found...</TypingAnimation>
      <TypingAnimation
        className="min-h-32 text-6xl tracking-wide"
        delay={850}
        duration={500}
      >
        404
      </TypingAnimation>
    </div>
  )
}
