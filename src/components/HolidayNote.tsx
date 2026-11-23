import { StyleSheet, Text } from 'react-native'
import { useHolidays } from '../hooks/useHolidays'

export default function HolidayNote({ date }: { date: string }) {
  const year = Number(date.slice(0, 4))
  const { data, isPending, isError } = useHolidays(year)

  let message: string
  if (isPending) {
    message = 'Checking holidays'
  } else if (isError) {
    message = 'Holidays unavailable'
  } else {
    const holiday = data.find((h) => h.date === date)
    message = holiday ? `Public holiday: ${holiday.name}` : 'Not a public holiday'
  }

  return <Text style={styles.note}>{message}</Text>
}

const styles = StyleSheet.create({
  note: { fontSize: 18, color: '#1f2937', marginBottom: 8 },
})