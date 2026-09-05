import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/common/AppNavbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import MentorList from './pages/mentor/MentorList'
import MentorDetail from './pages/mentor/MentorDetail'
import MentorDashboard from './pages/mentor/MentorDashboard'
import MenteeDashboard from './pages/mentee/MenteeDashboard'
import BookSession from './pages/booking/BookSession'
import EditProfile from './pages/profile/EditProfile'
import ProtectedRoute from './components/common/ProtectedRoute'

import { useTheme } from './context/ThemeContext'

const AppLayout = () => {
  const { pathname } = useLocation()
  const { theme } = useTheme()
  const hideFooter = pathname === '/login' || pathname === '/signup'

  return (
    <div className={`app-main-layout ${theme}`} data-theme={theme}>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/mentors" element={<MentorList />} />
        <Route path="/mentors/:id" element={<MentorDetail />} />

        {/* Protected Routes */}
        <Route path="/book/:mentorId" element={
          <ProtectedRoute><BookSession /></ProtectedRoute>
        } />
        <Route path="/dashboard/mentee" element={
          <ProtectedRoute><MenteeDashboard /></ProtectedRoute>
        } />
        <Route path="/dashboard/mentor" element={
          <ProtectedRoute><MentorDashboard /></ProtectedRoute>
        } />
        <Route path="/profile/edit" element={
          <ProtectedRoute><EditProfile /></ProtectedRoute>
        } />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App
