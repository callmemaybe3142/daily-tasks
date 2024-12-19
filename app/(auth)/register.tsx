import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();

  const handleRegister = () => {
    // Add your register logic here
    router.replace('/daily-tasks');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput 
        style={styles.input}
        placeholder="Email"
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput 
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    button: {
      width: '100%',
      height: 40,
      backgroundColor: '#007AFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginBottom: 10,
    },
    logoutButton: {
      width: '100%',
      height: 40,
      backgroundColor: '#FF3B30',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });