import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import * as Location from "expo-location";

export interface LocationContextType {
  location: Location.LocationObject | null;
  setLocation: React.Dispatch<
    React.SetStateAction<Location.LocationObject | null>
  >;
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.error(errorMsg);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // const coords = location.coords;
      setLocation(location);
      // console.log(location.coords);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const value: LocationContextType = {
    location,
    setLocation,
  };
  return (
    <UserLocationContext.Provider value={value}>
      {children}
    </UserLocationContext.Provider>
  );
};
