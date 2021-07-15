import {
  useState,
  useEffect,
  Fragment
} from "react";
import { useHistory } from "react-router";

import axios from "axios";

import {
  Button,
  Container,
  Alert
} from "reactstrap";

import TaskForm from "./TaskForm";
import Task from './Task';
import Unauthorized from "../Unauthorized";

const TaskItem = (props) => {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();


  // For updating a task
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [existingName, setExistingName] = useState('');


  // For error handling
  const [noRecord, setNoRecord] = useState(true);
  const printNoTaskMessage = () => {
    return (<Alert color="danger">No Tasks Found!</Alert>);
  };


  // Fetching Tasks from Backend
  useEffect(() => {
    props.isLoggedIn &&
      (axios
        .get(`http://localhost:3001/users/${props.user_id}/tasks`)
        .then(res => {
          if (res.data.status === 404 && props.isLoggedIn) {
            setNoRecord(true);
            printNoTaskMessage();
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
        }))
  }, [edit, noRecord, props.user_id, props.isLoggedIn]);


  const addNewTaskHandler = (name) => {
    const taskData = {
      name: name
    };

    axios
      .post(`http://localhost:3001/users/${props.user_id}/tasks`, taskData)
      .then(response => {
        const lists = [...tasks, response.data];
        setTasks(lists);
      })
      .catch(error => {
        console.log("Adding new Task error: ", error);
      })
  };


  const updateHandler = (id, name) => {
    setEdit(true);
    setIndex(+id);
    setExistingName(name);
    // Here, when existingName will change, then it will be passed to TaskForm. There, useEffect will re-render and
    // Update Task button will come and input form will automatically contain the name of the task whose update button was clicked.
    // In TaskForm, when Update Task button is clicked, it will call a handler, which in turn will call the following method.
  }

  const updateTaskHandler = (name) => {
    const updatedTaskData = {
      name: name
    };

    axios
      .put(`http://localhost:3001/users/${props.user_id}/tasks/${index}`, updatedTaskData)
      .then(() => {
        setEdit(false);
      })
  }


  const deleteHandler = (id, i) => {
    axios
      .delete(`http://localhost:3001/users/${props.user_id}/tasks/${id}`)
      .then(() => {
        setTasks((prev) => {
          if (prev.length !== 0) {
            setNoRecord(false);
            const newList = [...prev];
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


  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(() => {
        props.handleLogout(); // [App.js 45]
        history.push("/todo-list-frontend");
      })
      .catch(error => {
        console.log("Logout Error", error);
      });
  };


  let printTasks = (tasks.length !== 0 ?
    tasks.map((task, i) =>
      <div key={task.id}>
        <Task
          key={task.id}
          id={task.id}
          i={i}
          name={task.name}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          user_id={props.user_id}
        />
      </div>
    ) : (noRecord ? printNoTaskMessage() : null)
  );

  return (
    <Fragment>
      {
        props.isLoggedIn ? (
          <Container>
            <div>
              {
                props.isLoggedIn && props.user_id &&
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
        ) : <Unauthorized />
      }
    </Fragment>
  );
};

export default TaskItem;
