import React, { useState, useCallback } from "react";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

import { useDispatch } from "react-redux";

import * as PlaceActions from "../Store/Place-Actions";
import ImgPicker from "../Components/ImgPicker";
import LocationPicker from "../Components/LocationPicker";

const NewPlaceScreen = (props) => {
  const [placeTitle, setPlaceTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();

  const [img, setImg] = useState("");

  const imageTakenHandler = (imagePath) => {
    setImg(imagePath);
  };

  const locationTakenHandler = (location) => {
    console.log("location fetched in NewPlaceScreen  " + location);
  };
  const setLocationHandler = useCallback(
    (location) => {
      console.log(location + " Picked Location ");
      setPickedLocation(location);
    },
    [setPickedLocation]
  );

  const dispatch = useDispatch();

  const textChangeHandler = (text) => {
    setPlaceTitle(text);
  };

  const saveButtonHandler = () => {
    console.log("Action Received " + img);
    dispatch(PlaceActions.addPlace(placeTitle, img, pickedLocation));
    props.navigation.navigate("Place");
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={textChangeHandler}
            value={placeTitle}
          />
        </View>

        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          onLocationTaken={locationTakenHandler}
          navigation={props.navigation}
          onLocationPicked={setLocationHandler}
        />

        <Button title="Save Place" color="orange" onPress={saveButtonHandler} />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 30,
    marginVertical: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  title: {
    fontSize: 30,
    paddingVertical: 10,
  },
});

export default NewPlaceScreen;
