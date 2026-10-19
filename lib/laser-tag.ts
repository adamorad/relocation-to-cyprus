/**
 * Laser Tag section content.
 *
 * Listings are business-confirmed (Grok Bot inbox files); only the fields the
 * venue supplied are shown. Check opening times and booking with the venue.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";

export type LaserTagVenue = {
  name: string;
  city?: City;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
};

export const LASER_TAG_VENUES: ReadonlyArray<LaserTagVenue> = [
  {
    name: "Pittakouris Riding Club",
    address: "Spyrou Kyprianou 100 (entrance from Lexeko), Lythrodontas 2565, Cyprus",
    phone: "+357 94 268826",
    website: "http://pittakourisridingclub.com/",
  },
];
