import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { googlePlaceAutoCompleteId } from "@/constants/VariableConfigApi";
import axios from "axios";

// Define the props interface with the correct type for searchedLocation
interface SearchBarProps {
  onLocationSelected: (location: { lat: number; lng: number }) => void;
}

const fetchDetailsPlace = async (placeId: string) => {
  const options = {
    method: "GET",
    url: "https://google-place-autocomplete-and-place-info.p.rapidapi.com/maps/api/place/details/json",
    params: { place_id: placeId },
    headers: {
      "x-rapidapi-key": "87abf5d295msh20298c5e7f80999p14eb62jsn48e74a768ff8",
      "x-rapidapi-host":
        "google-place-autocomplete-and-place-info.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Place Details: ", response.data);
    return response.data.result.geometry.location;
  } catch (error) {
    console.error("Fetching place details error", error);
    return null;
  }
};

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelected }) => {
  return (
    <View style={styles.seachContainer}>
      <Ionicons
        name="location-sharp"
        size={24}
        color={Colors.lightColor.iconSelected}
        style={{ paddingTop: 10 }}
      />
      {/* <GooglePlacesAutocomplete
        placeholder="Search Gas Station"
        fetchDetails={false}
        onPress={(data) => {
          // 'details' is provided when fetchDetails = true
          // if (details?.geometry.location) {
          //   searchedLocation(details.geometry.location);
          // }
          fetchDetailsPlace(data.place_id).then((location) => {
            if (location) {
              onLocationSelected(location);
            } else {
              console.log("No location data found!!!");
            }
          });
        }}
        query={{
          key: "87abf5d295msh20298c5e7f80999p14eb62jsn48e74a768ff8", // Key for RapidAPI
          language: "en",
        }}
        requestUrl={{
          url: "https://google-place-autocomplete-and-place-info.p.rapidapi.com/maps/api/place/autocomplete/json",
          useOnPlatform: "all",
          headers: {
            "x-rapidapi-key":
              "87abf5d295msh20298c5e7f80999p14eb62jsn48e74a768ff8",
            "x-rapidapi-host":
              "google-place-autocomplete-and-place-info.p.rapidapi.com",
          },
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  seachContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 5,
    backgroundColor: Colors.lightColor.textButton,
    borderRadius: 6,
  },
});

export default SearchBar;
