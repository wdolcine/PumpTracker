import { StyleSheet } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

interface MarkersProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  onPress: () => void;
}

const Markers: React.FC<MarkersProps> = ({
  latitude,
  longitude,
  title,
  address,
  onPress,
}) => {
  const openIcon = require("@/assets/images/GasStationMarkerOpen.png");
  const closedIcon = require("@/assets/images/GasStationMarkerOpen.png");
  return (
    <Marker
      coordinate={{ latitude, longitude }}
      title={title}
      description={address}
      image={openIcon}
      onPress={onPress}
      style={styles.marker}
    ></Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 50,
    height: 50,
  },
});

export default Markers;
