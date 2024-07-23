import { useState, useEffect} from 'react';
import taskImg from '../img/task-list.png'
import TodoList from './TodoList';
import TaskNavBar from './TaskNavBar';
import useLocalStorage from '../hooks/useLocalStorage';
import { FaPlus } from 'react-icons/fa';

function TodoHome() {
  
  const [list, setTask] = useState([])
  const [show, setShow] = useState(false)
  const [taskDescription, setTaskDescription] = useState('')
  const [newTasks, setNewTasks] = useState("")
  const [errMsg, setErrMsg] = useState(false)
  const [err, setErr] = useState(0)
  const [totalNumofTasks, setTotalNumOfTasks] = useState(0)
  const [numOfCompletedTasks, setNumOfCompletedTasks] = useState(0)
  const [disable, setDisable] = useState(true)
  const [checkedElem, setCheckedElem] = useState(null)
  const [date, setDate] = useState(new Date())
  // const [time, setTime] = useState(0)

  const {setItem} = useLocalStorage("My Tasks")
  // const [dateCreated, setDateCreated] = useState()
  // const ui = {
  //   task: newTasks
  // }
  // const [allState, dispatch] = useReducer(reducer, ui)

   
   const taskLogic = () => {
    // const d = new Date()
    // const f = new Intl.DateTimeFormat('en-US', {minute: '2-digit'})
    // const fTime = f.format(d)
    // const taskTime = fTime

    const find = list.find(n => {
      return n.task === taskDescription
    })
    if(taskDescription.trim() === ""){
      setErrMsg(true)
    }
    else
    {
     if(find){
      setErr(find.id)
     }else{
      setErrMsg(false)
      const taskDetails = {
      id: list.length === 0 ? 1 : list.length + 1,
      name: newTasks === "" ? `Task ${list.length + 1}` : newTasks,
      task: taskDescription,
      completed: false,
      edit: false,
      strike: false,
      createdAt: new Date().toISOString(),
    }
   
    setTask([...list, taskDetails])
    setNewTasks('')
    setTaskDescription("")
    console.log(list)
    }
  }
   }

   const addTask = () => {
    taskLogic()
   }

   const KeyboardEnterKey = (e) => {
    if(e.key === 'Enter') {
       taskLogic()
    }
   }

   const deleteTask = (id) => {
     setTask(list.filter((task) => task.id !== id))
   };

   const deleteSelectedTasks = () => {
     setTask(list.filter(n => n.completed === false))
   };

   const strikeThroughSelectedTasks = () => {
    setTask(list.map(list => {
      if(list.completed){
        return {...list, strike: !list.strike}
      }
      else{
        return list
      }
     }))
   };


   useEffect(() => {
    setTotalNumOfTasks(list.length)  
    const allCompletedTask = list.filter(list => list.completed === true)
    setNumOfCompletedTasks(allCompletedTask.length)
    
    const checkSelection = list.find(n => n.completed === true)
    if(checkSelection){
      setDisable(false)
    }
    else{
      setDisable(true)
    }

    setTimeout(() => {
      setErr(0)
      setErrMsg(false)
    }, 3000)

    if(list.length > 0){
      setShow(true)
     }else{
       setShow(false)
     }

     setItem(list)
   
   },[list, err, show, setItem])

   useEffect(() => {
    const timer = setInterval(() =>{
      const theDate = new Date()
      // const formatter = new Intl.DateTimeFormat('en-US', {second: 'numeric'})
      // const formattedTime = formatter.format(theDate)
  
      setTime(time + 1)
      setDate(theDate)
    }, 1000)
 
   return () => {
    clearInterval(timer)
   }
   })

   useEffect(() => {
    const msg = setTimeout(() => {
      setErrMsg(false)
    }, 6000)

    return () => {
      clearTimeout(msg)
    }
   }, [])


   const handleCheck = (id, complete) => {
     setTask(list.map(list => {
      if(list.id === id){
        return {...list, completed: !list.completed, strike: false}
      }
      else{
        return list
      }
     }))
     setCheckedElem(id)
     
   }
  return (
    <>
    {errMsg && <div className="err-modal">
        <p>Please add a new <b>Task</b></p>
    </div>}
    <div className="container p-[10px]">
    <iframe style={{bordeRadius:"12px"}} src="https://open.spotify.com/embed/track/1ei3hzQmrgealgRKFxIcWn?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <div className="parent">
            <h2>My To Do List</h2>
            <div className="to_do_box">
              <div className="add-new-task">
                <input type="text" className="input task-name" value={newTasks} placeholder='Title...' onChange={e => setNewTasks(e.target.value)}/>
                <input type="text" className="input task-desc" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} onKeyDown={KeyboardEnterKey} placeholder="Add Description..." name="name" />
                <div className="add-btn" onClick={addTask}>
                    <FaPlus className="fa-solid fa-plus" />
                    Add
                </div>
            </div>
              <div className="task-box">
                <div className="row1">
                    <div className="total-task status">
                        <p>Total tasks</p> <span className="num-of-task">{totalNumofTasks}</span>
                    </div>
                    <div className="total-task status">
                        <p>Pending tasks</p> <span className="num-of-task">{totalNumofTasks}</span>
                    </div>
                    <div className="task-completed status">
                        <p>Tasks completed</p> <span className="num-of-task-completed">{numOfCompletedTasks}</span>
                    </div>
                </div>
                <div className="row2">
                    <TaskNavBar 
                    date={date}
                    deleteSelectedTasks={deleteSelectedTasks}
                    strikeThroughSelectedTasks={strikeThroughSelectedTasks} 
                    disable={disable}
                    />
              {show 
               ? <ul id="list">
                  {list.map(list => {
                    return (
                      <TodoList
                      key={list.id}
                      handleCheck={() =>handleCheck(list.id, list.completed )}  
                      del={() => deleteTask(list.id)}
                      checkedElem={checkedElem}
                      err={err}
                      task={list}
                      />
                    )}
                  )}
                   </ul>
                  
                  : <img src={taskImg} alt="" className="empty-task-img"/>
               }
                  
                  
               </div>
            </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default TodoHome