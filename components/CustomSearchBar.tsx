import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { GEOAPIFY_API_KEY_AutoComplete } from "@/constants/VariableConfigApi";
import { router } from "expo-router";

interface Location {
  lat: number;
  lon: number;
}
interface CustomSearchBarProps {
  onLocationSelected: (location: Location) => void;
  disabled?: boolean;
  onClear?: () => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  onLocationSelected,
  disabled = false,
  onClear,
}) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    Array<{ name: string; place_id: string; lat: number; lon: number }>
  >([]);

  const handleClear = () => {
    onClear?.();
  };

  const fetchSuggestions = async (input: string) => {
    if (disabled || input.length < 3) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${GEOAPIFY_API_KEY_AutoComplete}`;

    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      const results = data.features.map((feature: any) => ({
        name: feature.properties.formatted,
        place_id: feature.properties.place_id,
        lat: feature.properties.lat,
        lon: feature.properties.lon,
      }));
      setSuggestions(results);
    } catch (error) {
      // console.error("Error fetching suggestions:", error);
      setQuery("Can't find location suggestions");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Ionicons
          name="location-sharp"
          size={24}
          color={Colors.lightColor.iconSelected}
          style={{ paddingTop: 10 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search Gas Station"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            fetchSuggestions(text);
            if (text === "") {
              handleClear();
            }
          }}
          // editable={!disabled}
          onPress={() => {
            if (disabled) {
              router.push("/(auth)/LoginScreen");
            }
          }}
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setQuery("");
              setSuggestions([]);
            }}
          >
            <Ionicons
              name="close-circle"
              size={24}
              color={Colors.lightColor.iconDefault}
              style={{ paddingTop: 10 }}
            ></Ionicons>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (!disabled) {
                onLocationSelected({ lat: item.lat, lon: item.lon });
                setQuery(item.name);
                setSuggestions([]);
              }
            }}
            style={styles.suggestionItem}
          >
            <Text style={styles.suggestionText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {disabled && (
        <Text style={styles.disabledMessage}>
          Login required to search locations.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 30,
    backgroundColor: Colors.lightColor.textButton,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    display: "flex",
  },
  container2: {
    flexDirection: "row",
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 5,
    // width: "95%",
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    // borderTopWidth: 0.1,
  },
  suggestionText: {
    fontSize: 16,
    fontFamily: "Outfit-Regular",
  },
  disabledMessage: {
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: "Outfit-Regular",
    color: "red",
    textAlign: "left",
  },
});

export default CustomSearchBar;
