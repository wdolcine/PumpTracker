import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  NativeSyntheticEvent,
  TargetedEvent,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface GasStationCardProps {
  title: string;
  address: string;
  status: "open" | "closed";
  onPress: () => void;
}

const GasStationCard: React.FC<GasStationCardProps> = ({
  title,
  address,
  status,
  onPress,
}) => {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      {/* Status icon (Green for open, Red for closed) */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: status === "open" ? "green" : "red" },
        ]}
      >
        <FontAwesome6
          name="gas-pump"
          size={24}
          color={Colors.lightColor.textButton}
          style={{ paddingTop: 5 }}
        />
      </View>

      {/* Station details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{address}</Text>
      </View>

      {/* Navigation Arrow */}
      <TouchableOpacity>
        <Ionicons
          name="navigate-circle-outline"
          size={34}
          color={Colors.lightColor.iconSelected}
        />
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: Colors.lightColor.background,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Outfit-Bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Outfit-Regular",
  },
});

export default GasStationCard;
