import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import * as Location from "expo-location";

export interface LocationContextType {
  location: Location.LocationObject | null;
  setLocation: React.Dispatch<
    React.SetStateAction<Location.LocationObject | null>
  >;
  latitude: number;
  longitude: number;
  errorMsgLocation: string | undefined;
  clearErrorLocation: () => void;
  requestUserLocation: () => Promise<void>;
}

export const UserLocationContext = createContext<LocationContextType | null>(
  null
);

export const UserLocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsgLocation, setErrorMsg] = useState<string | undefined>(
    undefined
  );

  const requestUserLocation = useCallback(async () => {
    try {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
      console.log("User location updated:", userLocation.coords);
    } catch (error) {
      setErrorMsg(`Error retrieving location : ${error}`);
    }
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }
  //     try {
  //       let location = await Location.getCurrentPositionAsync({});
  //       setLocation(location);
  //       console.log(location.coords);
  //     } catch (error) {
  //       setErrorMsg(`Error retrieving location: ${error}`);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    requestUserLocation();
  }, [requestUserLocation]);

  const latitude = location?.coords.latitude ?? 0;
  const longitude = location?.coords.longitude ?? 0;

  const clearErrorLocation = () => {
    setErrorMsg(undefined);
  };

  const value: LocationContextType = {
    location,
    errorMsgLocation,
    clearErrorLocation,
    setLocation,
    latitude,
    requestUserLocation,
    longitude,
  };
  return (
    <UserLocationContext.Provider value={value}>
      {children}
    </UserLocationContext.Provider>
  );
};
