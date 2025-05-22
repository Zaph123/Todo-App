import { DueDatePickerProps } from "../../config/propTypes"
import { FaCalendarAlt } from "react-icons/fa"
import DatePicker from "react-datepicker"

const DueDatePicker = ({ dueDate, setDueDate }: DueDatePickerProps) => {
  return (
    <div className="flex items-center gap-2">
      <FaCalendarAlt className="text-sm text-gray-500" />
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        placeholderText="Set due date"
        minDate={new Date()}
        className="text-xs border border-gray-200 rounded-full px-2 py-1 w-32 focus:outline-none"
      />
    </div>
  )
}

export default DueDatePicker