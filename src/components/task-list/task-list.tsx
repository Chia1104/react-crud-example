import { type ChangeEvent, type FC, Fragment, useRef, useState } from "react";
import {
  Checkbox,
  Button,
  Divider,
  List,
  ListItem,
  CircularProgress,
  Modal,
} from "@mui/material";
import type { Task } from "@/shared/type";
import { DeleteTaskDto, UpdateTaskDto } from "@/shared/dto/task.dto";
import { cn } from "@/utils";
import { useAppDispatch } from "@/hooks";
import { handleUpdateTask } from "@/stores/reducers/task";
import { z } from "zod";
import { Input, InputRef } from "@/components";
import { updateTitle } from "@/helpers/api";
import { useMutation } from "@tanstack/react-query";

interface TaskListProps {
  initialTasks?: Task[];
  isLoading?: boolean;
  isSuccess?: boolean;
  onComplete?: (task: UpdateTaskDto[]) => void;
  onDelete?: (task: DeleteTaskDto[]) => void;
}

interface TaskItemProps {
  task: Task;
  onComplete?: (task: UpdateTaskDto[]) => void;
  onDelete?: (task: DeleteTaskDto[]) => void;
}

const TitleSchema = z.string().min(4);

const TaskItem: FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
  const label = { inputProps: { "aria-label": task.title } };
  const inputRef = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();
  const handleComplete = () => {
    onComplete?.([{ _uuid: task._uuid, completed: !task.completed }]);
  };
  const handleDelete = () => {
    onDelete?.([{ _uuid: task._uuid }]);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsValid(TitleSchema.safeParse(value).success);
  };
  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation(
    updateTitle,
    {
      onSuccess: (data) => {
        dispatch(handleUpdateTask(data as any));
        setIsValid(false);
        setOpen(false);
      },
    }
  );
  return (
    <>
      <ListItem>
        <span
          className={cn(
            "w-[90%] text-lg flex items-center",
            task?.completed && "line-through"
          )}
        >
          {task.title}
        </span>
        <Checkbox
          {...label}
          checked={task.completed}
          onChange={handleComplete}
        />
        <Button variant="text" onClick={() => setOpen(true)}>
          Edit
        </Button>
        <Button variant="text" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </ListItem>{" "}
      <Modal
        open={open}
        onClose={() => (isUpdating ? null : setOpen(false))}
        className="flex justify-center items-center"
      >
        <div className="ctw-component-bg-secondary rounded-md w-full md:w-1/2 min-h-[150px] flex flex-col justify-center items-start p-5 gap-5">
          <h2 className="text-3xl">Update Task</h2>
          <Input
            ref={inputRef}
            placeholder={task.title}
            onChange={handleChange}
            schema={TitleSchema}
            title="Title"
            titleClassName="text-2xl"
            error="At least 4 characters"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              mutateUpdate({
                id: task._uuid,
                task: {
                  title: inputRef.current?.getNativeInput().value ?? "",
                },
              })
            }
            disabled={!isValid || isUpdating}
          >
            Update Task
          </Button>
        </div>
      </Modal>
    </>
  );
};

const TaskList: FC<TaskListProps> = ({
  initialTasks = [],
  isLoading,
  isSuccess,
  onComplete,
  onDelete,
}) => {
  return (
    <List className="flex flex-col w-full gap-3 ctw-component-bg-secondary rounded-md shadow shadow-2xl min-h-[100px] justify-center relative overflow-hidden">
      {isLoading && (
        <div className="flex justify-center items-center h-full w-full absolute z-30 top-0 ctw-component-bg-secondary">
          <CircularProgress />
        </div>
      )}
      {isSuccess &&
        initialTasks?.map((task, index) => (
          <Fragment key={task._uuid}>
            <TaskItem task={task} onComplete={onComplete} onDelete={onDelete} />
            {initialTasks.length > 1 && index !== initialTasks.length - 1 && (
              <Divider />
            )}
          </Fragment>
        ))}
      {initialTasks?.length === 0 && (
        <div className="w-full px-5">
          <p>It seems like you don't have any tasks yet. Click on the button</p>
        </div>
      )}
    </List>
  );
};

export default TaskList;
export type { TaskListProps, TaskItemProps };
export { TaskItem };
