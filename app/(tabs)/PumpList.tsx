import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import GasStationCard from "@/components/GasStation/GasStationCard";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

interface GasStation {
  id: string;
  title: string;
  address: string;
  status: "open" | "closed"; // Restricting to 'open' or 'closed'
}

// Sample data for the gas stations with proper typing for status
const stationData: GasStation[] = [
  {
    id: "1",
    title: "ImPark Underhill Garage",
    address: "105 Underhill Ave, Brooklyn",
    status: "open",
  },
  {
    id: "2",
    title: "99 Prospect Park W",
    address: "99 Prospect Park W, Brooklyn",
    status: "closed",
  },
  {
    id: "3",
    title: "Walgreens - Brooklyn, NY",
    address: "589 Prospect Avenue, Brooklyn",
    status: "open",
  },
  {
    id: "4",
    title: "Rapidpark 906 Union St.",
    address: "906 Union St, Brooklyn",
    status: "open",
  },
  {
    id: "5",
    title: "MTP Parking 755 Kent Ave",
    address: "755 Kent Ave, Brooklyn",
    status: "closed",
  },
  {
    id: "6",
    title: "ImPark 302 2nd St",
    address: "302 2nd St, Brooklyn",
    status: "open",
  },
  {
    id: "7",
    title: "ImPark 353 4th Ave",
    address: "353 4th Ave, Brooklyn",
    status: "open",
  },
  {
    id: "8",
    title: "ImPark 353 4th Ave",
    address: "353 4th Ave, Brooklyn",
    status: "open",
  },
  {
    id: "9",
    title: "ImPark 353 4th Ave",
    address: "353 4th Ave, Brooklyn",
    status: "open",
  },
  {
    id: "10",
    title: "ImPark 353 4th Ave",
    address: "353 4th Ave, Brooklyn",
    status: "open",
  },
  {
    id: "11",
    title: "ImPark 353 4th Ave",
    address: "353 4th Ave, Brooklyn",
    status: "open",
  },
  {
    id: "12",
    title: "ImPark 353 4th Ave",
    address: "353 4th Ave, Brooklyn",
    status: "open",
  },
  {
    id: "13",
    title: "ImPark 353 4th Ave",
    address: "353 4th Ave, Brooklyn",
    status: "open",
  },
  {
    id: "14",
    title: "ImPark 353 4th Ave",
    address: "353 4th Ave, Brooklyn",
    status: "open",
  },
  {
    id: "15",
    title: "ImPark 353 4th Ave",
    address: "353 4th Ave, Brooklyn",
    status: "open",
  },
];

export default function PumpList() {
  const renderGasStationCard = ({
    item,
  }: {
    item: {
      id: string;
      title: string;
      address: string;
      status: "open" | "closed";
    };
  }) => (
    <GasStationCard
      title={item.title}
      address={item.address}
      status={item.status}
      onPress={() => router.navigate("/StationDetails")}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={stationData}
        renderItem={renderGasStationCard}
        keyExtractor={(item) => item.id}
      />
      <StatusBar backgroundColor={Colors.lightColor.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
  },
});
