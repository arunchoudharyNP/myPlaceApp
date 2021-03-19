import React, { useState, useCallback, useEffect } from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = (props) => {
  const [pickedLocation, setPickedLocation] = useState();

  const initialLocation = props.navigation.getParam("initialLocation");
  const readOnly = props.navigation.getParam("readOnly");

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 28.685396143791134,
    longitude: initialLocation ? initialLocation.lng : 77.3458619043231,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const pickedLocationHandler = (event) => {
    if (readOnly) {
      return;
    }

    setPickedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const saveHandler = useCallback(() => {
    if (!pickedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", {
      saveLoc: pickedLocation,
    });
    // props.navigation.goBack();
  }, [pickedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveFn: saveHandler });
  }, [saveHandler]);

  let markerCoordinate;

  if(pickedLocation ){
    markerCoordinate = {
      latitude:  pickedLocation.lat,
      longitude:  pickedLocation.lng,
    };
    console.log('Marker Coordinate' +markerCoordinate.latitude);
  }
  

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={pickedLocationHandler}
    >
      {pickedLocation && (
        <Marker title="Picked Location" coordinate={markerCoordinate}></Marker>
      )}
      {initialLocation && (
        <Marker title="Picked Location" coordinate={{latitude:initialLocation.lat, longitude:initialLocation.lng}}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveLocation = navData.navigation.getParam("saveFn");
  const readOnly = navData.navigation.getParam("readOnly");
  if (readOnly) {
    return {
      headerTitle: "Map Screen",
    };
  }

  return {
    headerTitle: "Map Screen",
    headerRight: () => (
      <TouchableOpacity style={styles.buttonContainer} onPress={saveLocation}>
        <Text style={styles.button}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  button: {
    fontSize: 22,
    color: "white",
  },
});

export default MapScreen;
