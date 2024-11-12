import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Page not Found" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.subtitle}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontFamily: "Outfit-Bold",
    color: Colors.lightColor.text,
  },
  subtitle: {
    fontFamily: "Outfit-SemiBold",
    color: Colors.lightColor.text,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: Colors.lightColor.tintColor,
    fontFamily: "Outfit-Regular",
  },
});
