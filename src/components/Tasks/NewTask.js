import { useState } from "react";
import axios from "axios";

const NewTask = (props) => {
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

  return (
    <div>
      <form onSubmit={addNewTaskHandler}>
        <input type="text" value={enteredName} placeholder="Task Name" onChange={nameHandler} />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default NewTask;
