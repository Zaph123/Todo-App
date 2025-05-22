import { PriorityLevelsProps, PriorityLevel } from "../../config/propTypes";
import { FaFlag } from "react-icons/fa6";

const PriorityLevels = ({ priority, setPriority }: PriorityLevelsProps) => {
  // console.log("PriorityLevels component rendered with priority:", priority); // Debugging line
  return (
    <div className="flex items-center gap-2">
      <FaFlag className={`text-sm ${priority === 'high' ? 'text-red-500' :
          priority === 'medium' ? 'text-yellow-500' : 'text-blue-500'
        }`} />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as PriorityLevel)}
        className="text-xs border border-gray-200 rounded-full px-2 py-1 focus:outline-none"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  )

}

export default PriorityLevels;