import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface MyCheckboxProps {
  onValueChange: (newValue: boolean) => void;
  checked: boolean;
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({ onValueChange, checked }) => {
  const toggleCheckbox = () => {
    onValueChange(!checked); // Toggle the checked state and pass the new value
  };
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={toggleCheckbox}
    >
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#007bff",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007bff",
  },
});

export default MyCheckbox;
