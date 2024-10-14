import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";

// Creating a centralized store for the application
const store = configureStore({
  reducer: {
    todoTasks: todoReducer,
  },
});

export default store;
