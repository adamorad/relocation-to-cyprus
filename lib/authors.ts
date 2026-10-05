export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
};

export const AUTHORS: Record<string, Author> = {
  team: {
    slug: "team",
    name: "RealCy Editorial Team",
    role: "Editorial team",
    bio: "RealCy's editorial team researches each guide against official sources and shows when it was last checked.",
  },
};
