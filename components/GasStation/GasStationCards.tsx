import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import GasStationCard from "./GasStationCard";
import { useRouter } from "expo-router";
import {
  FetchGasStationsContext,
  FetchGasStationsContextType,
} from "@/services/fetchGasStations";
import GasStationDetailsModal from "./GasStationDetailsModal";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/useAuth";

const GasStationCards: React.FC = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { gasStations, errorMsgGasStations, clearErrorGasStations } =
    useContext(FetchGasStationsContext) as FetchGasStationsContextType;

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
  useEffect(() => {
    if (errorMsgGasStations) {
      const errorMessage = errorMsgGasStations || "Unknown location error.";
      Alert.alert("Location error", errorMessage);
      console.log(errorMessage);
    }
    return () => {
      {
        clearErrorGasStations();
      }
    };
  }, [errorMsgGasStations]);

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

  if (!currentUser) {
    return (
      <View style={styles.viewNoUser}>
        <Text style={styles.textNoUser}>
          {" "}
          No nearby gas Stations available please
        </Text>
        <TouchableOpacity
          style={styles.LoginBtn}
          onPress={() => {
            router.navigate("/(auth)/LoginScreen");
          }}
        >
          <Text style={styles.LoginText}> Log in</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (errorMsgGasStations && currentUser)
    return (
      <View style={styles.viewNoUser}>
        <Text style={styles.textNoUser}>{errorMsgGasStations}</Text>
        <Text style={styles.textNoUser}>
          If the error persists Please Check your internet connection and try
          again
        </Text>
      </View>
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
  viewNoUser: {
    backgroundColor: Colors.lightColor.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  textNoUser: {
    fontSize: 16,
    fontFamily: "Outfit-Regular",
    color: "red",
  },
  LoginText: {
    color: Colors.lightColor.textButton,
    fontFamily: "Outfit-SemiBold",
  },
  LoginBtn: {
    backgroundColor: Colors.lightColor.tintColor,
    width: "40%",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
});

export default GasStationCards;
