import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    // Add your login logic here
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input}
        placeholder="Email"
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text>Don't have an account? Register</Text>
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