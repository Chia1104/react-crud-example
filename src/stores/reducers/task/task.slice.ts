import { createSlice } from "@reduxjs/toolkit";
import taskState from "./task.state";
import taskReducer from "./task.reducer";
import { type AppState } from "../../type";

const taskSlice = createSlice({
  name: "task",
  initialState: taskState,
  reducers: taskReducer,
});

const { handleGetTasks, handleAddTask, handleRemoveTask, handleUpdateTask } =
  taskSlice.actions;

const taskSelector = (state: AppState) => state.task;

export {
  taskSelector,
  handleGetTasks,
  handleAddTask,
  handleRemoveTask,
  handleUpdateTask,
};
export default taskSlice.reducer;
