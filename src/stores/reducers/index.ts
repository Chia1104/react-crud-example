import { combineReducers } from "@reduxjs/toolkit";
import rootStateReducer from "./root-state";

const rootReducer = combineReducers({
  rootState: rootStateReducer,
});

export default rootReducer;
