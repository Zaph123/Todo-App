import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { TbSend2 } from "react-icons/tb";
import { TaskFormProps, PriorityLevel, Task, ColumnType } from "../../config/propTypes";
import { FormButton } from "../buttons/TaskFormButtons";
import { useState, useEffect } from "react";
import { TaskFormTools } from "../utility-components/FormTools";
import useTasks from "../../hooks/useTasks";
import { serverTimestamp } from "firebase/firestore";
import { COLUMN_STYLES } from "../TodoBoard";

const TaskForm = ({ onCancel, initialColumn, addTask, tasks }: TaskFormProps) => {
  const [priority, setPriority] = useState<PriorityLevel>('low');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [newTask, setNewTask] = useState("");
  const [errMsg, setErrMsg] = useState("");
  

useEffect(() => {
    if (errMsg) {
      setTimeout(() => setErrMsg(""), 4000);
    }
  }, [errMsg]);

  const handleSubmit = async () => {
    // if (task.content) {
    //   setNewTask(task.content);
    // }

    // console.log(!task.content.trim(), !newTask.trim(), newTask);

    if (!newTask.trim()) {
      setErrMsg("Please enter a task!");
      return;
    }

    if (tasks.some((t) => t.content === newTask)) {
      setErrMsg("Task already exists!");
      return;
    }

    const newTaskData: Task = {
      id: Math.random().toString(36).substring(2, 9),
      userId: null,
      createdAt: serverTimestamp(),
      content: newTask,
      imgUrl: null,
      isDone: false,
      column: initialColumn as ColumnType,
      color: COLUMN_STYLES[initialColumn as ColumnType ?? "todo"].bg,
      priority: priority,
      dueDate: dueDate,
    };

    setErrMsg("");
    setNewTask("");
    onCancel()

    await addTask(newTaskData);
  };



  return (

    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5, y: 120 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 120 }}
      transition={{ duration: 0.4, ease: "backInOut", type: "spring" }}
      className="w-full flex flex-col gap-2 items-end justify-between"
    >
      {errMsg && <p className="text-sm text-red-500">{errMsg}</p>}
      <textarea
        rows={3}
        placeholder="New task..."
        value={newTask}
        autoFocus
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-1 w-full bg-indigo-100 text-sm focus:ring-2 focus:ring-offset-2 ring-indigo-100 text-gray-700 p-3 rounded-lg resize-none border-none outline-1 focus:outline-indigo-500 outline-gray-200 outline bg-neutral"
      />
      <TaskFormTools
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        autoProgress={false}
        selectedColumn={null}
        setSelectedColumn={() => {}}
        setAutoProgress={() => {}}
      />

      <div className="w-full flex items-center justify-between gap-5">
        <FormButton
          icon={<HiX />}
          label="Close"
          onClick={onCancel}
          variant="cancel"
        />
        <FormButton
          icon={<TbSend2 />}
          label="Add"
          onClick={handleSubmit}
          variant="submit"
        />
      </div>
    </motion.div>
  )
};


export { TaskForm };

