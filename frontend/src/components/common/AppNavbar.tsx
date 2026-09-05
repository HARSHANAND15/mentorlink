import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

interface DomainItem {
  id: string
  name: string
  desc: string
  icon: string
}

const domainItems: DomainItem[] = [
  { id: 'FinTech', name: 'FinTech', desc: 'Trading, Crypto, Payments & Banking', icon: '💳' },
  { id: 'EdTech', name: 'EdTech', desc: 'Learning Systems, Pedagogy & Scale', icon: '🎓' },
  { id: 'Career', name: 'Career', desc: 'Leadership, Career Transition & Prep', icon: '🚀' },
  { id: 'SaaS', name: 'SaaS', desc: 'B2B Growth, Cloud Infra & Product', icon: '⚡' },
  { id: 'Design', name: 'Design', desc: 'UI/UX, Design Systems & Motion', icon: '🎨' },
]

const AppNavbar = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false)
  const domainRef = useRef<HTMLLIElement>(null)

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setDomainDropdownOpen(false)
  }, [location.pathname, location.search])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (domainRef.current && !domainRef.current.contains(event.target as Node)) {
        setDomainDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand app-brand" to="/">
          <span className="brand-mark">ML</span>
          <span>
            <span className="brand-text-main">Mentor</span>
            <span className="brand-text-accent">Link</span>
          </span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler-custom"
          type="button"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* Navbar Menu */}
        <div className={`navbar-collapse-custom ${mobileOpen ? 'show' : 'd-none d-lg-flex'}`}>
          <ul className="navbar-nav app-nav-links mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/mentors">
                Find Mentors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/#how-it-works">
                How it Works
              </NavLink>
            </li>

            {/* Compact & Attractive Specialized Domains Dropdown */}
            <li
              className="nav-item app-domain-dropdown-wrap"
              ref={domainRef}
              onMouseEnter={() => setDomainDropdownOpen(true)}
              onMouseLeave={() => setDomainDropdownOpen(false)}
            >
              <button
                type="button"
                className={`nav-link app-domain-toggle ${domainDropdownOpen ? 'is-open active' : ''}`}
                onClick={() => setDomainDropdownOpen(prev => !prev)}
                aria-expanded={domainDropdownOpen}
              >
                <span>Domains</span>
                <svg
                  className="domain-caret-svg"
                  viewBox="0 0 8 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L4 4L7 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className={`app-domain-menu ${domainDropdownOpen ? 'show' : ''}`}>
                <div className="domain-menu-header">
                  <span className="domain-menu-title">Specialized Domains</span>
                  <Link
                    className="domain-menu-all"
                    to="/mentors"
                    onClick={() => setDomainDropdownOpen(false)}
                  >
                    View All →
                  </Link>
                </div>

                <div className="domain-grid">
                  {domainItems.map(domain => (
                    <Link
                      key={domain.id}
                      className="domain-card-link"
                      to={`/mentors?domain=${domain.id}`}
                      onClick={() => setDomainDropdownOpen(false)}
                    >
                      <div className="domain-icon-box">
                        <span>{domain.icon}</span>
                      </div>
                      <div className="domain-info">
                        <span className="domain-name-text">{domain.name}</span>
                        <span className="domain-subtext">{domain.desc}</span>
                      </div>
                      <span className="domain-arrow-indicator">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/blog">
                Blog
              </NavLink>
            </li>
          </ul>

          {/* Action Buttons & Day/Night Theme Toggle */}
          <div className="navbar-actions">
            {/* Day / Night Switch */}
            <button
              type="button"
              className={`nav-theme-toggle-btn ${theme}`}
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="theme-switch-track">
                <span className="theme-switch-thumb">
                  {theme === 'dark' ? (
                    <svg className="theme-svg moon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg className="theme-svg sun" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="4.5" strokeWidth="2" fill="currentColor"/>
                      <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2.2" strokeLinecap="round"/>
                      <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2.2" strokeLinecap="round"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2.2" strokeLinecap="round"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2.2" strokeLinecap="round"/>
                      <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2.2" strokeLinecap="round"/>
                      <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2.2" strokeLinecap="round"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2.2" strokeLinecap="round"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                  )}
                </span>
              </span>
            </button>

            {user ? (
              <>
                <Link
                  className="user-pill"
                  to={user.role === 'mentor' ? '/dashboard/mentor' : '/dashboard/mentee'}
                >
                  {user.name}
                </Link>
                <button className="nav-ghost-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-login-link" to="/signup">
                  Become a Mentor
                </Link>
                <Link className="nav-cta-btn" to="/login">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
