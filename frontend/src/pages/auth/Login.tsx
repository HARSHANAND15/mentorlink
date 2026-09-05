import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loginApi } from '../../api/authApi'
import hero from '../../assets/hero.png'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const userData = await loginApi(formData)
      login(userData)
      navigate(userData.role === 'mentor'
        ? '/dashboard/mentor'
        : '/dashboard/mentee')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-shell auth-shell-login">
        <section className="auth-visual d-none d-lg-flex">
          <img src={hero} alt="Mentor and mentee planning a career path" />
          <div className="auth-visual-overlay" />
          <div className="layer-animation" aria-hidden="true">
            <div className="layer-card layer-card-top" />
            <div className="layer-card layer-card-bottom" />
            <span className="layer-guide layer-guide-left" />
            <span className="layer-guide layer-guide-right" />
          </div>
          <div className="auth-quote">
            <div className="quote-simulation">
              <span>500+ verified mentors</span>
              <span>12,400+ sessions booked</span>
              <span>Pay per session</span>
            </div>
            <p>Pick up exactly where your career plan left off.</p>
          </div>
        </section>

        <section className="auth-panel">
          <div className="auth-card">
            <div className="auth-mark">ML</div>
            <div className="text-center mb-4">
              <span className="auth-kicker">Mentor Link</span>
              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-subtitle">Sign in to manage sessions, bookings, and mentor conversations.</p>
            </div>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label>Password</label>
                <div className="auth-password">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="text-end mb-4">
                <Link to="/signup" className="auth-small-link">Forgot password?</Link>
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Sign in'}
              </button>
            </form>

            <div className="auth-divider"><span>trusted access</span></div>
            <div className="auth-socials">
              <button type="button">Google</button>
              <button type="button">LinkedIn</button>
              <button type="button">Email</button>
            </div>

            <p className="auth-switch">
              Don't have an account? <Link to="/signup">Create one</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
