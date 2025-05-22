import DueDatePicker from "../utility-components/DueDatePicker";
import PriorityLevels from "../utility-components/PriorityLevels";
import ColumnSelector from "../utility-components/ColumnSelector";
import { TaskFormToolsProps } from "../../config/propTypes";

export const TaskFormTools = ({ autoProgress, priority, dueDate, selectedColumn, setDueDate, setSelectedColumn, setPriority, setAutoProgress }: TaskFormToolsProps) => {
    return (
      <div className="flex flex-wrap gap-3 items-center">
        {/* Task Options */}
        {/* Priority Selector */}
        {priority && <PriorityLevels priority={priority} setPriority={setPriority} />
  }
        {/* Due Date Picker */}
         <DueDatePicker dueDate={dueDate} setDueDate={setDueDate} />
  
        {/* Column Selection */}
        {selectedColumn && <ColumnSelector
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
        />}
  
        {/* Auto Progress Toggle */}
        {autoProgress && <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={autoProgress}
            onChange={() => setAutoProgress(!autoProgress)}
            className="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          Auto-progress
        </label>}
      </div>
    );
  }