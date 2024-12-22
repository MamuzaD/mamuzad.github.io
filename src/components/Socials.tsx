"use client"

import { Icon } from "astro-icon/components"
import { ModeToggle } from "@/components/ui/mode-toggle"

import { socials } from "@/content/socials"
import { LinkPreview } from "@/components/ui/link-preview"

export default function Quotes() {
  return (
    <div className="flex place-items-center gap-6">
      {socials.map((social, index) => (
        <LinkPreview url={social.href} target="_blank" side="bottom">
          test
        </LinkPreview>
      ))}
      <ModeToggle />
    </div>
  )
}
