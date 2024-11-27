import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBar } from "@/components/navigation/TabBar";
import { UserLocationProvider } from "@/context/UserLocationContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserLocationProvider>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="PumpList"
          options={{
            title: "Pumps",
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
          }}
        />
      </Tabs>
    </UserLocationProvider>
  );
}
