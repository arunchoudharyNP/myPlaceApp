

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import PlaceListScreen from "../Screens/PlaceListScreen";
import NewPlaceScreen from "../Screens/NewPlaceScreen";
import PlaceDetailsScreen from "../Screens/PlaceDetailsScreen";
import MapScreen from "../Screens/MapScreen";

const PlaceNavigator = createStackNavigator(
  {
    Place: PlaceListScreen,
    NewPlace: NewPlaceScreen,
    PlaceDetails: PlaceDetailsScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {

        headerStyle:{
          backgroundColor :'#A6E53F'
        },
        headerTintColor : 'white'
    },
  }
);

export default  createAppContainer(PlaceNavigator);
