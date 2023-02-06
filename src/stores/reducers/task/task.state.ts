import type { Task } from "@/shared/type";

interface ITasksState {
  tasks: Task[];
}

const initialState = {
  tasks: [],
} satisfies ITasksState;

export type { ITasksState };
export default initialState;
