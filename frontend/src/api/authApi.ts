import axiosInstance from './axiosInstance'
import type { IUser } from '../types/user.types'

interface SignupData {
  name: string
  email: string
  password: string
  role: 'mentor' | 'mentee'
}

interface LoginData {
  email: string
  password: string
}

// Signup API call
export const signupApi = async (data: SignupData): Promise<IUser> => {
  const response = await axiosInstance.post('/auth/signup', data)
  return response.data.data
}

// Login API call
export const loginApi = async (data: LoginData): Promise<IUser> => {
  const response = await axiosInstance.post('/auth/login', data)
  return response.data.data
}

// Get current user
export const getMeApi = async (): Promise<IUser> => {
  const response = await axiosInstance.get('/auth/me')
  return response.data.data
}
