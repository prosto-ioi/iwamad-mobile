import { Link, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Not found' }} />
      <Text style={styles.title}>Page not found</Text>
      <Link href="/" style={styles.link}>Go home</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#ffffff' },
  title: { fontSize: 28, fontWeight: '700', color: '#1f2937', marginBottom: 16 },
  link: { fontSize: 18, color: '#1d4ed8', paddingVertical: 12 },
})
