// components/TaskList.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/task';
import { formatDate } from '@/utils/dateFormatter';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: string, newDescription: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onEditTask, onDeleteTask }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleEdit = (id: string) => {
    if (editText.trim()) {
      onEditTask(id, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      {editingId === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            autoFocus
          />
          <TouchableOpacity
            onPress={() => handleEdit(item.id)}
            style={styles.iconButton}
          >
            <Ionicons name="checkmark" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEditingId(null)}
            style={styles.iconButton}
          >
            <Ionicons name="close" size={24} color="#F44336" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.taskContainer}>
          <View style={styles.taskInfo}>
            <Text style={styles.taskText}>{item.description}</Text>
            <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => startEditing(item.id, item.description)}
              style={styles.iconButton}
            >
              <Ionicons name="pencil" size={20} color="#2196F3" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDeleteTask(item.id)}
              style={styles.iconButton}
            >
              <Ionicons name="trash" size={20} color="#F44336" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginVertical: 16,
  },
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  taskContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskInfo: {
    flex: 1,
    marginRight: 8,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  editContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    gap: 8,
  },
  editInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    fontSize: 16,
  },
});