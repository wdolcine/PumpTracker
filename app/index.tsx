import { Link, useRouter } from "expo-router";
import { StyleSheet, ActivityIndicator, Image, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import React, { useEffect } from "react";
import "react-native-get-random-values";

export default function Page() {
  // const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.navigate("/(auth)/LoginScreen"); // Navigate to the next splash screen
  //   }, 10000); // Show this screen for 2 seconds
  // }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/icon.png")}
        style={{ height: 330, width: 330 }}
      />
      <Link href="../(tabs)/Home">Home</Link>
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
