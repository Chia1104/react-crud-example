import { type FC, useState, useRef, type ChangeEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllTasks, updateTask, deleteTask, addTask } from "@/helpers/api";
import { TaskList, Input, type InputRef } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  handleGetTasks,
  handleUpdateTask,
  handleRemoveTask,
  handleAddTask,
} from "@/stores/reducers/task";
import { Button, Modal } from "@mui/material";
import { cn } from "@/utils";
import { z } from "zod";

const TitleSchema = z.string().min(4);

const Tasks: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useQuery(["tasks"], getAllTasks, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(handleGetTasks(data.items as any));
    },
  });
  const tasks = useAppSelector((state) => state.task.tasks);
  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation(
    updateTask,
    {
      onSuccess: (data) => {
        dispatch(handleUpdateTask(data.items[0] as any));
      },
    }
  );
  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteTask,
    {
      onSuccess: (data) => {
        dispatch(handleRemoveTask(data.items[0] as any));
      },
    }
  );
  return (
    <TaskList
      initialTasks={tasks}
      onComplete={mutateUpdate}
      onDelete={mutateDelete}
      isSuccess={isSuccess}
      isLoading={isLoading || isUpdating || isDeleting}
    />
  );
};

const TaskModal: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsValid(TitleSchema.safeParse(value).success);
  };
  const { mutate: mutateAdd, isLoading: isAdding } = useMutation(addTask, {
    onSuccess: (data) => {
      dispatch(handleAddTask(data.items[0] as any));
      setIsValid(false);
      setOpen(false);
    },
  });
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        className={cn(className)}
      >
        Add Task
      </Button>
      <Modal
        open={open}
        onClose={() => (isAdding ? null : setOpen(false))}
        className="flex justify-center items-center"
      >
        <div className="ctw-component-bg-secondary rounded-md w-full md:w-1/2 min-h-[150px] flex flex-col justify-center items-start p-5 gap-5">
          <h2 className="text-3xl">Add New Task</h2>
          <Input
            ref={inputRef}
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
              mutateAdd([
                {
                  title: inputRef.current?.getNativeInput().value ?? "",
                  completed: false,
                },
              ])
            }
            disabled={!isValid || isAdding}
          >
            Add Task
          </Button>
        </div>
      </Modal>
    </>
  );
};

const TaskPage: FC = () => {
  return (
    <div className="ctw-container flex flex-col gap-5">
      <h1 className="text-3xl my-10">Task</h1>
      <TaskModal className="self-end" />
      <Tasks />
    </div>
  );
};

export default TaskPage;
