import { useAuthUser } from "./useAuthUser";
import { useTaskSync } from "./useTaskSync";
import { useTaskActions } from "./useTaskActions";

export const useTasks = () => {
  const user = useAuthUser();
  const { tasks, setTasks, setItem, isLoading } = useTaskSync(user);
  const {
    addTask,
    updateTask,
    deleteTask,
    isAdding,
    isUpdating,
    isDeleting,
  } = useTaskActions(tasks, setTasks, setItem, user);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    isLoading,
    isAdding,
    isUpdating,
    isDeleting,
  };
};
export default useTasks;