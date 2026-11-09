/**
 * Photographers section content.
 *
 * Listings are business-confirmed (Grok Bot inbox); only the fields the
 * business supplied are shown. Check availability and prices with the
 * photographer.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";

export type Photographer = {
  name: string;
  city?: City;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
};

export const PHOTOGRAPHERS: ReadonlyArray<Photographer> = [
  {
    name: "AC PhotoGraphics",
    city: "Larnaca",
    address: "Adamantiou Korai 4, Larnaca",
    phone: "+35799753990",
    email: "acphotodesigners@gmail.com",
    website: "https://www.acphotographics.com",
  },
];
