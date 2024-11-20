// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { UserLocationProvider } from "@/context/UserLocationContext";
import { useAuth } from "@/context/useAuth";
import { ThemeProvider } from "@/hooks/themeContext";
import { AuthProvider } from "@/context/AuthContext";
import { FetchGasStationsProvider } from "@/services/fetchGasStations";
import ProtectedRoute from "@/components/navigation/ProtectedRoute";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
          "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
          "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
        });
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Error loading fonts or hiding splash screen:", error);
      }
    };
    loadFonts();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.Themedview}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <UserLocationProvider>
          <FetchGasStationsProvider>
            <ProtectedRoute>
              <AppNavigation />
            </ProtectedRoute>
          </FetchGasStationsProvider>
          <StatusBar style="dark" />
        </UserLocationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
const AppNavigation = () => {
  const { currentUser } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {currentUser ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
const styles = StyleSheet.create({
  Themedview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
