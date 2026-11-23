import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import EventRow from '../../src/components/EventRow'
import { useEvents } from '../../src/hooks/useEvents'
import { useSavedIds } from '../../src/hooks/useSavedIds'

export default function EventsScreen() {
  const [query, setQuery] = useState('')
  const { savedIds, toggleSaved } = useSavedIds()
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents()

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading events</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Could not load events</Text>
        <Text style={styles.message}>{error.message}</Text>
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    )
  }

  // computed on every render, not stored in a second useState
  const visible = data.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        {`Long-press an event to save it. Saved: ${savedIds.length}`}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Search events"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={visible}
        keyExtractor={(e) => String(e.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  center: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  message: { fontSize: 16, color: '#374151', textAlign: 'center', marginTop: 8 },
  button: {
    minHeight: 44,
    paddingHorizontal: 20,
    marginTop: 16,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  buttonText: { fontSize: 16, color: '#ffffff', fontWeight: '600' },
  hint: { fontSize: 14, color: '#374151', marginBottom: 12 },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  empty: { fontSize: 16, color: '#374151', textAlign: 'center', marginTop: 24 },
})