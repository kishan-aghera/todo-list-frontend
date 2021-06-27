import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import TaskForm from "./TaskForm";
import Task from "./Task";
import { Button, Container, Alert } from "reactstrap";

const TaskItem = (props) => {
  const [tasks, setTasks] = useState([]);


  // For updating a task
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [existingName, setExistingName] = useState('');


  // For error handling
  const [noRecord, setNoRecord] = useState(true);


  // Fetching Tasks from Backend
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${props.user_id}/tasks`)
      .then(res => {
        // If no tasks found
        if (!res.data) {
          setNoRecord(true);
        }
        else {
          setNoRecord(false);
          const data = Array.from(res.data);
          const transformedData = data.map((taskData) => {
            return {
              id: taskData.id,
              name: taskData.name,
              user_id: taskData.user_id
            }
          })
          setTasks(transformedData);
        }
      })
  }, [props.user_id]);

  const addNewTaskHandler = (name) => {
    const taskData = {
      name: name
    };

    axios.post(`http://localhost:3001/users/${props.user_id}/tasks`, taskData)
      .then(response => {
        const lists = [...tasks, response.data];
        setTasks(lists);
      })
      .catch(error => {
        console.log("Adding new Task error: ", error);
      })
  };

  const updateTaskHandler = (name) => {
    const updatedTaskData = {
      name: name
    };

    axios.put(`http://localhost:3001/users/${props.user_id}/tasks/${index}`, updatedTaskData)
      .then(response => {
        const lists = tasks;
        lists[index - 1] = { name };
        setTasks(lists);
        console.log(lists);
      })
      .catch((error) => {
        console.log("Updating Error: ", error)
      });
  }


  const deleteHandler = (id, i) => {
    axios.delete(`http://localhost:3001/users/${props.user_id}/tasks/${id}`)
      .then(() => {
        setTasks((prev) => {
          if (prev.length !== 0) {
            setNoRecord(false);
            const newList = [...prev]
            newList.splice(i, 1);
            if (newList.length === 0) {
              setNoRecord(true);
              return [];
            }
            else {
              setNoRecord(false);
              return newList;
            }
          }
          else {
            setNoRecord(true);
            return [];
          }
        });
      })
  }


  const updateHandler = (id, name) => {
    setEdit(true);
    setIndex(+id);
    setExistingName(name);
  }


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


  let printTasks = (tasks.length !== 0 ?
    tasks.map((task, i) =>
      <div key={task.id}>
        <Task
          i={i}
          id={task.id}
          name={task.name}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          user_id={props.user_id}
        />
      </div>
    ) : (noRecord &&
      <Alert color="danger">No Tasks found!</Alert>
    )
  );

  return (
    <Fragment>
      <Container>
        <div>
          {props.isLoggedIn && props.user_id &&
            <Button
              color="danger"
              onClick={() => handleLogoutClick()}
            >
              Logout
            </Button>
          }
        </div>
        <div>
          <TaskForm
            id={index}
            existingName={existingName}
            isEdit={edit}
            user_id={props.user_id}
            isLoggedIn={props.isLoggedIn}
            tasks={tasks}
            addNewTaskHandler={addNewTaskHandler}
            updateTaskHandler={updateTaskHandler}
          />
        </div>

        <br />

        {printTasks}
      </Container>
    </Fragment>
  );
};

export default TaskItem;
