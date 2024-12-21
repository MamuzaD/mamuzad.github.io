import { persistentAtom } from "@nanostores/persistent"

export const currentProfile = persistentAtom<string>("currentProfile", "me")

export const profiles = [
  {
    name: "me",
    path: "/profile/me.webp",
    icons: ["", "", ""],
    audio: "",
  },
  {
    name: "spiderman",
    path: "/profile/spiderman.webp",
    icons: [
      "/particles/spider-man/spidey-pod.webp",
      "/particles/spider-man/spidey-sense.webp",
      "/particles/spider-man/spidey-thinking.webp",
    ],
    audio: "",
  },
  {
    name: "minecraft",
    path: "/profile/minecraft.webp",
    icons: [
      "/particles/minecraft/grassblock.webp",
      "/particles/minecraft/diamondsword.webp",
      "/particles/minecraft/diamondore.webp",
    ],
    audio: "",
  },
]

export const cycleProfile = () => {
  currentProfile.set(
    profiles[
      (profiles.findIndex((profile) => profile.name == currentProfile.get()) +
        1) %
        profiles.length
    ].name
  )
}

export const getIcons = (): string[] => {
  let currentIndex = profiles.findIndex(
    (profile) => profile.name === currentProfile.get()
  )

  return profiles[currentIndex].icons
}
