import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import EventRow from '../../src/components/EventRow'
import { events } from '../../src/data/events'

export default function EventsScreen() {
  const [query, setQuery] = useState('')
  const [savedIds, setSavedIds] = useState<number[]>([])

  // computed on every render, not stored in a second useState
  const visible = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()),
  )

  const toggleSaved = (id: number) => {
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
  }

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
