export type experience = {
  name: string
  src: string
  href: string
  role: string
  range: string
  colors: [string, string]
  transparents: [string, string]
}

export const experiences: experience[] = [
  {
    name: "intellimind",
    src: "/experiences/intellimind.png",
    href: "https://intellimind.com",
    role: "Software Engineer Intern",
    range: "Nov 2024 - now",
    colors: ["#017BA2", "#1D1D1B"],
    transparents: ["5, 125, 162, 0.5", "29, 29, 27, 0.5"],
  },
  {
    name: "unlv",
    src: "/experiences/unlv.png",
    href: "https://unlv.edu",
    role: "CS Teaching Assistant",
    range: "Aug 2024 - now",
    colors: ["#B10202", "#940202"],
    transparents: ["177, 2, 2, 0.5", "148, 2, 2, 0.5"],
  },
  {
    name: "acm",
    src: "/experiences/acm.png",
    href: "https://acm.cs.unlv.edu",
    role: "Webmaster",
    range: "July 2024 - now",
    colors: ["#B10202", "#666666"],
    transparents: ["177, 2, 2, 0.5", "102, 102, 102, 0.5"],
  },
  {
    name: "ai & data science club",
    src: "/experiences/intellimind.png",
    href: "https://aiclub.cs.unlv.edu",
    role: "Webmaster",
    range: "Sep 2024 - now",
    colors: ["#B10202", "#940202"],
    transparents: ["177, 2, 2, 0.5", "148, 2, 2, 0.5"],
  },
]
