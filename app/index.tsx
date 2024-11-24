import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import React, { useContext } from "react";
import "react-native-get-random-values";
import OnBoardingScreen from "@/components/OnBoardScreen/OnBoardingScreen";
import { useAuth } from "@/context/useAuth";
import Home from "./(tabs)/Home";

export default function Page() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <OnBoardingScreen />
      </View>
    );
  }

  return <Home />;
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
