import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GasStationDetailsComponent } from "../components/GasStation/GasStationDetailsComponent";

const pumpData = {
  imageUrl: "@/assets/images/DSC_3693.jpg",
  name: "Walgreens - Brooklyn, NY",
  address: "589 Prospect Avenue, Brooklyn",
  rating: 4.5,
  reviewCount: 128,
  description:
    "Description about this station...sdfghjkajhgfdsfghjksjuytrstyuiuytrtyuiuytrertyuiuytrertyuisuytrertsyuiuytrertyuistrertyui",
  hours: [
    { day: "Monday", hours: "00:00 - 00:00" },
    // Add other days...
  ],
  amenities: [
    { name: "Restrooms", icon: "restaurant-outline" },
    // Add other amenities...
  ],
};

export default function StationDetails() {
  return (
    <View style={styles.container}>
      <GasStationDetailsComponent pumpData={pumpData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
