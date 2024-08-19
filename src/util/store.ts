import { persistentAtom } from "@nanostores/persistent";


export const currentProfile = persistentAtom<string>("currentProfile", "me");

export const profiles = [
  {
    name: "me",
    path: "/assets/profile/portrait.webp",
    icons: ["", "", ""],
    audio: "/keyboard-sound.mp3"
  },
  {
    name: "spiderman",
    path: "/assets/profile/spiderman.webp",
    icons: [
      "https://seeklogo.com/images/S/spider-man-across-the-spider-verse-logo-715279F78E-seeklogo.com.png",
      "https://cdn.freebiesupply.com/logos/large/2x/spider-man-4-logo-png-transparent.png",
      "https://www.pngkey.com/png/detail/799-7995924_into-the-spider-verse-png-spider-verse-spider.png",
    ],
    audio: "/spiderman sound effect short.mp3"
  },
  {
    name: "minecraft",
    path: "/assets/profile/minecraftme.webp",
    icons: [
      "https://static.wikia.nocookie.net/minecraft/images/c/c5/Grass.png",
      "https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/44/Diamond_Sword_JE3_BE3.png",
      "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b5/Diamond_Ore_JE3_BE3.png",
    ],
    audio: "/Minecraft Damage (Oof) - Sound Effect (HD).mp3"
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
