"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

type MapNavCtx = {
  mapActive: boolean;
  activateMap: () => void;
  deactivateMap: () => void;
  foodOpen: boolean; openFood: () => void; closeFood: () => void;
  hotelsOpen: boolean; openHotels: () => void; closeHotels: () => void;
  shoppingOpen: boolean; openShopping: () => void; closeShopping: () => void;
  schoolsOpen: boolean; openSchools: () => void; closeSchools: () => void;
  healthcareOpen: boolean; openHealthcare: () => void; closeHealthcare: () => void;
  mobileMenuOpen: boolean; openMobileMenu: () => void; closeMobileMenu: () => void;
};

const MapNavContext = createContext<MapNavCtx | null>(null);

export function MapNavProvider({ children }: { children: React.ReactNode }) {
  const [mapActive, setMapActive] = useState(false);
  const [foodOpen, setFoodOpen] = useState(false);
  const [hotelsOpen, setHotelsOpen] = useState(false);
  const [shoppingOpen, setShoppingOpen] = useState(false);
  const [schoolsOpen, setSchoolsOpen] = useState(false);
  const [healthcareOpen, setHealthcareOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activateMap   = useCallback(() => setMapActive(true), []);
  const deactivateMap = useCallback(() => setMapActive(false), []);
  const openFood      = useCallback(() => { setFoodOpen(true);      trackEvent("food_section_open"); }, []);
  const closeFood     = useCallback(() => { setFoodOpen(false);     trackEvent("food_section_close"); }, []);
  const openHotels    = useCallback(() => { setHotelsOpen(true);    trackEvent("hotels_section_open"); }, []);
  const closeHotels   = useCallback(() => { setHotelsOpen(false);   trackEvent("hotels_section_close"); }, []);
  const openShopping  = useCallback(() => { setShoppingOpen(true);  trackEvent("shopping_section_open"); }, []);
  const closeShopping = useCallback(() => { setShoppingOpen(false); trackEvent("shopping_section_close"); }, []);
  const openSchools   = useCallback(() => { setSchoolsOpen(true);   trackEvent("schools_section_open"); }, []);
  const closeSchools  = useCallback(() => { setSchoolsOpen(false);  trackEvent("schools_section_close"); }, []);
  const openHealthcare  = useCallback(() => { setHealthcareOpen(true);  trackEvent("healthcare_section_open"); }, []);
  const closeHealthcare = useCallback(() => { setHealthcareOpen(false); trackEvent("healthcare_section_close"); }, []);
  const openMobileMenu  = useCallback(() => setMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <MapNavContext.Provider value={{
      mapActive, activateMap, deactivateMap,
      foodOpen, openFood, closeFood,
      hotelsOpen, openHotels, closeHotels,
      shoppingOpen, openShopping, closeShopping,
      schoolsOpen, openSchools, closeSchools,
      healthcareOpen, openHealthcare, closeHealthcare,
      mobileMenuOpen, openMobileMenu, closeMobileMenu,
    }}>
      {children}
    </MapNavContext.Provider>
  );
}

export function useMapNav() {
  return useContext(MapNavContext);
}
