import { persistentAtom } from "@nanostores/persistent";
type ProfileName = "me" | "spiderman" | "minecraft";

export const currentProfile = persistentAtom<ProfileName>("me");

export const profiles = [
  {
    name: "me",
    path: "/assets/profile/portrait.webp",
    icons: ["ets", "ets", "test"],
  },
  {
    name: "spiderman",
    path: "/assets/profile/spiderman.webp",
    icons: [
      "https://seeklogo.com/images/S/spider-man-across-the-spider-verse-logo-715279F78E-seeklogo.com.png",
      "https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/44/Diamond_Sword_JE3_BE3.png",
      "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b5/Diamond_Ore_JE3_BE3.png",
    ],
  },
  {
    name: "minecraft",
    path: "/assets/profile/minecraftme.webp",
    icons: [
      "https://static.wikia.nocookie.net/minecraft/images/c/c5/Grass.png",
      "https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/44/Diamond_Sword_JE3_BE3.png",
      "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b5/Diamond_Ore_JE3_BE3.png",
    ],
  },
];

export const cycleProfile = () => {
  currentProfile.set(
    profiles[
      (profiles.findIndex((profile) => profile.name == currentProfile.get()) +
        1) %
        profiles.length
    ].name as ProfileName
  );
};

export const getIcons = (): string[] => {
  let currentIndex = profiles.findIndex(
    (profile) => profile.name === currentProfile.get()
  );
  
  return profiles[currentIndex].icons!;
};
