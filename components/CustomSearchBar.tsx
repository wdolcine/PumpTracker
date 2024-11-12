import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

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

  //   const fetchPlaceDetails = async (placeId: string) => {
  //     const options = {
  //       method: "GET",
  //       url: "https://geoapify-address-autocomplete.p.rapidapi.com/v1/geocode/autocomplete",
  //       params: { place_id: placeId },
  //       headers: {
  //         "x-rapidapi-key": "87abf5d295msh20298c5e7f80999p14eb62jsn48e74a768ff8",
  //         "x-rapidapi-host": "geoapify-address-autocomplete.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await axios.request(options);
  //       const location = response.data.result.geometry.location;
  //       onLocationSelected(location); // Pass location to the parent component
  //       setSuggestions([]); // Clear suggestions after selecting
  //       setQuery(""); // Clear query after selecting
  //     } catch (error) {
  //       console.error("Error fetching place details:", error);
  //     }
  //   };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a place"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          fetchSuggestions(text);
        }}
      />
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
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default CustomSearchBar;
