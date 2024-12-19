// app/(tabs)/history.tsx
import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { mockHistoryData } from '../../utils/mockData';
import { HistoryTask, GroupedTasks } from '../../types/history';

export default function History() {
  // Group tasks by date and type
  const groupedTasks = useMemo(() => {
    const tasksByDate = mockHistoryData.reduce((acc: { [key: string]: GroupedTasks }, task) => {
      if (!acc[task.date]) {
        acc[task.date] = {
          date: task.date,
          todoTasks: [],
          doneTasks: []
        };
      }

      // This is just for mock data. In real app, you'd have a type field
      // to distinguish between todo and done tasks
      if (['1', '2', '3'].includes(task.id)) {
        acc[task.date].todoTasks.push(task);
      } else {
        acc[task.date].doneTasks.push(task);
      }

      return acc;
    }, {});

    // Sort by date in descending order
    return Object.values(tasksByDate).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [mockHistoryData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const TaskList = ({ tasks }: { tasks: HistoryTask[] }) => (
    <View style={styles.taskList}>
      {tasks.map((task, index) => (
        <View key={task.id} style={styles.taskItem}>
          <Text style={styles.taskNumber}>{index + 1}.</Text>
          <Text style={styles.taskText}>{task.description}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {groupedTasks.map((group, groupIndex) => (
        <View key={group.date} style={styles.dateGroup}>
          {/* Tasks to do section */}
          {group.todoTasks.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Tasks to do for {formatDate(group.date)}
              </Text>
              <TaskList tasks={group.todoTasks} />
            </View>
          )}

          {/* Done tasks section */}
          {group.doneTasks.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Tasks that are done for {formatDate(group.date)}
              </Text>
              <TaskList tasks={group.doneTasks} />
            </View>
          )}

          {/* Divider (except for last group) */}
          {groupIndex < groupedTasks.length - 1 && (
            <View style={styles.divider} />
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dateGroup: {
    marginBottom: 16,
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2196F3',
    marginBottom: 12,
  },
  taskList: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  taskNumber: {
    minWidth: 24,
    fontSize: 16,
    color: '#666',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
    marginVertical: 16,
  },
});