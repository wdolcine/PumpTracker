import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "./navigation/BackButton";
import { Colors } from "@/constants/Colors";

const PrivacyPolicy = () => {
  const router = useRouter();

  const openEmail = () => {
    Linking.openURL("mailto:pumptrackerinfo@gmail.com");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.heading}>Privacy Policy</Text>
      </View>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.subheading}>Privacy Policy for PumpTracker</Text>
        <Text style={styles.body}>
          At PumpTracker, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy outlines how we collect, use, and safeguard the information you
          provide to us when you use our mobile application.
        </Text>

        <Text style={styles.sectionHeading}>Information We Collect:</Text>
        <Text style={styles.listItem}>
          • Personal Information: When you sign up for an account with
          PumpTracker, we may collect personal information such as your name,
          email address, and location.
        </Text>
        <Text style={styles.listItem}>
          • Usage Information: We may collect information about how you interact
          with our app, including the features you use, the pages you visit, and
          the actions you take.
        </Text>
        <Text style={styles.listItem}>
          • Location Information: With your permission, we may collect and store
          information about your precise location using GPS technology to
          provide you with accurate results for nearby gas stations.
        </Text>

        <Text style={styles.sectionHeading}>How We Use Your Information:</Text>
        <Text style={styles.listItem}>
          • To Provide Services: We use the information we collect to provide
          you with the services and features offered by PumpTracker, including
          locating nearby gas stations, detailed gas stations informations
        </Text>
        <Text style={styles.listItem}>
          • To Improve Our App: We may use aggregated usage data to analyze
          trends, monitor the effectiveness of our features, and make
          improvements to our app.
        </Text>
        <Text style={styles.listItem}>
          • To Communicate with You: We may use your contact information to send
          you important updates, notifications, or marketing communications
          related to PumpTracker. You can opt out of receiving marketing
          communications at any time.
        </Text>

        <Text style={styles.sectionHeading}>Data Security:</Text>
        <Text style={styles.body}>
          We take the security of your information seriously and have
          implemented measures to protect it against unauthorized access,
          alteration, disclosure, or destruction. However, no method of
          transmission over the internet or electronic storage is 100% secure,
          and we cannot guarantee absolute security.
        </Text>

        <Text style={styles.sectionHeading}>Third-Party Services:</Text>
        <Text style={styles.body}>
          PumpTracker may integrate with third-party services or APIs to provide
          certain features, such as mapping services or payment processing.
          These third-party services may have their own privacy policies and
          terms of service, which we encourage you to review.
        </Text>

        <Text style={styles.sectionHeading}>
          Changes to This Privacy Policy:
        </Text>
        <Text style={styles.body}>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          material changes by posting the updated policy on our website or
          within the app.
        </Text>

        <Text style={styles.sectionHeading}>Contact Us:</Text>
        <Text style={styles.body}>
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at{" "}
          <Text style={styles.link} onPress={openEmail}>
            pumptrackerinfo@gmail.com
          </Text>
          .
        </Text>
        <Text style={styles.body}>
          By using PumpTracker, you agree to the terms of this Privacy Policy.
          If you do not agree with any aspect of this policy, please do not use
          the app.
        </Text>
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
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
    marginBottom: 0,
  },
  subheading: {
    fontSize: 18,
    fontFamily: "Outfit-SemiBold",
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
    marginVertical: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Outfit-Regular",
    marginBottom: 30,
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
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default PrivacyPolicy;
