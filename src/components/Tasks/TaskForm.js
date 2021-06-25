import { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert, Button } from "reactstrap";

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

    axios.post(`http://localhost:3001/users/${props.user_id}/tasks`, taskData)
  };


  useEffect(() => {
    setEnteredName(props.existingName);
  }, [props.existingName])

  const updateTaskHandler = () => {
    setEnteredName('');

    const updatedTaskData = {
      name: enteredName
    }

    axios.put(`http://localhost:3001/users/${props.user_id}/tasks/${props.id}`, updatedTaskData);
  };

  const printMessage = (
    <Fragment>
      <Alert color="danger">
        Please Login and then you can use this feature.
        <br />
        You can get Login or Register by visiting the following link.
        <br />
        <Link to="/">Home</Link>
      </Alert>
    </Fragment>

  );

  return (
    <Fragment>
      {
        (props.isLoggedIn && props.user_id)
          ?
          <Fragment>
            <form onSubmit={props.isEdit ? updateTaskHandler : addNewTaskHandler}>
              <input type="text" value={enteredName} placeholder="Task Name" onChange={nameHandler} />
              <Button color="info" type="submit">{props.isEdit ? "Update Task" : "Add Task"}</Button>
            </form>
          </Fragment>
          : printMessage
      }
    </Fragment>
  );
};

export default TaskForm;
