import axiosInstance from './axiosInstance'
import type { CreateBookingData, IBooking } from '../types/booking.types'

export const createBookingApi = async (data: CreateBookingData): Promise<IBooking> => {
  const response = await axiosInstance.post('/bookings', data)
  return response.data.data || response.data
}

export const getMyBookingsApi = async (): Promise<IBooking[]> => {
  const response = await axiosInstance.get('/bookings/me')
  return response.data.data || response.data
}

export const updateBookingStatusApi = async (
  bookingId: string,
  status: IBooking['status'],
): Promise<IBooking> => {
  const response = await axiosInstance.patch(`/bookings/${bookingId}/status`, { status })
  return response.data.data || response.data
}
