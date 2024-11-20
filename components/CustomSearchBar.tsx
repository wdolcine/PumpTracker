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

interface Location {
  lat: number;
  lon: number;
}
const GEOAPIFY_API_KEY: string = "a5f4346a71ce42538e5a627d2f4cf6f3";

interface CustomSearchBarProps {
  onLocationSelected: (location: Location) => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  onLocationSelected,
}) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    Array<{ name: string; place_id: string; lat: number; lon: number }>
  >([]);

  const fetchSuggestions = async (input: string) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }
    const clearSearch = () => {
      setQuery("");
      setSuggestions([]);
    };

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${GEOAPIFY_API_KEY}`;

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
      console.error("Error fetching suggestions:", error);
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
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onLocationSelected({ lat: item.lat, lon: item.lon });
              setQuery(item.name);
              setSuggestions([]); // Clear suggestions after selection
            }}
            style={styles.suggestionItem}
          >
            <Text style={styles.suggestionText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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
    display: "flex",
  },
  container2: {
    flexDirection: "row",
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    // borderTopWidth: 0.1,
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default CustomSearchBar;
