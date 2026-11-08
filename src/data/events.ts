export type CampusEvent = {
    id: number
    title: string
    date: string
    place: string
    seats: number
  }
  
  export const events: CampusEvent[] = [
    { id: 1, title: 'SIS2 defence', date: '2026-10-23', place: 'Room 222', seats: 60 },
    { id: 2, title: 'Midterm', date: '2026-10-23', place: 'Room 332', seats: 20 },
    { id: 3, title: 'KBTU conference', date: '2026-11-05', place: 'Independence hall', seats: 300 },
    { id: 4, title: 'Start up discution', date: '2026-11-12', place: 'Library, floor 2', seats: 3 },
  ]
