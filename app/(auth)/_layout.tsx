import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
        <Stack.Screen
          name="ForgotPassWordScreen"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
}
