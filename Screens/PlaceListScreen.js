import React, { useEffect } from "react";

import { StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../Components/CustomHeaderButton";

import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../Components/PlaceItem";
import * as PlaceActions from "../Store/Place-Actions";


const PlaceListScreen = (props) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.place);

  console.log(places);

  useEffect(() => {
    dispatch(PlaceActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageURI}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate("PlaceDetails", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

PlaceListScreen.navigationOptions = (navData) => {
  return {
    headerTittle: "List of Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add places"
          iconName="md-add"
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default PlaceListScreen;
