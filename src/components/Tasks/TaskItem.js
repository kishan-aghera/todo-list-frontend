import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import TaskForm from "./TaskForm";

const TaskItem = () => {
  const [tasks, setTasks] = useState([]);

  
  // For updating a task
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [existingName, setExistingName] = useState('');

  
  // For error handling
  const [noRecord, setNoRecord] = useState(false);

  
  // Fetching Tasks from Backend
  useEffect(() => {
    axios.get('http://localhost:3001/v1/tasks')
      .then(res => {
        // If no tasks found
        if (!res.data.data) {
          setNoRecord(true);
        }
        else {
          const transformedData = res.data.data.map((taskData) => {
            return {
              id: taskData.id,
              name: taskData.name,
            }
          })
          setTasks(transformedData);
        }
      })
  }, []);

  
  const deleteHandler = (id, i) => {
    axios.delete(`http://localhost:3001/v1/tasks/${id}`)
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
        <button onClick={() => updateHandler(task.id, task.name)}>Update</button>
        <button onClick={() => deleteHandler(task.id, i)}>Delete</button>
      </div>
    )
  );

  return (
    <Fragment>
      <div>
        <TaskForm id={index} existingName={existingName} isEdit={edit} />
      </div>

      <br />
      
      {noRecord ? <p>No Tasks found!</p> : printTasks}
    </Fragment>
  );
};

export default TaskItem;
