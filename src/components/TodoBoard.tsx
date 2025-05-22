import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import TopNav from "./TopNav";
import {
  ColumnType,
  ColumnProps,
} from "../config/propTypes";
import { TaskForm } from "./forms/TaskForm";
import TaskList from "./TaskList";
import EmptyColumn from "./empty-states/EmptyColumn";
import { useTasks } from "../hooks/useTasks";
import GeneralForm from "./forms/GeneralForm";
import { FiPlus } from "react-icons/fi";

export const COLUMN_TYPES: ColumnType[] = ["todo", "in progress", "done"];

export const COLUMN_STYLES = {
  todo: { text: "text-indigo-500", bg: "bg-indigo-50" },
  "in progress": { text: "text-yellow-500", bg: "bg-yellow-50" },
  done: { text: "text-green-500", bg: "bg-green-50" },
};

const TodoBoard = () => {
  const { tasks, isLoading, addTask } = useTasks();
  const [showGeneralForm, setShowGeneralForm] = useState(false);
console.log(tasks, "tasks")
  return (
    <main className="w-full min-h-screen bg-neutral flex flex-col items-center justify-center">
      <TopNav />

      <AnimatePresence>
        {showGeneralForm ? (
          <GeneralForm
            key={"form"}
            onCancel={() => {
              setShowGeneralForm(false);
            }}
          />
        ) : (
          <div className="fixed bottom-20 right-20">
            <motion.button
              initial={{ opacity: 0, y: 25, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0 }}
              key={"but"}
              onClick={() => setShowGeneralForm(true)}
              className="size-12 rounded-full bg-indigo-500 text-white shadow-md text-3xl grid place-content-center"
            >
              <FiPlus />
            </motion.button>
          </div>
        )}
      </AnimatePresence>
      <div className="container w-full max-w-[1000px] rounded-3xl min-h-screen p-5 mb-28">
        <div className="parent">
          <div className="task-box">
            <div className="w-full flex gap-5 items-start justify-between">
              {COLUMN_TYPES.map((column) =>
                isLoading ? (
                  <ColumnLoader key={column} />
                ) : (
                  <Column
                    key={column}
                    tasks={tasks}
                    column={column}
                    addTask={addTask}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const ColumnLoader = () => (
  <div className="space-y-3 w-full max-w-[300px]">
    <div className="animate-pulse p-4 rounded-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-full bg-gray-200 h-10 w-28"></div>
        <div className="rounded-full bg-gray-200 size-10"></div>
      </div>
      <div className="rounded-3xl mt-8 bg-gray-200 w-full h-[200px]"></div>
      <div className="rounded-3xl mt-8 bg-gray-200 w-full h-[200px]"></div>
    </div>
  </div>
);

const Column = ({
  tasks,
  column,
  addTask
}: ColumnProps) => {
  const [showForm, setShowForm] = useState(false);
  
  const filteredTasks = tasks?.filter((task) => task.column === column);

  console.log(filteredTasks, "filteredTasks")

  return (
    <> 
      <motion.section
        transition={{ duration: 0.5 }}
        className={`w-full ${
          COLUMN_STYLES[column ?? "todo"].bg
        } max-w-[300px] rounded-3xl p-5 space-y-6`}
      >
        <div className="w-full flex items-center justify-between gap-5">
          <div className="space-y-1">
            <h1
              className={`text-lg ${
                COLUMN_STYLES[column ?? "todo"]?.text || ""
              } capitalize flex items-center gap-3`}
            >
              {column}
              <span
                className={`size-8 ${
                  COLUMN_STYLES[column ?? "todo"].bg
                } text-xs rounded-full grid place-content-center`}
              >
                {filteredTasks.length}
              </span>
            </h1>
            
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(!showForm)}
            className={`size-7 grid text-sm place-content-center rounded-lg bg-white ${
              COLUMN_STYLES[column ?? "todo"].text
            } text-gray-400 relative hover:text-gray-500`}
          >
            <AnimatePresence mode="wait">
              {showForm ? (
                <motion.div
                  key={"one"}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <FaMinus />
                </motion.div>
              ) : (
                <motion.div
                  key={"two"}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <FaPlus />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {filteredTasks.length === 0 ? (
          <EmptyColumn />
        ) : (
          <TaskList
            tasks={filteredTasks}
          />
        )}

        <AnimatePresence>
          {showForm && (
            <TaskForm
              onCancel={() => {
                setShowForm(false);
              }}
              initialColumn={column}
              addTask={addTask}
              tasks={tasks}
            />
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
};

export default TodoBoard;
