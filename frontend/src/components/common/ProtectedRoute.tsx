import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loader from './Loader'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth()

  // Auth check ho raha hai — loader dikhao
  if (isLoading) {
    return <Loader />
  }

  // Login nahi hai — login page pe bhejo
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Login hai — page dikhao
  return <>{children}</>
}

export default ProtectedRoute
