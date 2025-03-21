import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  dueDate: string;
}

const loadTasks = (): Task[] => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: loadTasks(),
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
      saveTasks(state);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveTasks(state);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const newState = state.filter((task) => task.id !== action.payload);
      saveTasks(newState);
      return newState;
    },
  },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
