// components/TaskForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface TaskFormProps {
  label: string;
  defaultDate: string;
  onAddTask: (description: string, date: string) => void;
  isFixed?: boolean;
}

export function TaskForm({ label, defaultDate, onAddTask, isFixed = false }: TaskFormProps) {
  const [date, setDate] = useState(new Date(defaultDate));
  const [taskInput, setTaskInput] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate && !isFixed) {
      setDate(selectedDate);
    }
  };

  const handleAddTask = () => {
    if (taskInput.trim()) {
      onAddTask(taskInput.trim(), formatDate(date));
      setTaskInput('');
    }
  };

  const renderDateInput = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="date"
          value={formatDate(date)}
          onChange={(e) => !isFixed && setDate(new Date(e.target.value))}
          disabled={isFixed}
          style={{
            height: 40,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            borderRadius: 8,
            padding: 8,
            backgroundColor: 'white',
            width: '100%',
          }}
        />
      );
    }

    return (
      <View>
        <Pressable
          onPress={() => !isFixed && setShowDatePicker(true)}
          style={[
            styles.dateInput,
            isFixed && styles.dateInputDisabled
          ]}
        >
          <Text style={styles.dateText}>
            {formatDate(date)}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dateContainer}>
        {renderDateInput()}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={taskInput}
          onChangeText={setTaskInput}
          placeholder="လုပ်ငန်းဆောင်တာ ရေးရန်..."
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  dateContainer: {
    marginBottom: 12,
  },
  dateInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  dateInputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    fontSize: 16,
  },
  addButton: {
    padding: 8,
  },
});