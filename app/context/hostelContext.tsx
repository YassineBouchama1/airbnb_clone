import React, { createContext, ReactNode, useState } from 'react';

interface HostelContextTypes {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedCity: string | null;
  setSelectedCity: (category: string | null) => void;
  maxDistanceKm: number;
  setMaxDistanceKm: (distance: number) => void;
}

const HostelContext = createContext<HostelContextTypes>({
  selectedCategory: null,
  setSelectedCategory: () => {},
  selectedCity:  null,
  setSelectedCity: () => {},
  maxDistanceKm: 5,
  setMaxDistanceKm: () => {},
});

const HostelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');
  const [selectedCity, setSelectedCity] = useState<string | null>('all');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(5);

  return (
    <HostelContext.Provider
      value={{ selectedCategory, setSelectedCategory,selectedCity, setSelectedCity, maxDistanceKm, setMaxDistanceKm }}
    >
      {children}
    </HostelContext.Provider>
  );
};

export { HostelContext, HostelProvider };
