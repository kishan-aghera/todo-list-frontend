import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import TaskForm from "./TaskForm";
import { Button, Col, Row, Container, Card, Alert, CardText } from "reactstrap";

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
        <Container>
          <Card>
            <Row>
              <Col xs="6">
                <CardText
                  tag="h5"
                  style={{ padding: "7px", margin: "7px 0" }}
                >
                  {task.name}
                </CardText>
              </Col>
              <Col>
                <Button
                  color="secondary"
                  style={{ padding: "7px", margin: "7px 0" }}
                  onClick={() => updateHandler(task.id, task.name, props.user_id)}
                >
                  Update
                </Button>
              </Col>
              <Col>
                <Button
                  color="danger"
                  style={{ padding: "7px", margin: "7px 0" }}
                  onClick={() => deleteHandler(task.id, i)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card>
        </Container>
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
          />
        </div>

        <br />

        {printTasks}
      </Container>
    </Fragment>
  );
};

export default TaskItem;
