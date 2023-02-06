import { UUID } from "@/shared/type";

export interface Task {
  _created: number;
  _data_type: string;
  _is_deleted: boolean;
  _modified: number;
  _self_link: string;
  _user: UUID;
  _uuid: UUID;
  completed: boolean;
  title: string;
}
