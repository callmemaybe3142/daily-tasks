// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useSegments, useRouter } from 'expo-router';
import { TaskProvider } from '@/context/TaskContext';

const RootLayout = () => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    // Check if user is authenticated
    const isAuthenticated = true; // Replace with your auth logic

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)/input-tasks');
    }
  }, [segments]);

  return (
    <TaskProvider>
    <Stack>
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
    </TaskProvider>
  );
};

export default RootLayout;
