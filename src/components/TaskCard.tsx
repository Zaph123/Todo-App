import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { LuClock } from "react-icons/lu";
import { TaskCardProps } from "../config/propTypes";
import { TodoActionsDropdown } from "./buttons/TaskFormButtons";
import EditForm from "./forms/EditForm";
import { formatDate } from "../utilis/formatDate";

// ========== TASK CARD COMPONENT ==========
const TaskCard = ({
  task,
  isEditing,
  toggleEditForm,
  handleDeleteTask,
  handleMarkAsDone
}: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [completed, setCompleted] = useState(task.isDone);
  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // if (e.key === "Enter" && isHovered) {
      //   console.log("clicked enter key")
      //   toggleEditForm(task?.id);
      //   // handleSubmit()
      // }
      if (e.key === "Delete" && isHovered) handleDeleteTask(task?.id);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered]);

 

  // Toggle task completion
  const toggleCompletion = () => {
    setCompleted(!completed);
    if (!completed) {
      handleMarkAsDone(task?.id);
    }
  };

    
  // Priority color mapping
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return isEditing ? (
    <EditForm
      task={task}
      onCancel={() => toggleEditForm(task.id)}
    />
  ) : (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0, y: 100 }}
      layout
      layoutId={task?.id}
      draggable={isHovered}
      transition={{ duration: 0.4, ease: "backInOut", type: "spring" }}
      className={`rounded-xl cursor-pointer active:cursor-grab relative flex flex-col gap-3 justify-around text-sm shadow-sm min-h-[120px] p-4
          ${completed ? "bg-gray-50 border-l-4 border-green-500" : "bg-white"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Task Header with Priority and Actions */}
      <div className="flex justify-between h-5 items-start">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={toggleCompletion}
            className="h-4 w-4 rounded cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          {task.priority && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
          )}
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <TodoActionsDropdown
                onDelete={() => handleDeleteTask(task?.id)}
                onEdit={() => toggleEditForm(task?.id)}
                onMarkAsDone={() => handleMarkAsDone(task?.id)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Task Content */}
      <div className="flex-grow">
        <p
          className={`font-semibold text-xl ${
            completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.content}
        </p>

        {/* Task Image (if exists) */}
        {task.imgUrl && (
          <div className="mt-2">
            <img
              src={task.imgUrl}
              alt="Task visual"
              className="h-24 w-full object-cover rounded-lg cursor-pointer"
              onClick={() => setShowImageModal(true)}
            />
          </div>
        )}
      </div>

      {/* Task Footer */}
      <div className="flex flex-col justify-between items-start gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <LuClock className="shrik-0 size-4" />
          <span>{formatDate(task.createdAt)}</span>
          {task.editedAt && <span className="italic ml-2">(edited)</span>}
        </div>

        {task.dueDate && (
          <div
            className={`px-4 py-2 rounded-full ${
              isOverdue
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            <span className="font-semibold">Due:</span>{" "}
            {formatDate(task.dueDate)}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && task.imgUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={task.imgUrl}
              alt="Task visual expanded"
              className="max-h-[80vh] max-w-full object-contain"
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
