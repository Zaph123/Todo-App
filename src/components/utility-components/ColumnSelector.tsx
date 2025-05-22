import { ColumnSelectorProps, ColumnType } from "../../config/propTypes";

  
  
  const ColumnSelector = ({ selectedColumn, setSelectedColumn }: ColumnSelectorProps ) => {
    const columns = ["todo", "in progress", "done"] as ColumnType[];
  
    return (
      <select
        value={selectedColumn || ""}
        onChange={(e) => setSelectedColumn(e.target.value as ColumnType)}
        className="text-xs border border-gray-200 rounded-full px-2 py-1 focus:outline-none"
          >
        {columns.map((column) => (
          <option key={column} value={column || ""}>
            {column}
          </option>
        ))}
      </select>
    );
  }

  export default ColumnSelector;