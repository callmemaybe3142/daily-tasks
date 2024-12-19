import { HistoryTask } from '../types/history';

export const mockHistoryData: HistoryTask[] = [
  // Tasks to do
  {
    id: '1',
    description: 'Review project proposal',
    date: '2024-12-12',
    userId: 1
  },
  {
    id: '2',
    description: 'Prepare presentation slides',
    date: '2024-12-12',
    userId: 1
  },
  {
    id: '3',
    description: 'Schedule team meeting',
    date: '2024-12-11',
    userId: 1
  },
  // Done tasks
  {
    id: '4',
    description: 'Complete documentation',
    date: '2024-12-12',
    userId: 1
  },
  {
    id: '5',
    description: 'Send weekly report',
    date: '2024-12-12',
    userId: 1
  },
  {
    id: '6',
    description: 'Client meeting',
    date: '2024-12-11',
    userId: 1
  }
];