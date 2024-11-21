import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { GEOAPIFY_API_KEY_Places_Details } from "@/constants/VariableConfigApi";

interface GasStationDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  placeId: string | null;
}

const GEOAPIFY_API_KEY = "57e75487a30840208d19ba28227d9fd1";

const GasStationDetailsModal: React.FC<GasStationDetailsModalProps> = ({
  isVisible,
  onClose,
  placeId,
}) => {
  const [details, setDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (placeId) {
      fetchPlaceDetails(placeId);
    }
  }, [placeId]);

  const fetchPlaceDetails = async (placeId: string) => {
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
        console.log("API Response:", data.features[0].properties);
      } else {
        console.error("No details found for the selected gas station.");
        setDetails(null);
      }
    } catch (error) {
      console.error("Error fetching gas station details:", error);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  if (!placeId) return null;

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
            <ScrollView>
              <Text style={styles.stationName}>{details.name}</Text>
              <Text style={styles.detailText}>
                {" "}
                <Text style={styles.title}>Address: </Text>
                {details.address}
              </Text>
              {details.rating !== undefined && (
                <Text style={styles.detailText}>
                  {" "}
                  <Text style={styles.title}>Rating :</Text>
                  {details.rating}
                </Text>
              )}
              <Text style={styles.detailText}>
                <Text style={styles.title}> Open Now : </Text>
                {details.open_now ? "Yes" : "No"}
              </Text>
              {details.opening_hours > 0 && (
                <View>
                  <Text style={styles.detailText}>Opening Hours:</Text>
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
            </ScrollView>
          ) : (
            <Text style={styles.errorText}>No details available</Text>
          )}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
  stationName: {
    fontSize: 20,
    fontFamily: "Outfit-Bold",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Outfit-SemiBold",
  },

  fuelOption: {
    fontSize: 15,
    // color: "#555",
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
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Outfit-Regular",
  },
});

export default GasStationDetailsModal;
