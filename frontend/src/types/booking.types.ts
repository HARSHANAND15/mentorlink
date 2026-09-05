import type { IMentor } from './mentor.types'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface IBooking {
  _id: string
  mentor?: IMentor
  mentee?: {
    _id: string
    name: string
    email?: string
  }
  date: string
  slot: string
  topic: string
  status: BookingStatus
  amount?: number
}

export interface CreateBookingData {
  mentorId: string
  date: string
  slot: string
  topic: string
}
