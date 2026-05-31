import type { GuideCategory } from "./guides";

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
};

export const AUTHORS: Record<string, Author> = {
  nico: {
    slug: "nico",
    name: "Nico Andreou",
    role: "Immigration & Visa Researcher",
    bio: "Cyprus-based researcher specialising in EU and non-EU immigration pathways. Has guided dozens of digital nomads and investors through the residency and visa application process.",
  },
  elena: {
    slug: "elena",
    name: "Elena Stavrou",
    role: "Tax & Business Researcher",
    bio: "Specialist in Cyprus tax law and company formation, with a focus on non-dom planning, IP box structures, and cross-border tax treaty analysis for international residents.",
  },
  maya: {
    slug: "maya",
    name: "Maya Petridou",
    role: "Property & Lifestyle Researcher",
    bio: "Cyprus property market researcher covering new-build developments, off-plan purchases, and the practical realities of daily life — from cost of living to finding the right neighbourhood.",
  },
  andreas: {
    slug: "andreas",
    name: "Andreas Georgiou",
    role: "Healthcare & Environment Researcher",
    bio: "Researcher covering Cyprus healthcare (GeSY), transport, environment, and family services — with a focus on the practical information expat families need when settling in.",
  },
  team: {
    slug: "team",
    name: "RealCy Editorial Team",
    role: "Cyprus Relocation Specialists",
    bio: "The RealCy editorial team researches and verifies Cyprus relocation information across immigration, tax, property, lifestyle, and healthcare.",
  },
};

export const CATEGORY_AUTHOR: Record<GuideCategory, string> = {
  immigration: "nico",
  tax: "elena",
  business: "elena",
  property: "maya",
  family: "maya",
  healthcare: "andreas",
  transport: "andreas",
  lifestyle: "maya",
  environment: "andreas",
};
