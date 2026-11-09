/**
 * Bike Shops & Rentals section content.
 *
 * Listings are business-confirmed (Grok Bot inbox); only the fields the
 * business supplied are shown. Shops in towns outside the main cities have no
 * `city` and carry a `town`; the page shows them under "Other locations".
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";

export type BikeShop = {
  name: string;
  /** Main city. Leave unset for towns outside the main cities. */
  city?: City;
  /** Town, for entries listed under "Other locations". */
  town?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
};

export const OTHER_LOCATIONS = "Other locations";

export const BIKE_SHOPS: ReadonlyArray<BikeShop> = [
  {
    name: "Matthias Bike Corner Cyprus",
    town: "Kalavasos",
    address: "Arch. Makariou III 56, 7733 Kalavasos, Larnaca",
    phone: "+357 9937 2404",
    email: "info@radverleih-zypern.de",
    website: "https://www.radverleih-zypern.de",
  },
];
