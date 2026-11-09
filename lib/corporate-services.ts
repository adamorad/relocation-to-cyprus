/**
 * Corporate Services section content.
 *
 * Listings are business-confirmed (Grok Bot inbox); only the fields the firm
 * supplied are shown. This is a directory, not legal or tax advice: verify
 * licences, scope and fees directly with the firm.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";

export type CorporateServiceProvider = {
  name: string;
  /** Cities the firm serves. */
  cities: ReadonlyArray<City>;
  contact?: string;
  why?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
};

export const CORPORATE_SERVICE_PROVIDERS: ReadonlyArray<CorporateServiceProvider> =
  [
    {
      name: "Kiklon Partners",
      cities: ["Limassol", "Larnaca"],
      contact: "Artemios Mallas, Managing Partner",
      why: "Administrative service provider (ASP) licensed under the Cyprus Bar Association, as stated by the firm.",
      phone: "+35799554251",
      email: "hello@kiklonpartners.com",
      website: "https://www.kiklonpartners.com",
    },
  ];
