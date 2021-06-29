import { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { Alert, Button } from "reactstrap";
// import Unauthorized from "../Unauthorized";

const TaskForm = (props) => {
  const [enteredName, setEnteredName] = useState('');

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const addTaskHandler = (event) => {
    event.preventDefault();
    props.addNewTaskHandler(enteredName);
    setEnteredName('');
  }

  const updateHandler = (event) => {
    event.preventDefault();
    props.updateTaskHandler(enteredName, props.id);
    setEnteredName('');
  }


  useEffect(() => {
    setEnteredName(props.existingName);
  }, [props.existingName])


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
            <form onSubmit={props.isEdit ? updateHandler : addTaskHandler}>
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
