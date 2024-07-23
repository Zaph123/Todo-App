// import svg from '../img/svg-edit'
import { FaTimes } from "react-icons/fa";

const TodoList = ({err, task, del, handleCheck, time}) => {
 
    return(
     
       <li 
       className={task.completed ? "active" : ""} 
       style={{border: task.id === err ? "1px solid #f01212" : task.completed ? "2px solid #656565" : "none",
       }}
       >
        <input type="checkbox" checked={task.completed} onChange={handleCheck} name="check" id="check" />
        <div className="f-row">
          <div className="row-1">
           <p style={{textDecoration: task.strike ? 'line-through' : "none"}}>{task.task}</p>
           <span className='date-created'>{new Date(task.createdAt).toLocaleString}min ago</span>
           <div className="del-btn">
              <div className="del-box" onClick={del}>
                <FaTimes className="fa-solid fa-times" />
              </div>  
             
              {/* <lord-icon
                src="https://cdn.lordicon.com/xzalkbkz.json"
                trigger="hover"
                style={{width: "250px", height: "250px"}}>
              </lord-icon> */}
           </div>
           </div>
           <span className='create-date row-2'>{task.name}</span>
          </div>
      </li>)
      
      
    
  }

  export default TodoList;