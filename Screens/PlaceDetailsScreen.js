import React from "react";

import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

import MapPreview from "../Components/MapPreview";

const PlaceDetailsScreen = (props) => {
  const placeId = props.navigation.getParam("placeId");
  const selectedPlace = useSelector((state) =>
    state.places.place.find((place) => place.id === placeId)
  );

  const selectedLocation = {
    lat: selectedPlace.lat,
    lng: selectedPlace.lng,
  };

  const fullMapViewHandler = () => {
    console.log("Inside showMapHandle..............................")
    props.navigation.navigate("Map", {
      readOnly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageURI }} style={styles.image} />
      <View style={styles.locationContainer}  >
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={fullMapViewHandler}
         
        />
      </View  >
    </ScrollView>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 10,
  },
  address: {
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailsScreen;
