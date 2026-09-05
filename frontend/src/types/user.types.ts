export interface IUser {
  _id: string
  name: string
  email: string
  role: 'mentor' | 'mentee'
  avatar?: string
  token: string
}

export interface IAuthState {
  user: IUser | null
  isLoading: boolean
}