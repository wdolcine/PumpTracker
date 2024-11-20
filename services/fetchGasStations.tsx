import {
  LocationContextType,
  UserLocationContext,
} from "@/context/UserLocationContext";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

export interface FetchGasStationsContextType {
  gasStations: any[];
  fetchNearbyGasStations: (lat: number, lng: number) => Promise<void>;
}
export const FetchGasStationsContext =
  createContext<FetchGasStationsContextType | null>(null);

export const FetchGasStationsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gasStations, setGasStations] = useState<Array<any>>([]);

  const GEOAPIFY_API_KEY = "a4e1b1fa978f4758b3b8db8005e8a96f";

  const { latitude, longitude } = useContext(
    UserLocationContext
  ) as LocationContextType;

  const fetchPlaces = async () => {};
  useEffect(() => {
    if (latitude && longitude) {
      fetchNearbyGasStations(latitude, longitude);
    } else {
      console.log("Cant find location");
    }
  }, [latitude, longitude]);

  const fetchNearbyGasStations = async (lat: number, lng: number) => {
    const url = `https://api.geoapify.com/v2/places?categories=service.vehicle.fuel&filter=circle:${lng},${lat},5000&bias=proximity:${lng},${lat}&limit=20&apiKey=${GEOAPIFY_API_KEY}`;

    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      const results = data.features.map((feature: any) => ({
        name: feature.properties.name,
        address: feature.properties.formatted,
        place_id: feature.properties.place_id,
        lat: feature.properties.lat,
        lon: feature.properties.lon,
      }));

      setGasStations(results);
      console.log(results);
    } catch (error) {
      console.error("Error fetching gas stations:", error);
    }
  };

  const value: FetchGasStationsContextType = {
    gasStations,
    fetchNearbyGasStations,
  };
  return (
    <FetchGasStationsContext.Provider value={value}>
      {children}
    </FetchGasStationsContext.Provider>
  );
};