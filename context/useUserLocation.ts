import { useContext } from "react";
import { UserLocationContext,LocationContextType } from "./UserLocationContext";
export const useUserLocation = () : LocationContextType => {
    const context = useContext(UserLocationContext);
    if (!context) {
      throw new Error(
        "useUserLocation must be used within a UserLocationProvider"
      );
    }
    return context;
  };