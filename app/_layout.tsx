import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="events/index" options={{ title: 'Events' }} />
      </Stack>
    </QueryClientProvider>
  )
}
