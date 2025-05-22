import { AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";
import { ColumnType, TaskListProps } from "../config/propTypes";
import { useState } from "react";
import useTasks from "../hooks/useTasks";

const TaskList = ({ tasks }: TaskListProps) => {
  const [currentTaskId, setCurrentTaskId] = useState("");
  const [edit, setEdit] = useState(false);
const { deleteTask, updateTask } = useTasks();

  const toggleEditForm = (id: string) => {
    setCurrentTaskId(id);
    setEdit(!edit);
  };

  const handleDeleteTask = async (id: string) => {
    if (deleteTask) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };

  const handleMarkAsDone = (id: string) => {
      updateTask(id, { column: "done" as ColumnType });
    };

  return (
    <div className="w-full max-h-[500px] overflow-y-auto space-y-2 pr-2">
      <AnimatePresence>
        {tasks.map((task, i) => (
          <TaskCard
            key={i}
            task={task}
            isEditing={edit && task.id === currentTaskId}
            toggleEditForm={() => toggleEditForm(task.id)}
            handleDeleteTask={handleDeleteTask}
            handleMarkAsDone={handleMarkAsDone}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
