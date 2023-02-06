import type { UUID } from "@/shared/type";

export interface AddTaskDto {
  title: string;
  completed: boolean;
}

export interface UpdateTaskDto {
  _uuid: UUID;
  completed: boolean;
}

export interface DeleteTaskDto {
  _uuid: UUID;
}
