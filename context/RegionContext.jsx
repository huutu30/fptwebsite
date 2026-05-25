"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const RegionContext = createContext();

export const useRegion = () => useContext(RegionContext);

export const RegionProvider = ({ children }) => {
  const pathname = usePathname();
  const [activeCity, setActiveCity] = useState('toan-quoc');

  // Load from localStorage or URL path on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/^\/lap-internet-wifi\/([^\/]+)/);
      if (match) {
        setActiveCity(match[1]);
        return;
      }
      try {
        const saved = localStorage.getItem('fpt_active_city');
        if (saved) setActiveCity(saved);
      } catch(e) {}
    }
  }, [pathname]);

  const changeCity = (city) => {
    setActiveCity(city);
    try {
      localStorage.setItem('fpt_active_city', city);
    } catch(e) {}
  };

  const region = (activeCity === 'hcm' || activeCity === 'ha-noi') ? 'hcm' : 'tinh';

  return (
    <RegionContext.Provider value={{ activeCity, region, changeCity }}>
      {children}
    </RegionContext.Provider>
  );
};
