import React, { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useAuth } from "@/context/useAuth";
import { Colors } from "@/constants/Colors";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      router.replace("/"); // Redirect to onboarding if not logged in
    } else if (currentUser) {
      router.replace("/(tabs)/Home"); // Redirect to Home if logged in
    }
  }, [currentUser]);

  // Show a loading spinner while checking authentication
  if (currentUser === undefined) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.lightColor.tintColor} />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProtectedRoute;
