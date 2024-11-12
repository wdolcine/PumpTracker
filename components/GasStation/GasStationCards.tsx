import React from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import GasStationCard from "./GasStationCard";
import { useRouter } from "expo-router";

// Sample data for the gas stations
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
];

// Main component that renders the FlatList of gas stations
const GasStationCards: React.FC = () => {
  const router = useRouter();

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
      <ScrollView>
        <FlatList
          data={stationData}
          renderItem={renderGasStationCard}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GasStationCards;
