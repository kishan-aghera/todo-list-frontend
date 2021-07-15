import {
  useState,
  Fragment,
  useEffect
} from "react";
import { Button } from "reactstrap";

import Unauthorized from "../Unauthorized";

const TaskForm = (props) => {
  const [enteredName, setEnteredName] = useState('');

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const addTaskHandler = (event) => {
    event.preventDefault();
    props.addNewTaskHandler(enteredName); // [TaskItem.js 64]
    setEnteredName('');
  }

  const updateHandler = (event) => {
    event.preventDefault();
    props.updateTaskHandler(enteredName); // [TaskItem.js 90]
    setEnteredName('');
  }


  useEffect(() => {
    setEnteredName(props.existingName);
  }, [props.existingName])


  return (
    <Fragment>
      {
        (props.isLoggedIn && props.user_id)
          ?
          <form onSubmit={props.isEdit ? updateHandler : addTaskHandler}>
            <input
              type="text"
              value={enteredName}
              placeholder="Task Name"
              onChange={nameHandler}
              required />
            <Button
              color="info"
              type="submit">
              {
                props.isEdit ? "Update Task" : "Add Task"
              }
            </Button>
          </form>
          : <Unauthorized />
      }
    </Fragment>
  );
};

export default TaskForm;
