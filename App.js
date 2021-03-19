import React from "react";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { default as ReduxThunk } from "redux-thunk";

import {enableScreens } from 'react-native-screens';

import PlaceNavigator from "./Navigations/PlaceNavigator";
import PlaceReducer from "./Store/Place-Reducer";
import init from "./Helper/db";


init()
  .then(() => {
    console.log("DB Initialized");
  })
  .catch((err) => {
    console.log("DB initialization failed " + err);
  });

const rootReducer = combineReducers({
  places: PlaceReducer,
});

enableScreens();

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlaceNavigator />
    </Provider>
  );
}
