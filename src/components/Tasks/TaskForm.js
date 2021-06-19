import { useState, Fragment, useEffect } from "react";
import axios from "axios";

const TaskForm = (props) => {
  const [enteredName, setEnteredName] = useState('');
  
  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };
  
  
  const addNewTaskHandler = () => {
    setEnteredName('');
    
    const taskData = {
      name: enteredName
    }
    
    axios.post('http://localhost:3001/v1/tasks', taskData)
  };
  
  
  useEffect(() => {
    setEnteredName(props.existingName)
  }, [props.existingName])
  
  const updateTaskHandler = () => {
    setEnteredName('');

    const updatedTaskData = {
      name: enteredName
    }

    axios.put(`http://localhost:3001/v1/tasks/${props.id}`, updatedTaskData);
  };

  
  return (
    <Fragment>
      <form onSubmit={props.isEdit ? updateTaskHandler : addNewTaskHandler}>
        <input type="text" value={enteredName} placeholder="Task Name" onChange={nameHandler} />
        <button type="submit">{props.isEdit ? "Update Task" : "Add Task"}</button>
      </form>
    </Fragment>
  );
};

export default TaskForm;
