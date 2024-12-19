export interface HistoryTask {
    id: string;
    description: string;
    date: string;
    userId: number;
  }
  
  export interface GroupedTasks {
    date: string;
    todoTasks: HistoryTask[];
    doneTasks: HistoryTask[];
  }