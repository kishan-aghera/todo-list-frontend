import { useState, useEffect } from "react";
import axios from "axios";

import TaskForm from "./TaskForm";

const TaskItem = () => {
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [existingName, setExistingName] = useState('');
  // const [task, setTask] = useState({ name: '' });
  // const [enteredName, setEnteredName] = useState('');
  // const [taskInfo, setTaskInfo] = useState({name: ''});

  // const nameHandler = (event) => {
  //   setEnteredName(event.target.value);
  // };

  // const addNewTaskHandler = (event) => {
  //   setEnteredName('');

  //   const taskData = {
  //     name: enteredName
  //   }

  //   axios({
  //     method: 'POST',
  //     url: 'http://localhost:3001/v1/tasks',
  //     data: taskData
  //   })
  // };

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/v1/tasks'
    })
      .then(({ data }) => {
        const transformedData = data.data.map((taskData) => {
          return {
            id: taskData.id,
            name: taskData.name,
          }
        })
        setTasks(transformedData);
      }).catch(err => {
      });
  }, []);

  const deleteHandler = (id, i) => {
    axios({
      method: 'DELETE',
      url: `http://localhost:3001/v1/tasks/${id}`
    })
      .then(() => {
        setTasks((prev) => {
          const newList = [...prev]
          newList.splice(i, 1);
          return newList;
        });
      })
  }

  const updateHandler = (id, name) => {
    // console.log("Update method called");
    setEdit(true);
    setIndex(+id);
    // console.log(index);
    setExistingName(name);
    console.log(existingName);
    <TaskForm id={index} existingName={existingName} isEdit={edit} />
    // console.log("Taskform called");
    // axios({
    //   method: 'PUT',
    //   url: `http://localhost:3001/v1/tasks/${id}`,
    //   data: taskInfo
    // })
    // .then(({data}) => {
    //   setTaskInfo((prev) => {
    //     const newList = [...prev];
    //     newList[i] = data;
    //     return newList;
    //   })
    // })
  }

  let printTasks = (
    tasks.map((task, i) =>
      <div key={task.id}>
        {task.name}
        {/* {console.log(task.name)} */}
        <button onClick={() => updateHandler(task.id, task.name)}>Update</button>
        <button onClick={() => deleteHandler(task.id, i)}>Delete</button>
      </div>
    )
  );

  return (
    <div>
      <div>
        <TaskForm isEdit={edit} />
      </div>
      <br />
      {printTasks}
    </div>
  );
};

export default TaskItem;
