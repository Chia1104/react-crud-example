import { type FC } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllTasks } from "@/helpers/api";

const TaskPage: FC = () => {
  const { data, isLoading, isSuccess } = useQuery(["tasks"], getAllTasks, {
    refetchOnWindowFocus: false,
  });
  return (
    <div className="ctw-container">
      <h1>Task</h1>
      {isSuccess &&
        data.items.map((task) => (
          <div key={task._uuid}>
            <h2>{task.title}</h2>
          </div>
        ))}
    </div>
  );
};

export default TaskPage;
