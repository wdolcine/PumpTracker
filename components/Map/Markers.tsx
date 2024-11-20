import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import GasIcon from "@expo/vector-icons/FontAwesome6";

interface MarkersProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  // status: "open" | "closed";
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
      image={closedIcon}
      onPress={onPress}
      style={styles.marker}
    >
      {/* <GasIcon name="gas-pump" size={24} color="black" /> */}
      {/* <Image src={openIcon}></Image> */}
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 50,
    height: 50,
  },
});

export default Markers;
