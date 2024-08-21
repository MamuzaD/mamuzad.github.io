import { persistentAtom } from "@nanostores/persistent";


export const currentProfile = persistentAtom<string>("currentProfile", "me");

export const profiles = [
  {
    name: "me",
    path: "/assets/profile/portrait.webp",
    icons: ["", "", ""],
    audio: "",
  },
  {
    name: "spiderman",
    path: "/assets/profile/spiderman.webp",
    icons: [
      "/assets/particles/spider-man/spidey-pod.webp",
      "/assets/particles/spider-man/spidey-sense.webp",
      "/assets/particles/spider-man/spidey-thinking.webp",
    ],
    audio: "",
  },
  {
    name: "minecraft",
    path: "/assets/profile/minecraftme.webp",
    icons: [
      "/assets/particles/minecraft/grassblock.webp",
      "/assets/particles/minecraft/diamondsword.webp",
      "/assets/particles/minecraft/diamondore.webp",
    ],
    audio: "",
  },
];

export const cycleProfile = () => {
  currentProfile.set(
    profiles[
      (profiles.findIndex((profile) => profile.name == currentProfile.get()) +
        1) %
        profiles.length
    ].name
  );
};

export const getIcons = (): string[] => {
  let currentIndex = profiles.findIndex(
    (profile) => profile.name === currentProfile.get()
  );

  return profiles[currentIndex].icons;
};
