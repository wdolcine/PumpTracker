import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={Colors.lightColor.tintColor}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    paddingTop: 60,
    paddingLeft: 10,
    backgroundColor: Colors.lightColor.background,
    borderRadius: 5,
    width: 80,
  },
});
