import React, { createContext, useContext, useState } from "react";
import { Airline } from "../components/AirlineDirectory";

interface AirlineContextType {
  airlines: Airline[];
  addAirline: (airline: Omit<Airline, "id" | "slug">) => void;
  deleteAirline: (id: string) => void;
  updateAirline: (id: string, airline: Omit<Airline, "id" | "slug">) => void;
}

const AirlineContext = createContext<AirlineContextType | undefined>(undefined);

export function AirlineProvider({ children }: { children: React.ReactNode }) {
  const [airlines, setAirlines] = useState<Airline[]>(() => {
    const savedAirlines = localStorage.getItem("airlines");
    return savedAirlines
      ? JSON.parse(savedAirlines)
      : [
          {
            id: "1",
            name: "Virgin Atlantic",
            slug: "virgin-atlantic",
            logo: "https://api.dicebear.com/7.x/initials/svg?seed=VA",
            headquarters: "Crawley, United Kingdom",
            fleetSize: 37,
            yearFounded: 1984,
            crewCount: 5500,
            baseLocations: ["London Heathrow", "London Gatwick", "Manchester"],
          },
          {
            id: "2",
            name: "Emirates",
            slug: "emirates",
            logo: "https://api.dicebear.com/7.x/initials/svg?seed=EM",
            headquarters: "Dubai, UAE",
            fleetSize: 262,
            yearFounded: 1985,
            crewCount: 21000,
            baseLocations: ["Dubai International"],
          },
        ];
  });

  const addAirline = (newAirline: Omit<Airline, "id" | "slug">) => {
    const airlineWithId = {
      ...newAirline,
      id: Math.random().toString(36).substr(2, 9),
      slug: newAirline.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
    setAirlines((prev) => {
      const newAirlines = [...prev, airlineWithId];
      localStorage.setItem("airlines", JSON.stringify(newAirlines));
      return newAirlines;
    });
  };

  const deleteAirline = (id: string) => {
    setAirlines((prev) => {
      const newAirlines = prev.filter((airline) => airline.id !== id);
      localStorage.setItem("airlines", JSON.stringify(newAirlines));
      return newAirlines;
    });
  };

  const updateAirline = (
    id: string,
    updatedAirline: Omit<Airline, "id" | "slug">,
  ) => {
    setAirlines((prev) => {
      const newAirlines = prev.map((airline) =>
        airline.id === id
          ? {
              ...updatedAirline,
              id,
              slug: updatedAirline.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-"),
            }
          : airline,
      );
      localStorage.setItem("airlines", JSON.stringify(newAirlines));
      return newAirlines;
    });
  };

  return (
    <AirlineContext.Provider
      value={{ airlines, addAirline, deleteAirline, updateAirline }}
    >
      {children}
    </AirlineContext.Provider>
  );
}

export function useAirlines() {
  const context = useContext(AirlineContext);
  if (context === undefined) {
    throw new Error("useAirlines must be used within an AirlineProvider");
  }
  return context;
}
