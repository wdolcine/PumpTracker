import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import React, { useContext, useState } from "react";
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
// import { errorMsg } from "@/services/fetchGasStations";

export default function MyMapView() {
  interface Location {
    lat: number;
    lon: number;
  }

  const userLocationContext = useContext(
    UserLocationContext
  ) as LocationContextType;

  const { gasStations, fetchNearbyGasStations } = useContext(
    FetchGasStationsContext
  ) as FetchGasStationsContextType;

  const { latitude, longitude } = useContext(
    UserLocationContext
  ) as LocationContextType;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState<any | null>(null);

  const openModal = (placeId: string) => {
    setSelectedStation(placeId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedStation(null);
    setModalVisible(false);
  };

  const region: Region | undefined = userLocationContext
    ? {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : undefined;

  if (!userLocationContext) {
    return (
      <View style={styles.View}>
        <ActivityIndicator size="large" color={Colors.lightColor.tintColor} />
        <Text style={{ fontFamily: "Outfit-Regular", marginTop: 5 }}>
          Loading...
        </Text>
      </View>
    );
  }
  const handleLocationSelected = async (location: Location) => {
    await fetchNearbyGasStations(location.lat, location.lon);
    console.log("Selected Location:", location);
  };
  return (
    <View>
      <View style={styles.containerHeader}>
        <CustomSearchBar onLocationSelected={handleLocationSelected} />
      </View>
      {latitude && longitude && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          region={region}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title="Your Location"
            description="Where you are"
          >
            <Image
              source={require("@/assets/images/currentLocation.png")}
              style={{ height: 50, width: 35 }}
            />
          </Marker>
          {gasStations &&
            gasStations.map((station, index) => (
              <Markers
                key={`${station.place_id}-${index}`}
                latitude={station.lat}
                longitude={station.lon}
                title={station.name}
                address={station.address}
                onPress={() => {
                  openModal(station.place_id);
                }}
              />
            ))}
        </MapView>
      )}
      <GasStationDetailsModal
        isVisible={modalVisible}
        onClose={closeModal}
        placeId={selectedStation}
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
});
