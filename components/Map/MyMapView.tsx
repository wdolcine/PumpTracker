import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Animated,
  FlatList,
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import React, { useContext, useEffect, useRef, useState } from "react";
import MapViewStyle from "@/constants/MapViewStyle.json";
import { Colors } from "@/constants/Colors";
import {
  LocationContextType,
  UserLocationContext,
} from "@/context/UserLocationContext";
import CustomSearchBar from "../CustomSearchBar";
import Markers from "./Markers";
import {
  FetchGasStationsContext,
  FetchGasStationsContextType,
} from "@/services/fetchGasStations";
import GasStationDetailsModal from "../GasStation/GasStationDetailsModal";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "expo-router";

export default function MyMapView() {
  interface Location {
    lat: number;
    lon: number;
  }

  const userLocationContext = useContext(
    UserLocationContext
  ) as LocationContextType;

  const {
    gasStations,
    fetchNearbyGasStations,
    errorMsgGasStations,
    clearErrorGasStations,
  } = useContext(FetchGasStationsContext) as FetchGasStationsContextType;

  const {
    latitude,
    longitude,
    location,
    clearErrorLocation,
    errorMsgLocation,
  } = userLocationContext || {};

  // const locationAvailable = latitude !== undefined && longitude !== undefined;

  const { currentUser } = useAuth();

  const router = useRouter();

  const mapRef = useRef<MapView>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState<any | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const openModal = (placeId: string, lat: number, lon: number) => {
    setSelectedCoords({ lat, lon });
    setSelectedStation(placeId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCoords(null);
    setSelectedStation(null);
    setModalVisible(false);
  };

  useEffect(() => {
    if (errorMsgLocation || errorMsgGasStations) {
      const errorMessage =
        errorMsgLocation || errorMsgGasStations || "Unknown location error.";
      Alert.alert("Location error", errorMessage);
      console.log(errorMessage);
    }
    return () => {
      {
        errorMsgLocation ? clearErrorLocation() : clearErrorGasStations();
      }
    };
  }, [errorMsgLocation, errorMsgGasStations]);

  useEffect(() => {
    if (latitude && longitude && currentUser) {
      fetchNearbyGasStations(latitude, longitude);
      mapRef.current?.animateCamera(
        {
          center: {
            latitude,
            longitude,
          },
          zoom: 14,
        },
        { duration: 100 }
      );
    }
  }, [latitude, longitude, currentUser]);

  const handleLocationSelected = async (location: Location) => {
    if (!currentUser) {
      Alert.alert("Authentication Required", "Please log in to search.");
      router.push("/(auth)/LoginScreen");
      return;
    }
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: location.lat,
          longitude: location.lon,
        },
        zoom: 15,
      },
      { duration: 1000 }
    );
    await fetchNearbyGasStations(location.lat, location.lon);
    console.log("Selected Location:", location);
  };

  const resetToUserLocation = () => {
    if (!longitude && !latitude) {
      mapRef.current?.animateCamera(
        {
          center: {
            latitude,
            longitude,
          },
          zoom: 14,
        },
        { duration: 1000 }
      );
    }
  };

  const region: Region | undefined =
    longitude && latitude
      ? {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
      : undefined;

  if (!longitude && !latitude && !currentUser) {
    return (
      <View style={styles.View}>
        <ActivityIndicator size="large" color={Colors.lightColor.tintColor} />
        <Text style={{ fontFamily: "Outfit-Regular", marginTop: 5 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.containerHeader}>
        <CustomSearchBar
          onLocationSelected={handleLocationSelected}
          disabled={!currentUser}
          onClear={() =>
            mapRef.current?.animateCamera(
              {
                center: {
                  latitude,
                  longitude,
                },
                zoom: 14,
              },
              { duration: 1000 }
            )
          }
        />
      </View>
      {longitude && latitude && (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          // initialRegion={{
          //   latitude,
          //   longitude,
          //   latitudeDelta: 0.05,
          //   longitudeDelta: 0.05,
          // }}
          region={region}
          showsMyLocationButton
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title="Your Location"
            description="Where you are"
            onPress={() => {
              resetToUserLocation();
            }}
          >
            <Image
              source={require("@/assets/images/currentLocation.png")}
              style={{ height: 50, width: 35 }}
            />
          </Marker>
          {currentUser &&
            gasStations &&
            gasStations.map((station, index) => (
              <Markers
                key={`${station.place_id}-${index}`}
                latitude={station.lat}
                longitude={station.lon}
                title={station.name}
                address={station.address}
                onPress={() => {
                  openModal(station.place_id, station.lat, station.lon);
                }}
              />
            ))}
          {/* {route && route?.route?.geometry?.coordinates?.length > 0 && (
            <Polyline
              coordinates={route?.route?.geometry?.coordinates?.map(
                ([lng, lat]: [number, number]) => ({
                  latitude: lat,
                  longitude: lng,
                })  
              )}
              strokeColor="blue"
              strokeWidth={3}
            />
          )} */}
        </MapView>
      )}
      <GasStationDetailsModal
        isVisible={modalVisible}
        onClose={closeModal}
        placeId={selectedStation}
        gasStationCoords={selectedCoords}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  containerHeader: {
    position: "absolute",
    zIndex: 10,
    padding: 10,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100%",
  },
  message: {
    fontSize: 16,
    color: Colors.lightColor.iconDefault,
    fontFamily: "Outfit-SemiBold",
  },
  modesContainer: {
    position: "absolute",
    bottom: 100,
    left: 10,
    right: 10,
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  modeItem: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: Colors.lightColor.background,
    borderRadius: 5,
  },
  selectedMode: {
    backgroundColor: Colors.lightColor.tintColor,
  },
  modeLabel: {
    fontSize: 14,
    color: Colors.lightColor.text,
  },
  infoBox: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoText: {
    fontSize: 16,
    color: Colors.lightColor.text,
  },
});
