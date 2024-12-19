// app/(tabs)/input-tasks.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTaskContext } from '../../context/TaskContext';
import { TaskForm } from '../../components/TaskForm';
import { TaskList } from '../../components/TaskList';

export default function InputTasks() {
  const {
    doneTasks,
    tasksToDoToday,
    addDoneTask,
    addTaskToDo,
    editDoneTask,
    editTaskToDo,
    deleteDoneTask,
    deleteTaskToDo,
  } = useTaskContext();

  const [activeTab, setActiveTab] = useState('done'); // 'done' or 'todo'

  // Calculate dates only once when component mounts
  const dates = useMemo(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    return { yesterdayStr, todayStr };
  }, []);

  const handleSubmitDone = () => {
    console.log('Submitting done tasks:', doneTasks);
  };

  const handleSubmitToDo = () => {
    console.log('Submitting tasks to do:', tasksToDoToday);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'done' && styles.activeTab]}
          onPress={() => setActiveTab('done')}
        >
          <Text style={[styles.tabText, activeTab === 'done' && styles.activeTabText]}>
            လုပ်ပြီးသော လုပ်ငန်းများ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'todo' && styles.activeTab]}
          onPress={() => setActiveTab('todo')}
        >
          <Text style={[styles.tabText, activeTab === 'todo' && styles.activeTabText]}>
            လုပ်ရန်လုပ်ငန်းများ
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'done' ? (
        <View style={styles.content}>
          <TaskForm
            label="လုပ်ပြီးသော လုပ်ငန်းများ ဖြည့်ရန်"
            defaultDate={dates.yesterdayStr}
            onAddTask={addDoneTask}
            isFixed={false} // Lock the date to yesterday
          />
          <TaskList
            tasks={doneTasks}
            onEditTask={editDoneTask}
            onDeleteTask={deleteDoneTask}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitDone}
          >
            <Text style={styles.submitButtonText}>ပေးပို့ရန်</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <TaskForm
            label="ယနေ့အတွက်လုပ်ဆောင်ရန် လျာထားသော လုပ်ငန်းများ ဖြည့်ရန်"
            defaultDate={dates.todayStr}
            onAddTask={addTaskToDo}
            isFixed={false} // Lock the date to today
          />
          <TaskList
            tasks={tasksToDoToday}
            onEditTask={editTaskToDo}
            onDeleteTask={deleteTaskToDo}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitToDo}
          >
            <Text style={styles.submitButtonText}>ပေးပို့ရန်</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}


// app/(tabs)/input-tasks.tsx styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    tab: {
      flex: 1,
      paddingVertical: 16,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: '#2196F3',
    },
    tabText: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      paddingHorizontal: 8,
    },
    activeTabText: {
      color: '#2196F3',
      fontWeight: '500',
    },
    content: {
      flex: 1,
      padding: 16,
    },
    submitButtonContainer: {
      padding: 16,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
    },
    submitButton: {
      backgroundColor: '#2196F3',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
    listContainer: {
      flex: 1,
      marginTop: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    emptyText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    errorContainer: {
      padding: 16,
      backgroundColor: '#ffebee',
      borderRadius: 8,
      marginBottom: 16,
    },
    errorText: {
      color: '#c62828',
      fontSize: 14,
    },
  });