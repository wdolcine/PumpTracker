import { useContext } from "react";
import {
  FetchGasStationsContext,
  FetchGasStationsContextType,
} from "./fetchGasStations";

export const useFetchGasStations = (): FetchGasStationsContextType => {
  const context = useContext(FetchGasStationsContext);
  if (!context) {
    throw new Error(
      "useFetchGasStations must be used within an FetchGasStationsProvider"
    );
  }
  return context;
};
