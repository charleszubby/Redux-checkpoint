import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: (() => {
    if (typeof localStorage !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("tasks")) || [];
      } catch (error) {
        console.error("Failed to load tasks from localStorage:", error);
        return [];
      }
    }
    return [];
  })(),
  filter: "all",
};

// Removed code that tries to set localStorage outside of reducers
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.tasks.push(payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleCompletedStatus: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          return { ...task, ...payload };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const {
  addTask,
  removeTask,
  toggleCompletedStatus,
  editTask,
  setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
