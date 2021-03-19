import { ADD_PLACE,SET_PLACES } from "./Place-Actions";
import Place from "../Model/Place";

const initialState = {
  place: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
   case SET_PLACES:

   return {
     place : actions.places.map(place => new Place(place.id.toString(), place.title, place.imageURI,place.address,place.lat,place.lng) )
   }

    case ADD_PLACE:
      const newPlaces = new Place(
        actions.placeData.id.toString(),
        actions.placeData.title,
        actions.placeData.imageURI,
        actions.placeData.address,
        actions.placeData.lat,
        actions.placeData.lng

      );
      console.log("inside reducer ");
      return {
        place: state.place.concat(newPlaces),
      };

    default:
      return state;
  }
};
