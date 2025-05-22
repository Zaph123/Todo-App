import { useCallback, useState } from "react";
import { addTask as addTaskService, deleteTask as deleteTaskService, updateTask as updateTaskService } from "../services/taskService";
import { Task } from "../config/propTypes";

export const useTaskActions = (
  tasks: Task[],
  setTasks:  React.Dispatch<React.SetStateAction<Task[]>>,
  setItem: (tasks: Task[]) => void,
  user: { uid: string } | null
) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const addTask = useCallback(async (task: Task) => {
    setIsAdding(true);
    if (!user) return;

    const tempId = `temp-${Math.random().toString(36).substring(2, 9)}`;
    const tempTask = { ...task, id: tempId, userId: user.uid };

    setTasks(prev => {
      const updated = [...prev, tempTask];
      setItem(updated);
      return updated;
    });

    try {
      const { id, ...taskWithoutId } = tempTask;
      const docRef = await addTaskService(taskWithoutId);
      const permanentId = docRef.id;

      setTasks(prev => {
        const updated = [...prev.filter(t => t.id !== tempId), { ...tempTask, id: permanentId }];
        setItem(updated);
        return updated;
      });

      return permanentId;
    } catch (err) {
      setTasks(prev => prev.filter(t => t.id !== tempId));
      setItem(tasks.filter(t => t.id !== tempId));
      throw err;
    } finally {
      setIsAdding(false);
    }
  }, [user, tasks, setItem, setTasks]);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    setIsUpdating(true);
    setTasks(prev => {
      const updated = prev.map(task => task.id === id ? { ...task, ...updates } : task);
      setItem(updated);
      return updated;
    });

    try {
      await updateTaskService(id, updates);
    } catch (err) {
      console.error("Failed to update task:", err);
    } finally {
      setIsUpdating(false);
    }
  }, [setTasks, setItem]);

  const deleteTask = useCallback(async (id: string) => {
    setIsDeleting(true);
    setTasks(prev => {
      const updated = prev.filter(task => task.id !== id);
      setItem(updated);
      return updated;
    });

    try {
      await deleteTaskService(id);
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setIsDeleting(false);
    }
  }, [setTasks, setItem]);

  return { addTask, updateTask, deleteTask, isAdding, isUpdating, isDeleting };
};
