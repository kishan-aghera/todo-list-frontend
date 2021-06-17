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

  let printTasks = (
    initialDummyTasks.map((task) =>
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
