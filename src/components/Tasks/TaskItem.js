import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import TaskForm from "./TaskForm";
// import Task from './Task';
import { Button, Container, Alert, Card, Row, Col, CardText } from "reactstrap";

const TaskItem = (props) => {
  const [tasks, setTasks] = useState([]);


  // For updating a task
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [existingName, setExistingName] = useState('');
  // const [arrIndex, setArrIndex] = useState(0);


  // For error handling
  const [noRecord, setNoRecord] = useState(true);

  const printNoTaskMessage = () => {
    return (<Alert color="danger">No Tasks Found!</Alert>);
  };

  // Fetching Tasks from Backend
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${props.user_id}/tasks`)
      .then(res => {
        // If no tasks found
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
      })
  });

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

  const updateHandler = (id, name, user_id, i) => {
    setEdit(true);
    setIndex(+id);
    setExistingName(name);
    // setArrIndex(i);
  }

  const updateTaskHandler = (name, i) => {
    const updatedTaskData = {
      name: name
    };

    axios.put(`http://localhost:3001/users/${props.user_id}/tasks/${index}`, updatedTaskData)
    //   .then(response => {
    //     const lists = [...tasks];
    //     lists[+arrIndex] = { name };
    //     setTasks(lists);
    //     // console.log(lists);
    //     // lists.filter()
    //   })
    //   .catch((error) => {
    //     console.log("Updating Error: ", error)
    //   });
    // setEdit(false);
    // setArrIndex(0);
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

  const styles = {
    padding: "7px",
    margin: "7px 0"
  };

  let printTasks = (tasks.length !== 0 ?
    tasks.map((task, i) =>
      <div key={task.id}>
        {/* <Task
          key={task.id}
          id={task.id}
          i={i}
          name={task.name}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          user_id={props.user_id}
        /> */}
        <Container>
          <Card>
            <Row>
              <Col xs="6">
                <CardText
                  tag="h5"
                  style={styles}
                >
                  {task.name}
                </CardText>
              </Col>
              <Col>
                <Button
                  color="secondary"
                  style={styles}
                  onClick={() => updateHandler(task.id, task.name, props.user_id, i)}
                >
                  Update
                </Button>
              </Col>
              <Col>
                <Button
                  color="danger"
                  style={styles}
                  onClick={() => deleteHandler(task.id, i)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    ) : (noRecord ? printNoTaskMessage() : null)
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
