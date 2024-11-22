import { Link, useRouter } from "expo-router";
import { StyleSheet, ActivityIndicator, Image, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import React, { useEffect } from "react";
import { useAuth } from "@/context/useAuth";
import "react-native-get-random-values";
import OnBoardingScreen from "@/components/OnBoardScreen/OnBoardingScreen";

export default function Page() {
  // const router = useRouter();
  // const { currentUser } = useAuth();

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (currentUser) {
  //       router.navigate("/(tabs)/Home");
  //     } else {
  //       router.navigate("/");
  //     }
  //   }, 2000); // Show this screen for 2 seconds
  // }, []);

  return (
    <View style={styles.container}>
      <OnBoardingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightColor.background,
    padding: 50,
  },
});
