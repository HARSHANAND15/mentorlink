import axiosInstance from './axiosInstance'
import type { IMentor } from '../types/mentor.types'

// Get all mentors with optional filters
export const getMentorsApi = async (params?: {
  domain?: string
  search?: string
  minRating?: number
  maxRate?: number
}): Promise<IMentor[]> => {
  const response = await axiosInstance.get('/mentors', { params })
  return response.data.data
}

// Get single mentor by ID
export const getMentorByIdApi = async (id: string): Promise<IMentor> => {
  const response = await axiosInstance.get(`/mentors/${id}`)
  return response.data.data
}

// Create mentor profile
export const createMentorProfileApi = async (data: Partial<IMentor>): Promise<IMentor> => {
  const response = await axiosInstance.post('/mentors/profile', data)
  return response.data.data
}

// Update mentor profile
export const updateMentorProfileApi = async (data: Partial<IMentor>): Promise<IMentor> => {
  const response = await axiosInstance.put('/mentors/profile', data)
  return response.data.data
}

// Add availability slots
export const addAvailabilityApi = async (slots: {
  dayOfWeek: string
  startTime: string
  endTime: string
}[]): Promise<void> => {
  await axiosInstance.post('/mentors/availability', { slots })
}

// Get mentor availability slots
export const getMentorSlotsApi = async (mentorId: string): Promise<{
  _id: string
  dayOfWeek: string
  startTime: string
  endTime: string
  isBooked: boolean
}[]> => {
  const response = await axiosInstance.get(`/mentors/${mentorId}/slots`)
  return response.data.data
}
