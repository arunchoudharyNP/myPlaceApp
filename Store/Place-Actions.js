export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces } from "../Helper/db";

import env from "../env";

export const addPlace = (title, imageURI, pickedLocation) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://apis.mapmyindia.com/advancedmaps/v1/${env.mapMyIndiaKey}/rev_geocode?lat=${pickedLocation.lat}&lng=${pickedLocation.lng}`
    );

    const resData = await response.json();
    console.log(resData);
    const Address =resData.results[0].formatted_address;

    const fileName = imageURI.split("/").pop();
    console.log(fileName);
    const newPath = FileSystem.documentDirectory + fileName;
    console.log(newPath);

    try {
      await FileSystem.moveAsync({
        from: imageURI,
        to: newPath,
      });

      const result = await insertPlace(
        title,
        newPath,
        Address,
        pickedLocation.lat,
        pickedLocation.lng
      );
      console.log(result);

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: result.insertId,
          title: title,
          imageURI: newPath,
          address:Address,
          lat: pickedLocation.lat,
          lng: pickedLocation.lng,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    const dbResult = await fetchPlaces();
    console.log(dbResult);

    dispatch({ type: SET_PLACES, places: dbResult.rows._array });
  };
};
