export interface IMentor {
  _id: string
  id?: string
  name?: string
  title?: string
  bio?: string
  skills: string[]
  rating?: number
  hourlyRate?: number
  sessionDuration?: number
  totalSessions?: number
  avgRating?: number
  domain?: string
  location?: string
  availability?: string
  rate?: number
  sessions?: number
  company?: string
  role?: string
  verified?: boolean
  user?: {
    _id: string
    name: string
    email: string
    avatar?: string
  }
  userId?: {
    _id: string
    name: string
    email: string
    avatar?: string
  }
}