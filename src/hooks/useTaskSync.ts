import { useCallback, useEffect, useRef, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { getTasks as getTasksService } from "../services/taskService";
import { Task } from "../config/propTypes";

export const useTaskSync = (user: { uid: string } | null) => {
  const { getItem, setItem } = useLocalStorage<Task[]>("tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialMount = useRef(true);
  const prevStoredTasks = useRef<Task[]>([]);

  const mergeTasks = useCallback((local: Task[], fresh: Task[]): Task[] => {
    const merged = [...fresh];
    local.forEach((task) => {
      if (!merged.some((t) => t.id === task.id)) {
        merged.push(task);
      }
    });
    return merged;
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadTasks = async () => {
      try {
        const localTasks = getItem();
        if (
          localTasks &&
          JSON.stringify(localTasks) !== JSON.stringify(prevStoredTasks.current)
        ) {
          prevStoredTasks.current = localTasks;
          setTasks(localTasks);
          console.log("Loaded tasks from local storage:", localTasks);
        }

        if (isInitialMount.current) {
          const freshTasks = await getTasksService(user.uid);
          const merged = mergeTasks(localTasks || [], freshTasks as Task[]);
          prevStoredTasks.current = merged;
          setTasks(merged);
          setItem(merged);
          console.log(merged, getItem())
          isInitialMount.current = false;
        }
      } catch (err) {
        console.error("Failed to sync tasks:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [user, getItem, setItem, mergeTasks, tasks]);

  return { tasks, setTasks, setItem, isLoading };
};
