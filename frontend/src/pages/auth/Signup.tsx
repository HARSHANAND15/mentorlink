import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { signupApi } from '../../api/authApi'
import hero from '../../assets/hero.png'

const Signup = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'mentee' as 'mentor' | 'mentee',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)

    try {
      const { confirmPassword, ...signupData } = formData
      void confirmPassword
      const userData = await signupApi(signupData)
      login(userData)
      navigate(userData.role === 'mentor'
        ? '/dashboard/mentor'
        : '/dashboard/mentee')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-visual d-none d-lg-flex">
          <img src={hero} alt="Mentorship community" />
          <div className="auth-visual-overlay" />
          <div className="layer-animation" aria-hidden="true">
            <div className="layer-card layer-card-top" />
            <div className="layer-card layer-card-bottom" />
            <span className="layer-guide layer-guide-left" />
            <span className="layer-guide layer-guide-right" />
          </div>
          <div className="auth-quote">
            <div className="quote-simulation">
              <span>Choose your domain</span>
              <span>Book focused sessions</span>
              <span>Grow with verified experts</span>
            </div>
            <p>Start with one session. Build a clearer career path.</p>
          </div>
        </section>

        <section className="auth-panel">
          <div className="auth-card">
            <div className="auth-mark">ML</div>
            <div className="text-center mb-4">
              <span className="auth-kicker">Mentor Link</span>
              <h1 className="auth-title">Create your account</h1>
              <p className="auth-subtitle">Join learners and professionals across EdTech, FinTech, SaaS, and career growth.</p>
            </div>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
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

              <div className="auth-meter" aria-hidden="true">
                <span className={formData.password.length >= 1 ? 'active' : ''} />
                <span className={formData.password.length >= 6 ? 'active' : ''} />
                <span className={formData.password.length >= 10 ? 'active' : ''} />
              </div>

              <div className="auth-field">
                <label>Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>

              <div className="auth-role">
                <label>I want to</label>
                <div>
                  <button
                    type="button"
                    className={formData.role === 'mentee' ? 'active' : ''}
                    onClick={() => setFormData({ ...formData, role: 'mentee' })}
                  >
                    Find a mentor
                  </button>
                  <button
                    type="button"
                    className={formData.role === 'mentor' ? 'active' : ''}
                    onClick={() => setFormData({ ...formData, role: 'mentor' })}
                  >
                    Become a mentor
                  </button>
                </div>
              </div>

              <label className="auth-check">
                <input type="checkbox" />
                <span>Send me useful career tips and session updates</span>
              </label>

              <button
                type="submit"
                className="auth-submit"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Signup
