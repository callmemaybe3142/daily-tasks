// context/TaskContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Task } from '../types/task';

type TaskContextType = {
  doneTasks: Task[];
  tasksToDoToday: Task[];
  addDoneTask: (description: string, date: string) => void;
  addTaskToDo: (description: string, date: string) => void;
  editDoneTask: (id: string, newDescription: string) => void;
  editTaskToDo: (id: string, newDescription: string) => void;
  deleteDoneTask: (id: string) => void;
  deleteTaskToDo: (id: string) => void;
  clearDoneTasks: () => void;
  clearTasksToDo: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [tasksToDoToday, setTasksToDoToday] = useState<Task[]>([]);

  const addDoneTask = (description: string, date: string) => {
    setDoneTasks([...doneTasks, {
      id: Date.now().toString(),
      userID: 1, // Will come from auth later
      description,
      date
    }]);
  };

  const addTaskToDo = (description: string, date: string) => {
    setTasksToDoToday([...tasksToDoToday, {
      id: Date.now().toString(),
      userID: 1, // Will come from auth later
      description,
      date
    }]);
  };

  const editDoneTask = (id: string, newDescription: string) => {
    setDoneTasks(doneTasks.map(task =>
      task.id === id ? { ...task, description: newDescription } : task
    ));
  };

  const editTaskToDo = (id: string, newDescription: string) => {
    setTasksToDoToday(tasksToDoToday.map(task =>
      task.id === id ? { ...task, description: newDescription } : task
    ));
  };

  const deleteDoneTask = (id: string) => {
    setDoneTasks(doneTasks.filter(task => task.id !== id));
  };

  const deleteTaskToDo = (id: string) => {
    setTasksToDoToday(tasksToDoToday.filter(task => task.id !== id));
  };

  const clearDoneTasks = () => {
    setDoneTasks([]);
  };

  const clearTasksToDo = () => {
    setTasksToDoToday([]);
  };

  return (
    <TaskContext.Provider value={{
      doneTasks,
      tasksToDoToday,
      addDoneTask,
      addTaskToDo,
      editDoneTask,
      editTaskToDo,
      deleteDoneTask,
      deleteTaskToDo,
      clearDoneTasks,
      clearTasksToDo
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};