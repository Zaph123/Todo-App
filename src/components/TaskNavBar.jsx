import { FaEdit, FaCalendar, FaStrikethrough, FaTrash } from "react-icons/fa"



const TaskNavBar = ({date, deleteSelectedTasks, strikeThroughSelectedTasks, disable}) => {
    const editBtns = [
      {
        id: "1",
        name: "strikethrough",
        icon: <FaStrikethrough className="strikethrough" />,
        click: strikeThroughSelectedTasks 
      },
      {
        id: "2",
        name: "edit",
        icon: <FaEdit className="edit" />,
        click: null
      },
      {
        id: "3",
        name: "trash",
        icon: <FaTrash className="trash" />,
        click: deleteSelectedTasks 
      },
    ]
    return(
      <nav className="task-nav">
        <div className="time">
          <FaCalendar />
          <span>
            <b>Today </b> 
          {date.toDateString()}
          </span>
        </div>
        <div className="task-actions">
  
         {editBtns.map(btn => {
          return (
            <button disabled={disable} className={`icon ${btn.name}`} onClick={btn.click}>
              {btn.icon}    
            </button>
          )
         })}
          
         </div>
      </nav>
    )
   }

   export default TaskNavBar;