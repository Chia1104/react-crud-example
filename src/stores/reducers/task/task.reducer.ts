import type { ITasksState } from "./task.state";

const taskReducer = {
  handleGetTasks: (state: ITasksState, action: any) => {
    state.tasks = action.payload;
  },
  handleAddTask: (state: ITasksState, action: any) => {
    state.tasks.push(action.payload);
  },
  handleRemoveTask: (state: ITasksState, action: any) => {
    state.tasks = state.tasks.filter(
      (task) => task._uuid !== action.payload._uuid
    );
  },
  handleUpdateTask: (state: ITasksState, action: any) => {
    state.tasks = state.tasks.map((task) => {
      if (task._uuid === action.payload._uuid) {
        return action.payload;
      }
      return task;
    });
  },
};

export default taskReducer;
