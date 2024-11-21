import { View, KeyboardAvoidingView } from "react-native";
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

export default Home;
