import { Stack, useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { events } from '../../src/data/events'

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const event = events.find((e) => e.id === Number(id))

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
      <Text style={styles.line}>{`Place: ${event.place}`}</Text>
      <Text style={styles.line}>{`Seats: ${event.seats}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#ffffff' },
  title: { fontSize: 28, fontWeight: '700', color: '#1f2937', marginBottom: 16 },
  line: { fontSize: 18, color: '#1f2937', marginBottom: 8 },
})
