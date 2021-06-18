import { useState, useEffect } from "react";
import axios from "axios";

import NewTask from "./NewTask";
import Task from "./Task";

const TaskItem = () => {
  const [tasks, setTasks] = useState([]);

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
      })
  }, []);

  let printTasks = (
    tasks.map((task) =>
      <Task
        key={task.id}
        name={task.name}
      />)
  );

  return (
    <div>
      <div>
        <NewTask />
      </div>
      {printTasks}
    </div>
  );
};

export default TaskItem;
