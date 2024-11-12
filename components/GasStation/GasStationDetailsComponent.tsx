import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import BackButton from "../navigation/BackButton";

interface PumpData {
  imageUrl: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  description: string;
  hours: { day: string; hours: string }[];
  amenities: { name: string; icon: string }[];
}

interface PumpDetailsProps {
  pumpData: PumpData;
}

export const GasStationDetailsComponent: React.FC<PumpDetailsProps> = ({
  pumpData,
}) => {
  return (
    <ScrollView style={styles.container}>
      <BackButton />
      {/* Header Image */}
      <Image source={{ uri: pumpData.imageUrl }} style={styles.headerImage} />

      {/* Station Name and Rating */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{pumpData.name}</Text>
        <Text style={styles.address}>{pumpData.address}</Text>
        <View style={styles.row}>
          <Text style={styles.rating}>
            {pumpData.rating} <Ionicons name="star" size={14} color="gold" />
          </Text>
          <Text style={styles.reviewCount}>
            ({pumpData.reviewCount} reviews)
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="navigate-circle-outline"
            size={35}
            color={Colors.lightColor.tintColor}
          />
          <Text style={styles.actionText}>Get Direction</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton1}>
          <Ionicons
            name="share-social"
            size={35}
            color={Colors.lightColor.tintColor}
          />
          <Text style={styles.actionText}>Share </Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionText}>{pumpData.description}</Text>
      </View>

      {/* Hours of Operation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opening Hours</Text>
        {pumpData.hours.map((day, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.textDay}>{day.day}</Text>
            <Text>{day.hours}</Text>
          </View>
        ))}
      </View>

      {/* Amenities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.amenities}>
          {pumpData.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityItem}>
              <Ionicons
                name="restaurant"
                size={20}
                color={Colors.lightColor.tintColor}
              />
              <Text>{amenity.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightColor.background,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  infoContainer: { padding: 15 },
  title: { fontSize: 20, fontFamily: "Outfit-Bold" },
  address: { marginVertical: 5, fontFamily: "Outfit-Regular" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  rating: { fontSize: 16, fontFamily: "Outfit-SemiBold" },
  reviewCount: { color: "gray", fontFamily: "Outfit-Regular" },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 15,
    marginStart: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 15,
  },
  actionButton1: {
    // backgroundColor: Colors.lightColor.tintColor,
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 15,
  },
  actionButtonOutline: {
    borderColor: Colors.lightColor.tintColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 35,
  },
  actionText: {
    color: Colors.lightColor.tintColor,
    fontFamily: "Outfit-Regular",
  },
  actionTextOutline: { color: Colors.lightColor.tintColor },
  section: { paddingHorizontal: 15, marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontFamily: "Outfit-Bold", marginBottom: 5 },
  sectionText: { color: "gray", fontFamily: "Outfit-Regular" },
  textDay: { paddingHorizontal: 5, fontFamily: "Outfit-Regular" },
  amenities: { flexDirection: "row", flexWrap: "wrap" },
  amenityItem: {
    width: "25%",
    alignItems: "center",
    marginVertical: 10,
    paddingRight: 10,
    fontFamily: "Outfit-Regular",
  },
});
