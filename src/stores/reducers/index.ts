import { combineReducers } from "@reduxjs/toolkit";
import rootStateReducer from "./root-state";
import taskReducer from "./task";

const rootReducer = combineReducers({
  rootState: rootStateReducer,
  task: taskReducer,
});

export default rootReducer;
