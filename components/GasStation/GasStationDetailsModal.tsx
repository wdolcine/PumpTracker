import { Colors } from "@/constants/Colors";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import getRoute from "@/services/getRoute";
import {
  UserLocationContext,
  LocationContextType,
} from "@/context/UserLocationContext";
import { GEOAPIFY_API_KEY_Places_Details } from "@/constants/VariableConfigApi";
import { Feather } from "@expo/vector-icons";

interface GasStationDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  placeId: string | null;
  gasStationCoords: { lat: number; lon: number } | null;
}
const modes = ["drive", "walk", "motorcycle", "bicycle"];

const GasStationDetailsModal: React.FC<GasStationDetailsModalProps> = ({
  isVisible,
  onClose,
  placeId,
  gasStationCoords,
}) => {
  const [details, setDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const [selectedMode, setSelectedMode] = useState<string>("drive");
  const [errorMsgGsDetails, seterrorMsgGsDetails] = useState<
    string | undefined
  >(undefined);

  const userLocationContext = useContext(
    UserLocationContext
  ) as LocationContextType;
  const { latitude, longitude } = userLocationContext;

  useEffect(() => {
    if (placeId && gasStationCoords) {
      fetchPlaceDetails(placeId, gasStationCoords);
    }
  }, [placeId, gasStationCoords, selectedMode]);

  const fetchPlaceDetails = async (
    placeId: string,
    gasStationCoords: { lat: number; lon: number }
  ) => {
    setLoading(true);
    const url = `https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${GEOAPIFY_API_KEY_Places_Details}`;

    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0].properties;

        setDetails({
          name: feature.name || "Gas Station",
          address: feature.formatted || "N/A",
          rating: feature.rating || "N/A",
          open_now: feature.open_now || false,
          opening_hours: feature.opening_hours || [
            "No opening hours available",
          ],
          fuel_options: feature.fuel_options || {},
        });

        if (latitude && longitude) {
          const routeData = await getRoute(
            { latitude, longitude },
            { latitude: gasStationCoords.lat, longitude: gasStationCoords.lon },
            selectedMode
          );
          if (routeData) {
            setDistance(routeData.distance);
            setDuration(routeData.duration);
          }
        }
      } else {
        // console.error("No details found for the selected gas station.");
        seterrorMsgGsDetails("No details found for the selected gas station.");
        setDetails(null);
      }
    } catch (error) {
      // console.error("Error fetching gas station details:", error);
      seterrorMsgGsDetails(`Error fetching gas station details:${error}`);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const renderModeItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.modeButton,
        selectedMode === item && styles.selectedModeButton,
      ]}
      onPress={() => setSelectedMode(item)}
    >
      <Text
        style={[
          styles.modeText,
          selectedMode === item && styles.selectedModeText,
        ]}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  if (!placeId || errorMsgGsDetails) {
    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={Colors.lightColor.tintColor}
              />
            ) : (
              <Text>
                {errorMsgGsDetails
                  ? errorMsgGsDetails
                  : `${placeId}? Can't find details for ${placeId} : No placeId found`}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.lightColor.tintColor}
            />
          ) : details ? (
            <ScrollView style={styles.scrollView}>
              <TouchableOpacity onPress={onClose}>
                <Feather
                  name="x"
                  size={30}
                  style={styles.closeButton1}
                  color={Colors.lightColor.iconDefault}
                />
              </TouchableOpacity>

              <Text style={styles.stationName}>{details.name}</Text>
              <Text style={styles.detailText}>
                {" "}
                <Text style={styles.title}>Address: </Text>
                {details.address}
              </Text>
              <View style={styles.lines} />
              {/* {details.rating !== undefined && (
                <Text style={styles.detailText}>
                  {" "}
                  <Text style={styles.title}>Rating :</Text>
                  {details.rating}
                </Text>
              )} */}
              <Text style={styles.detailText}>
                <Text style={styles.title}>Open Now : </Text>
                {details.open_now ? "Yes" : "No"}
              </Text>
              <View style={styles.lines} />

              {details.opening_hours > 0 && (
                <View>
                  <Text style={styles.detailText}> Opening Hours: </Text>
                  {details.opening_hours.map((hour: string, index: number) => (
                    <Text key={index} style={styles.openingHourText}>
                      {hour}
                    </Text>
                  ))}
                </View>
              )}
              {details.fuel_options &&
              Object.keys(details.fuel_options).length > 0 ? (
                <View>
                  <Text style={styles.detailText}>
                    <Text style={styles.title}> Fuel Options:</Text>
                  </Text>
                  {Object.entries(details.fuel_options).map(
                    ([fuelType, isAvailable]) => (
                      <Text key={fuelType} style={styles.fuelOption}>
                        {fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}:{" "}
                        {isAvailable ? "Available" : "Not Available"}
                      </Text>
                    )
                  )}
                </View>
              ) : (
                <Text style={styles.detailText}>
                  {" "}
                  No fuel options available
                </Text>
              )}
              <View style={styles.lines} />
              <FlatList
                data={modes}
                renderItem={renderModeItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                style={styles.modeSelector}
              />
              <View style={styles.lines} />
              <Text style={styles.detailText}>
                <Text style={styles.title}>Distance:</Text>{" "}
                {distance ? `${distance.toFixed(2)} km` : "Calculating..."}
              </Text>
              <View style={styles.lines} />
              <Text style={styles.detailText}>
                <Text style={styles.title}>Duration:</Text>{" "}
                {duration ? `${duration.toFixed(0)} minutes` : "Calculating..."}
              </Text>
            </ScrollView>
          ) : (
            <Text style={styles.errorText}>No details available</Text>
          )}

          {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  lines: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    paddingTop: 5,
  },
  scrollView: {
    padding: 5,
  },
  stationName: {
    fontSize: 20,
    fontFamily: "Outfit-Bold",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Outfit-SemiBold",
    fontSize: 16,
    paddingTop: 10,
  },
  modeSelector: {
    marginVertical: 10,
  },
  modeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.lightColor.text,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedModeButton: {
    backgroundColor: Colors.lightColor.tintColor,
  },
  modeText: {
    color: Colors.lightColor.text,
  },
  selectedModeText: {
    color: "#fff",
  },
  fuelOption: {
    fontSize: 15,
    marginLeft: 10,
    fontFamily: "Outfit-Regular",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Outfit-Regular",
  },
  openingHourText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Outfit-Regular",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButton1: {
    position: "relative",
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Outfit-Regular",
  },
});

export default GasStationDetailsModal;
