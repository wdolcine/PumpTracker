import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import React from "react";
import MyMapView from "@/components/Map/MyMapView";

const Home: React.FC = () => {
  return (
    <KeyboardAvoidingView behavior="padding">
      <View>
        <MyMapView />
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    justifyContent: "center",
  },
  textStyle: {
    fontFamily: "Outfit-Bold",
    fontSize: 20,
  },
});

export default Home;
