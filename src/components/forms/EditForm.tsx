import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { TbSend2 } from "react-icons/tb";
import { FormButton } from "../buttons/TaskFormButtons";
import { EditFormProps, PriorityLevel } from "../../config/propTypes";
import { TaskFormTools } from "../utility-components/FormTools";
import useTasks from "../../hooks/useTasks";
import { useState } from "react";

const EditForm = ({
  onCancel,
  task
}: EditFormProps) => {
  const [value, setValue] = useState(task.content);
  const { updateTask } = useTasks();
    const [errMsg, setErrMsg] = useState("");
  const [priority, setPriority] = useState<PriorityLevel>("low");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = (id: string) => {
    console.log(value);

    const taskData = {
    content: value,
    priority,
    dueDate: dueDate || null,
  };

    if (!value.trim().length) {
      setErrMsg("Please enter new Task");
      return;
    }
    
    updateTask(id, taskData);
    onCancel();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.4, ease: "backInOut", type: "spring" }}
      className="w-full flex flex-col gap-2 items-end justify-between p-3"
    >
      {errMsg && <p className="text-sm text-red-500">{errMsg}</p>}
      <textarea
        rows={3}
        placeholder="Edit task..."
        value={value}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(task.id)}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 w-full text-sm focus:ring-2 focus:ring-offset-2 ring-indigo-100 text-gray-700 p-3 rounded-lg resize-none border-none outline-1 focus:outline-indigo-500 outline-gray-200 outline bg-neutral"
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
          label="Done"
          onClick={() => handleSubmit(task.id)}
          variant="submit"
        />
      </div>
    </motion.div>
  );
};

export default EditForm;
