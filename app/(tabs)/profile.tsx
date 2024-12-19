// app/(tabs)/profile.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  // Separate state for each field to prevent focus issues
  const [name, setName] = useState('John Doe');
  const [department, setDepartment] = useState('Engineering');
  const [subDepartment, setSubDepartment] = useState('Software Development');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    // Handle save logic here
    if (password) {
      console.log('Password change requested:', password);
    }
    setPassword('');
    setIsEditing(false);
  };

  const handleLogout = () => {
    router.replace('/login');
  };

  const renderField = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    isPassword: boolean = false
  ) => {
    if (isEditing) {
      return (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={isPassword ? "Enter new password" : `Enter ${label.toLowerCase()}`}
            secureTextEntry={isPassword}
          />
        </View>
      );
    }

    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {isPassword ? '*****' : value}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        >
          <Ionicons
            name={isEditing ? "checkmark" : "pencil"}
            size={24}
            color="#2196F3"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          {renderField("Name", name, setName)}
          {renderField("Department", department, setDepartment)}
          {renderField("Sub Department", subDepartment, setSubDepartment)}
          {renderField("Password", password, setPassword, true)}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
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
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  logoutButton: {
    backgroundColor: '#F44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});