import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import GasStationCard from "./GasStationCard";
import { useRouter } from "expo-router";
import {
  FetchGasStationsContext,
  FetchGasStationsContextType,
} from "@/services/fetchGasStations";
import GasStationDetailsModal from "./GasStationDetailsModal";
import { Colors } from "@/constants/Colors";

const GasStationCards: React.FC = () => {
  const router = useRouter();
  const { gasStations } = useContext(
    FetchGasStationsContext
  ) as FetchGasStationsContextType;

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

  const renderGasStationCard = ({
    item,
  }: {
    item: {
      place_id: string;
      name: string;
      address: string;
    };
  }) => (
    <GasStationCard
      title={item.name}
      address={item.address}
      onPress={() => openModal(item.place_id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={gasStations}
        renderItem={renderGasStationCard}
        keyExtractor={(item, index) => `${item.place_id}-${index}`}
      />
      <GasStationDetailsModal
        isVisible={modalVisible}
        onClose={closeModal}
        placeId={selectedStation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightColor.background,
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
  },
});

export default GasStationCards;
