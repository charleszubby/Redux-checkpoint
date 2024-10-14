import "./App.css";
import AddTaskForm from "./components/AddTaskForm";
import { useState } from "react";
import TasksLists from "./components/TasksLists";
import { useDispatch } from "react-redux";
import { setFilter } from "./slices/todoSlice";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Filter2 from "./components/Filter2";

function App() {
  const dispatch = useDispatch();
  // us the useSelector hook to get the tasks from the store
  const { tasks, filter } = useSelector((state) => state.todoTasks);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const editTaskHandler = (task) => {
    setTaskToEdit(task);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  const filterHandler = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="main-container">
      <Toaster />
      <div className="container">   
        <AddTaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        <Filter2 onFilterChange={filterHandler} />
        <TasksLists tasks={filteredTasks} onEditTask={editTaskHandler} />
      </div>
    </div>
  );
}

export default App;
