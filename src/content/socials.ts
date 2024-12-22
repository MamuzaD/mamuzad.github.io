type social = {
  name: string
  href: string
  icon: string
  src: string
}

export const socials: social[] = [
  {
    name: "Resume",
    icon: "fa-regular:file-alt",
    href: "/resume.pdf",
    src: "/socials/resume.jpg",
  },
  {
    name: "GitHub",
    icon: "fa6-brands:github",
    href: "https://github.com/mamuzad",
    src: "/socials/github.jpg",
  },
  {
    name: "LinkedIn",
    icon: "fa6-brands:linkedin",
    href: "https://linkedin.com/in/daniel-mamuza",
    src: "/socials/linkedin.jpg",
  },
]
