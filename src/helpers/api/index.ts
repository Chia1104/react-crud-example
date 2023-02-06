import { API_KEY } from "@/shared/constants";
import type { Task, UUID } from "@/shared/type";
import {
  AddTaskDto,
  UpdateTaskDto,
  DeleteTaskDto,
} from "@/shared/dto/task.dto";

/**
 * @description
 * Use custom API to fetch data instead of using the `crud.co.uk` API.
 */
const API = new URL("https://chia-stack-web.vercel.app/api/task");

const getAllTasks = async (): Promise<{
  items: Task[];
}> => {
  const response = await fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return await response.json();
};

const addTask = async (
  task: AddTaskDto
): Promise<{
  items: Task[];
}> => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(task),
  });
  return await response.json();
};

const updateTask = async (
  task: UpdateTaskDto
): Promise<{
  items: Task[];
}> => {
  const response = await fetch(API, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(task),
  });
  return await response.json();
};

const deleteTask = async (
  task: DeleteTaskDto
): Promise<{
  items: Task[];
}> => {
  const response = await fetch(API, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(task),
  });
  return await response.json();
};

export { getAllTasks, addTask, updateTask, deleteTask };
