"use client"

import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { reachouts } from "@/content/socials"
import ContactForm from "./ContactForm"

export default function Contact() {
  const [viewForm, setViewForm] = useState(false)

  return (
    <section className="z-50 flex flex-col items-center">
      {!viewForm && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="min-h-26 z-50 text-4xl font-bold">
            contact me
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-muted/50">
            <DropdownMenuLabel className="text-center">
              your preference
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setViewForm(true)}
              className="flex items-center gap-2 text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm10 2h-6v-2h6zm0-4h-6v-2h6zm0-4h-6V7h6z"
                />
              </svg>
              <span>contact form</span>
            </DropdownMenuItem>
            {reachouts.map((r) => (
              <DropdownMenuItem key={r.name}>
                <a
                  className="flex items-center gap-2 text-lg"
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.icon}
                  <span>{r.name}</span>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {viewForm && <ContactForm setViewForm={setViewForm} />}
    </section>
  )
}
