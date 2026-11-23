import { Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEvents } from '../../src/hooks/useEvents'
import HolidayNote from '../../src/components/HolidayNote'

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isPending, isError, error, refetch } = useEvents()

  if (isPending) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: 'Event' }} />
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading events</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: 'Event' }} />
        <Text style={styles.message}>Could not load events</Text>
        <Text style={styles.message}>{error.message}</Text>
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    )
  }

  const event = data.find((e) => e.id === Number(id))

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Event' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.line}>{`No event with id ${id}.`}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.line}>{`Date: ${event.date}`}</Text>
      <HolidayNote date={event.date} />
      <Text style={styles.line}>{`Place: ${event.place}`}</Text>
      <Text style={styles.line}>{`Seats: ${event.seats}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#ffffff' },
  center: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  message: { fontSize: 18, color: '#1f2937', textAlign: 'center', marginTop: 8 },
  button: {
    minHeight: 44,
    paddingHorizontal: 20,
    marginTop: 16,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  buttonText: { fontSize: 16, color: '#ffffff', fontWeight: '600' },
  title: { fontSize: 28, fontWeight: '700', color: '#1f2937', marginBottom: 16 },
  line: { fontSize: 18, color: '#1f2937', marginBottom: 8 },
})