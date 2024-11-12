import { Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const TabBarBottom = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}) => {
  // Function to select the appropriate icon based on routeName
  const getIcon = (routeName: string, color: string) => {
    switch (routeName) {
      case "Home":
        return <Feather name="home" size={24} color={color} />;
      case "Search":
        return <Feather name="search" size={24} color={color} />;
      case "Profile":
        return <Feather name="user" size={24} color={color} />;
      case "PumpList":
        return <Feather name="list" size={24} color={color} />;
      default:
        return <Feather name="circle" size={24} color={color} />;
    }
  };
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.Tabbaritem}
    >
      {/* {icon.explore({
        color: isFocused
          ? Colors.light.tabIconSelected
          : Colors.light.tabIconDefault,
      })} */}
      <Animated.View style={animatedIconStyle}>
        {getIcon(routeName, color)}
      </Animated.View>

      <Animated.Text
        style={[
          {
            color: isFocused ? Colors.lightColor.tintColor : "#222",
            fontSize: 12,
            fontFamily: "Outfit-Regular",
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  Tabbaritem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
});
