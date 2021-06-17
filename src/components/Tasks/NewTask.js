import { useState } from "react";

let counterForID = 3;

const NewTask = (props) => {
  const [enteredName, setEnteredName] = useState('');

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setEnteredName('');

    const taskData = {
      id: counterForID++,
      name: enteredName,
    }

    props.onSaveTaskData(taskData);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" value={enteredName} placeholder="Task Name" onChange={nameHandler} />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default NewTask;
