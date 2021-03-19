import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapPreview from "./MapPreview";


const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.navigation.getParam("saveLoc");
  const { onLocationPicked } = props;
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    console.log(status);

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Please allow following permissions to continue",
        [{ text: "Okay" }]
      );

      return false;
    }
    return true;
  };

  const onLocationHandler = async () => {
    const hasPermissions = await verifyPermission();

    if (!hasPermissions) {
      setIsFetching(false);
      return;
    }
    try {
      setIsFetching(true);
      const fetchLocation = await Location.getCurrentPositionAsync({
        timeout: 8000,
      });
      props.onLocationTaken(fetchLocation);
      setPickedLocation({
        lat: fetchLocation.coords.latitude,
        lng: fetchLocation.coords.longitude,
      });
      props.onLocationPicked({
        lat: fetchLocation.coords.latitude,
        lng: fetchLocation.coords.longitude,
      });

      console.log(fetchLocation);
    } catch (error) {
      throw (
        (new Error(error),
        Alert.alert(
          "Could not found loaction",
          "Please try again later or choose from map ",
          [{ text: "Okay" }]
        ))
      );
    }
    setIsFetching(false);
  };

  const onPickHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationContainer}>
      <MapPreview
        location={pickedLocation}
        style={styles.locationPreview}
        saveLoc={props.saveLoc}
      >
        {isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text> No location Chosen yet!</Text>
        )}
      </MapPreview>

      <View style={styles.actions}>
        <Button title="Get User Location" onPress={onLocationHandler} />
        <Button title="Pick your Location" onPress={onPickHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    marginBottom: 15,
  },

  locationPreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
