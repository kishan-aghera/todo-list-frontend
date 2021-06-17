import { useState } from "react";
import NewTask from "./NewTask";
import Task from "./Task";

const TaskItem = () => {
  const initialDummyTasks = [
    {
      id: 1,
      name: "first task"
    },
    {
      id: 2,
      name: 'second task'
    }
  ];

  const [tasks, setTasks] = useState(initialDummyTasks);

  const saveTaskDataHandler = (enteredTaskData) => {
    const taskData = {
      ...enteredTaskData,
    };

    setTasks(prevTasks => {
      return [taskData, ...prevTasks];
    });
  };

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
        <NewTask onSaveTaskData={saveTaskDataHandler} />
      </div>
      {printTasks}
    </div>
  );
};

export default TaskItem;
