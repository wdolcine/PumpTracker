import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";

import MyMapView from "@/components/Map/MyMapView";
import SearchBar from "@/components/SearchBar";
import CustomSearchBar from "@/components/CustomSearchBar";

const Home: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const handleLocationSelected = (location: { lat: number; lon: number }) => {
    setSelectedLocation(location);
    console.log("Selected Location:", location);
  };
  return (
    <View>
      <View style={styles.containerHeader}>
        <CustomSearchBar onLocationSelected={handleLocationSelected} />
        {selectedLocation && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              Latitude: {selectedLocation.lat}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {selectedLocation.lon}
            </Text>
          </View>
        )}
      </View>
      <MyMapView />
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    position: "absolute",
    zIndex: 10,
    padding: 10,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  locationContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  locationText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Home;
