import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import BackButton from "./navigation/BackButton";
import { Colors } from "@/constants/Colors";

const About = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.heading}>About</Text>
      </View>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.subheading}>
          About PumpTracker: Your Fuel Companion
        </Text>
        <Text style={styles.body}>
          Welcome to PumpTracker, your ultimate companion for finding the
          nearest gas stations and tracking fuel prices with ease. Whether
          you're planning a long road trip or just need to refuel on your daily
          commute, PumpTracker has got you covered.
        </Text>
        <Text style={styles.body}>
          At PumpTracker, we understand the importance of convenience and
          affordability when it comes to fueling up your vehicle. That's why
          we've developed an intuitive mobile app that puts the power of
          information at your fingertips.
        </Text>
        <Text style={styles.body}>With PumpTracker, you can:</Text>
        <Text style={styles.listItem}>
          • Find Nearby Gas Stations: Our app utilizes GPS technology to locate
          the nearest gas stations wherever you are. Whether you're in the heart
          of the city or out in the countryside, PumpTracker will help you find
          the closest options for filling up your tank.
        </Text>
        <Text style={styles.listItem}>
          • Check availabality: PumTracker make it easy for you to know which
          kind of fuel available, with details about each gas stations feature
          will help find out which gas station to go for.
        </Text>
        <Text style={styles.body}>
          At PumpTracker, our mission is to make your fueling experience as
          seamless and stress-free as possible. Download PumpTracker today and
          take control of your fueling needs like never before. Happy driving!
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/privacy")}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightColor.background,
    padding: 15,
    height: "100%",
  },
  header: {
    backgroundColor: "#f9f9f9",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#0000",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10,
  },
  scrollContent: {
    padding: 30,
  },
  heading: {
    fontSize: 28,
    fontFamily: "Outfit-Bold",
    textAlign: "center",
    marginBottom: 0,
  },
  subheading: {
    fontSize: 18,
    fontFamily: "Outfit-SemiBold",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 30,
    fontFamily: "Outfit-Regular",
    color: "#333333",
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    fontFamily: "Outfit-Regular",
    color: "#333333",
    paddingLeft: 10,
  },
  linkContainer: {
    marginBottom: 50,
  },
  linkText: {
    color: "#007BFF",
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
  },
});

export default About;
