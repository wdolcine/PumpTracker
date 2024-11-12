import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import React, { useContext, useEffect } from "react";
import MapViewStyle from "@/constants/MapViewStyle.json";
import { useUserLocation } from "@/context/useUserLocation";
import { Colors } from "@/constants/Colors";

export default function MyMapView() {
  const { location, setLocation } = useUserLocation();

  const region: Region | undefined = location
    ? {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : undefined;

  if (!location) {
    return (
      <View style={styles.View}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    location?.coords.latitude && (
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          // customMapStyle={MapViewStyle}
          region={region}
        >
          <Marker
            coordinate={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
            }}
            title="Your Location"
            description="Where you are"
          >
            <Image
              source={require("@/assets/images/currentLocation.png")}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </Marker>
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
