"use client"

import { motion } from "framer-motion"
import { Clipboard, Link2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { reachouts } from "@/content/socials"

import ContactForm from "@/components/contact/ContactForm"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Contact() {
  const [viewForm, setViewForm] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(true)
  const [copied, setCopied] = useState(false)
  const [copiedMessage, setCopiedMessage] = useState<string>("")
  const formRef = useRef<HTMLDivElement | null>(null)

  const handleCopy = (name: string, href: string) => {
    navigator.clipboard.writeText(href)
    setCopied(true)
    setCopiedMessage(`saved ${name}`)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    if (viewForm && formRef.current) formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [viewForm])

  useEffect(() => {
    setDropdownOpen(false)
  }, [])

  return (
    <section className="z-50 flex flex-col items-center">
      {!viewForm && (
        <DropdownMenu modal={false} open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger
            className={`min-h-26 z-50 text-4xl font-bold ${!copied && "pb-5"} hover-underline-animation`}
          >
            contact me
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-muted/50 backdrop-blur-md">
            <DropdownMenuLabel className="text-center">your preference</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setViewForm(true)
              }}
              className="flex cursor-pointer items-center gap-2 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm10 2h-6v-2h6zm0-4h-6v-2h6zm0-4h-6V7h6z"
                />
              </svg>
              <span>contact form</span>
            </DropdownMenuItem>
            {reachouts.map((r) => (
              <DropdownMenuItem key={r.name} className="items-center justify-between gap-10 text-lg">
                <div className="flex items-center gap-2">
                  {r.icon}
                  <span>{r.name}</span>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="outline" className="size-9 dark:hover:bg-primary-foreground">
                    <a href={r.href} target="_blank" rel="noopener noreferrer">
                      <Link2 />
                    </a>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-9 dark:hover:bg-primary-foreground"
                    onClick={() => handleCopy(r.name, r.href)}
                  >
                    <Clipboard />
                  </Button>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {viewForm && (
        <div ref={formRef}>
          <ContactForm setViewForm={setViewForm} setDropdownOpen={setDropdownOpen} />
        </div>
      )}
      {copied && (
        <motion.span
          className="saved text-sm font-semibold text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {copiedMessage}
        </motion.span>
      )}
    </section>
  )
}
