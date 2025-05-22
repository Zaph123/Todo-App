import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { TbSend2 } from "react-icons/tb";
import {
  GeneralFormProps,
  ColumnType,
  PriorityLevel,
  Task,
} from "../../config/propTypes";
import { FormButton } from "../buttons/TaskFormButtons";
import { useState } from "react";
import { TaskFormTools } from "../utility-components/FormTools";
import { COLUMN_STYLES } from "../TodoBoard";
import useTasks from "../../hooks/useTasks";
import { serverTimestamp } from "firebase/firestore";

const GeneralForm = ({
  onCancel,
  initialColumn = "todo",
}: GeneralFormProps) => {
  const [priority, setPriority] = useState<PriorityLevel>("low");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [autoProgress, setAutoProgress] = useState(false);
  const [selectedColumn, setSelectedColumn] =
    useState<ColumnType>(initialColumn);
    const [newTask, setNewTask] = useState("");
    const [errMsg, setErrMsg] = useState("");
 const { tasks, addTask } = useTasks();

    const handleSubmit = async () => {
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
          column: autoProgress ? "in progress" : selectedColumn,
          color: COLUMN_STYLES[initialColumn as ColumnType ?? "todo"].bg,
          priority: priority,
          dueDate: dueDate,
        };
    
        setErrMsg("");
        setNewTask("");
        // onCancel()
    
        await addTask(newTaskData);
      };


  return (
    <div className="z-50 bottom-5 left-0 p-5 fixed w-full flex items-center justify-center">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5, y: 120 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 120 }}
        transition={{ duration: 0.4, ease: "backInOut", type: "spring" }}
        className="w-full max-w-[700px] flex flex-col gap-3 items-end justify-between bg-white p-5 rounded-3xl shadow-sm"
      >
        <div className="w-full space-y-3">
          {/* Task Content Input */}
          {errMsg && <p className="text-sm text-red-500">{errMsg}</p>}
          <input
            placeholder="New task..."
            value={newTask}
            autoFocus
            type="text"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full h-14 text-sm text-gray-700 p-3 outline-none focus:border-b-2 focus:border-b-indigo-500"
          />
        </div>

        <div className="flex w-full items-center justify-between md:flex-wrap">
          {/* Task Options */}
          <TaskFormTools
            priority={priority}
            setPriority={setPriority}
            dueDate={dueDate}
            setDueDate={setDueDate}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            autoProgress={autoProgress}
            setAutoProgress={setAutoProgress}
          />
        <div className="flex items-center justify-between gap-5">
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
            disabled={!newTask.trim()}
          />
        </div>
        </div>
        {/* Form Actions */}
      </motion.div>
    </div>
  );
};

export default GeneralForm;
