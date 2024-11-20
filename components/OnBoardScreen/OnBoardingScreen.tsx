import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "expo-router";
import Onboarding from "react-native-onboarding-swiper";
import { Feather, Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function OnBoardingScreen() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const handleDone = () => {
    if (currentUser) {
      router.navigate("/(tabs)/Home");
    } else {
      useEffect(() => {
        setTimeout(() => {
          router.navigate("/(auth)/RegisterScreen");
        }, 10000);
      }, []);
    }
  };
  const DoneBtn = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.Donebtn} {...props}>
        <Ionicons
          name="arrow-forward-circle-outline"
          size={48}
          color={Colors.lightColor.iconSelected}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        containerStyles={{ paddingHorizontal: 50 }}
        bottomBarHighlight={false}
        DoneButtonComponent={DoneBtn}
        titleStyles={{ fontFamily: "Outfit-SemiBold" }}
        subTitleStyles={{ fontFamily: "Outfit-Regular" }}
        pages={[
          {
            backgroundColor: Colors.lightColor.background,
            image: (
              <View style={styles.ImgContainer}>
                <Image
                  source={require("@/assets/images/tracking_gas_station.png")}
                  style={{ height: width * 1 }}
                />
              </View>
            ),
            title: "Tracking Realtime",
            subtitle:
              "PumpTracker keeps you updated with real-time information about gas station",
          },
          {
            backgroundColor: Colors.lightColor.background,

            image: (
              <View style={styles.ImgContainer1}>
                <Image
                  source={require("@/assets/images/saveTime_Tracking.png")}
                />
              </View>
            ),
            title: "Save your Time",
            subtitle:
              "With real-time information on nearby gas stations, up-to-date fuel prices, you can quickly find the best place to refuel without struggling",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightColor.background,
  },
  ImgContainer: {
    width: width * 1.1,
    height: width,
  },
  Donebtn: {
    paddingRight: 20,
  },
  ImgContainer1: {
    width: width * 1,
    height: width,
  },
});
