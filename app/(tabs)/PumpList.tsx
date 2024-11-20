import { StyleSheet, View } from "react-native";
import React from "react";
import GasStationCards from "@/components/GasStation/GasStationCards";
import { Colors } from "@/constants/Colors";

export default function PumpList() {
  return (
    <View style={styles.container}>
      <GasStationCards />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightColor.background,
    flex: 1,
    justifyContent: "center",
    paddingTop: 5,
  },
});
