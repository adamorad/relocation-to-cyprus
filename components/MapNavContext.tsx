"use client";
import { createContext, useContext } from "react";

export type MapNavHandlers = {
  onOpenFood: () => void;
  onOpenHotels: () => void;
  onOpenShopping: () => void;
  onOpenSchools: () => void;
  onOpenHealthcare: () => void;
  onOpenMobileMenu: () => void;
  foodOpen: boolean;
  hotelsOpen: boolean;
  shoppingOpen: boolean;
  schoolsOpen: boolean;
  healthcareOpen: boolean;
};

export const MapNavContext = createContext<MapNavHandlers | null>(null);
export const useMapNav = () => useContext(MapNavContext);
