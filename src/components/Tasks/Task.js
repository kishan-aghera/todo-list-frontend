const Task = (props) => {
  return (
    <div>
      {props.name}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default Task;
