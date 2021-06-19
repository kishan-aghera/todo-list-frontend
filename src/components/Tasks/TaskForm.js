import { useState } from "react";
import axios from "axios";

const TaskForm = (props) => {
  const [enteredName, setEnteredName] = useState('');

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const addNewTaskHandler = (event) => {
    setEnteredName('');

    const taskData = {
      name: enteredName
    }

    axios({
      method: 'POST',
      url: 'http://localhost:3001/v1/tasks',
      data: taskData
    })
  };

  const updateTaskHandler = (event) => {
    // console.log(props.id);
    setEnteredName('');

    const updatedTaskData = {
      name: enteredName
    }
    axios({
      method: 'PUT',
      url: `http://localhost:3001/v1/tasks/${props.id}`,
      data: updatedTaskData
    })
  };

  const printAddForm = !props.isEdit && (
    <div>
      <form onSubmit={addNewTaskHandler}>
        <input type="text" value={enteredName} placeholder="Task Name" onChange={nameHandler} />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );

  const printUpdateForm = props.isEdit && (
    <div>
      <form onSubmit={updateTaskHandler}>
        <input type="text" value={props.existingName} placeholder="Task Name" onChange={nameHandler} />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );

  return (
    <div>
      {printAddForm}
      {printUpdateForm}
    </div>
  );
};

export default TaskForm;
