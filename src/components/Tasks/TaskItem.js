import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import TaskForm from "./TaskForm";

const TaskItem = (props) => {
  const [tasks, setTasks] = useState([]);


  // For updating a task
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [existingName, setExistingName] = useState('');


  // For error handling
  const [noRecord, setNoRecord] = useState(false);


  // Fetching Tasks from Backend
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${props.user_id}/tasks`)
      .then(res => {
        console.log("Data from GET: ", res);

        // If no tasks found
        if (!res.data) {
          setNoRecord(true);
        }
        else {
          const data = Array.from(res.data);
          console.log("Json parse: ", data);
          const transformedData = data.map((taskData) => {
            return {
              id: taskData.id,
              name: taskData.name,
              user_id: taskData.user_id
            }
          })
          console.log("transformedData: ", transformedData);
          setTasks(transformedData);
        }
      })
  }, [props.user_id]);


  const deleteHandler = (id, i) => {
    axios.delete(`http://localhost:3001/users/${props.user_id}/tasks/${id}`)
      .then(() => {
        setTasks((prev) => {
          if (prev.length !== 0) {
            const newList = [...prev]
            newList.splice(i, 1);
            if (newList.length === 0) {
              setNoRecord(true);
              return [];
            }
            else {
              return newList;
            }
          }
          else {
            setNoRecord(true);
            return [];
          }
        });
      })
    console.log("Task Deleted");
  }


  const updateHandler = (id, name) => {
    setEdit(true);
    setIndex(+id);
    setExistingName(name);
  }


  let printTasks = (
    tasks.map((task, i) =>
      <div key={task.id}>
        {task.name}
        <button onClick={() => updateHandler(task.id, task.name, props.user_id)}>Update</button>
        <button onClick={() => deleteHandler(task.id, i)}>Delete</button>
      </div>
    )
  );

  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        props.handleLogout();
        props.history.push("/");
      })
      .catch(error => {
        console.log("Logout Error", error);
      });
  };

  return (
    <Fragment>
      <Fragment>User Status: {props.loggedInStatus} <br /> <br /></Fragment>
      <Fragment>props.user_id: {props.user_id}</Fragment>
      <div>
        <button onClick={() => handleLogoutClick()}>Logout</button>
      </div>
      <div>
        <TaskForm id={index} existingName={existingName} isEdit={edit} user_id={props.user_id} />
      </div>

      <br />

      {noRecord ? <p>No Tasks found!</p> : printTasks}
    </Fragment>
  );
};

export default TaskItem;
