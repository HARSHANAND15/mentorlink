import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const EditProfile = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<'basic' | 'mentor' | 'password'>('basic')
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Basic Info State
  const [basicForm, setBasicForm] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    avatar: '',
  })

  // Mentor Profile State
  const [mentorForm, setMentorForm] = useState({
    title: '',
    expertise: '',
    experience: '',
    hourlyRate: '',
    sessionDuration: '60',
    skills: '',
    linkedIn: '',
    github: '',
    languages: 'English, Hindi',
  })

  // Password State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Pre-fill from auth context
  useEffect(() => {
    if (user) {
      setBasicForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }))
    }
  }, [user])

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg)
    setErrorMsg('')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  const showError = (msg: string) => {
    setErrorMsg(msg)
    setSuccessMsg('')
    setTimeout(() => setErrorMsg(''), 3000)
  }

  // Handle Basic Info Save
  const handleBasicSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // API call yahan hogi — abhi demo
      await new Promise(res => setTimeout(res, 800))
      if (user) {
        login({ ...user, name: basicForm.name })
      }
      showSuccess('Profile updated successfully!')
    } catch {
      showError('Failed to update profile. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Mentor Profile Save
  const handleMentorSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await new Promise(res => setTimeout(res, 800))
      showSuccess('Mentor profile updated successfully!')
    } catch {
      showError('Failed to update mentor profile.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Password Save
  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showError('New passwords do not match.')
      return
    }
    if (passwordForm.newPassword.length < 6) {
      showError('Password must be at least 6 characters.')
      return
    }
    setIsLoading(true)
    try {
      await new Promise(res => setTimeout(res, 800))
      showSuccess('Password changed successfully!')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch {
      showError('Failed to change password.')
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#fff',
    outline: 'none',
    width: '100%',
    fontSize: '0.9rem',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    color: '#94a3b8',
    fontSize: '0.82rem',
    fontWeight: 700,
    marginBottom: '8px',
    display: 'block',
    letterSpacing: '0.03em',
  }

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '👤' },
    ...(user?.role === 'mentor' ? [{ id: 'mentor', label: 'Mentor Profile', icon: '🎓' }] : []),
    { id: 'password', label: 'Password', icon: '🔒' },
  ] as { id: 'basic' | 'mentor' | 'password'; label: string; icon: string }[]

  return (
    <div style={{ background: '#0a0a1a', minHeight: '100vh', color: '#fff', paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '860px' }}>

        {/* ===== PAGE HEADER ===== */}
        <div className="mb-5">
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none', border: 'none',
              color: '#475569', cursor: 'pointer',
              fontSize: '0.85rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '6px',
              marginBottom: '20px', padding: 0,
            }}
          >
            ← Back
          </button>

          <div className="d-flex align-items-center gap-4">
            {/* Avatar */}
            <div style={{
              width: '72px', height: '72px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 900, color: '#fff',
              boxShadow: '0 8px 24px rgba(124,58,237,0.35)',
              flexShrink: 0,
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '4px' }}>
                Edit Profile
              </h1>
              <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0 }}>
                {user?.email} · {' '}
                <span style={{
                  color: user?.role === 'mentor' ? '#00b09b' : '#a78bfa',
                  fontWeight: 700,
                }}>
                  {user?.role === 'mentor' ? '🎓 Mentor' : '👤 Mentee'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ===== SUCCESS / ERROR ALERTS ===== */}
        {successMsg && (
          <div style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '12px', padding: '14px 20px',
            color: '#22c55e', fontWeight: 600, fontSize: '0.9rem',
            marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            ✅ {successMsg}
          </div>
        )}
        {errorMsg && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px', padding: '14px 20px',
            color: '#f87171', fontWeight: 600, fontSize: '0.9rem',
            marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            ❌ {errorMsg}
          </div>
        )}

        <div className="row g-4">

          {/* ===== LEFT — TAB SIDEBAR ===== */}
          <div className="col-lg-3">
            <div style={{
              background: '#111126',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '12px',
              position: 'sticky',
              top: '80px',
            }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSuccessMsg(''); setErrorMsg('') }}
                  style={{
                    width: '100%',
                    background: activeTab === tab.id
                      ? 'rgba(124,58,237,0.15)'
                      : 'transparent',
                    border: activeTab === tab.id
                      ? '1px solid rgba(124,58,237,0.3)'
                      : '1px solid transparent',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: activeTab === tab.id ? '#c4b5fd' : '#64748b',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '4px',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                  }}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}

              {/* Danger Zone */}
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                marginTop: '12px',
                paddingTop: '12px',
              }}>
                <button style={{
                  width: '100%',
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  color: '#f87171',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* ===== RIGHT — FORM AREA ===== */}
          <div className="col-lg-9">

            {/* ---- BASIC INFO TAB ---- */}
            {activeTab === 'basic' && (
              <form onSubmit={handleBasicSave}>
                <div style={{
                  background: '#111126',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '28px',
                  marginBottom: '16px',
                }}>
                  <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '24px', fontSize: '1rem' }}>
                    Basic Information
                  </h4>

                  <div className="row g-3">
                    {/* Full Name */}
                    <div className="col-md-6">
                      <label style={labelStyle}>Full Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={basicForm.name}
                        onChange={e => setBasicForm({ ...basicForm, name: e.target.value })}
                        style={inputStyle}
                        required
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={basicForm.email}
                        onChange={e => setBasicForm({ ...basicForm, email: e.target.value })}
                        style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }}
                        disabled
                      />
                      <p style={{ color: '#334155', fontSize: '0.72rem', marginTop: '4px' }}>
                        Email cannot be changed
                      </p>
                    </div>

                    {/* Location */}
                    <div className="col-md-6">
                      <label style={labelStyle}>Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Bengaluru, India"
                        value={basicForm.location}
                        onChange={e => setBasicForm({ ...basicForm, location: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    {/* Avatar URL */}
                    <div className="col-md-6">
                      <label style={labelStyle}>Avatar URL</label>
                      <input
                        type="url"
                        placeholder="https://your-photo-url.com"
                        value={basicForm.avatar}
                        onChange={e => setBasicForm({ ...basicForm, avatar: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    {/* Bio */}
                    <div className="col-12">
                      <label style={labelStyle}>Bio</label>
                      <textarea
                        placeholder="Tell others about yourself..."
                        value={basicForm.bio}
                        onChange={e => setBasicForm({ ...basicForm, bio: e.target.value })}
                        rows={4}
                        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                      <p style={{ color: '#334155', fontSize: '0.72rem', marginTop: '4px' }}>
                        {basicForm.bio.length}/500 characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 32px',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {isLoading ? (
                      <><span className="spinner-border spinner-border-sm" /> Saving...</>
                    ) : (
                      '✓ Save Changes'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ---- MENTOR PROFILE TAB ---- */}
            {activeTab === 'mentor' && (
              <form onSubmit={handleMentorSave}>
                <div style={{
                  background: '#111126',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '28px',
                  marginBottom: '16px',
                }}>
                  <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '6px', fontSize: '1rem' }}>
                    Mentor Profile
                  </h4>
                  <p style={{ color: '#475569', fontSize: '0.82rem', marginBottom: '24px' }}>
                    This information is shown to mentees on your public profile.
                  </p>

                  <div className="row g-3">
                    {/* Title */}
                    <div className="col-12">
                      <label style={labelStyle}>Professional Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Senior Product Manager · Razorpay"
                        value={mentorForm.title}
                        onChange={e => setMentorForm({ ...mentorForm, title: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    {/* Expertise */}
                    <div className="col-md-6">
                      <label style={labelStyle}>Domain / Expertise</label>
                      <select
                        value={mentorForm.expertise}
                        onChange={e => setMentorForm({ ...mentorForm, expertise: e.target.value })}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        <option value="" style={{ background: '#111126' }}>Select domain</option>
                        {['EdTech', 'FinTech', 'SaaS', 'Design', 'Career'].map(d => (
                          <option key={d} value={d} style={{ background: '#111126' }}>{d}</option>
                        ))}
                      </select>
                    </div>

                    {/* Experience */}
                    <div className="col-md-6">
                      <label style={labelStyle}>Years of Experience</label>
                      <input
                        type="number"
                        placeholder="e.g. 5"
                        min="0"
                        max="40"
                        value={mentorForm.experience}
                        onChange={e => setMentorForm({ ...mentorForm, experience: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    {/* Hourly Rate */}
                    <div className="col-md-6">
                      <label style={labelStyle}>Session Rate (₹)</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{
                          position: 'absolute', left: '14px', top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#64748b', fontWeight: 700,
                        }}>₹</span>
                        <input
                          type="number"
                          placeholder="1500"
                          min="100"
                          value={mentorForm.hourlyRate}
                          onChange={e => setMentorForm({ ...mentorForm, hourlyRate: e.target.value })}
                          style={{ ...inputStyle, paddingLeft: '32px' }}
                          onFocus={e => e.target.style.borderColor = '#7c3aed'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                      </div>
                    </div>

                    {/* Session Duration */}
                    <div className="col-md-6">
                      <label style={labelStyle}>Session Duration</label>
                      <select
                        value={mentorForm.sessionDuration}
                        onChange={e => setMentorForm({ ...mentorForm, sessionDuration: e.target.value })}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        {['30', '45', '60', '90'].map(d => (
                          <option key={d} value={d} style={{ background: '#111126' }}>{d} minutes</option>
                        ))}
                      </select>
                    </div>

                    {/* Skills */}
                    <div className="col-12">
                      <label style={labelStyle}>Skills (comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. System Design, DSA, FAANG Prep, Career Switch"
                        value={mentorForm.skills}
                        onChange={e => setMentorForm({ ...mentorForm, skills: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                      {/* Skills Preview */}
                      {mentorForm.skills && (
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {mentorForm.skills.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                            <span key={skill} style={{
                              background: 'rgba(124,58,237,0.15)',
                              border: '1px solid rgba(124,58,237,0.3)',
                              borderRadius: '8px',
                              padding: '3px 10px',
                              fontSize: '0.75rem',
                              color: '#c4b5fd',
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Languages */}
                    <div className="col-12">
                      <label style={labelStyle}>Languages (comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. English, Hindi, Tamil"
                        value={mentorForm.languages}
                        onChange={e => setMentorForm({ ...mentorForm, languages: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    {/* LinkedIn */}
                    <div className="col-md-6">
                      <label style={labelStyle}>LinkedIn URL</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/yourname"
                        value={mentorForm.linkedIn}
                        onChange={e => setMentorForm({ ...mentorForm, linkedIn: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    {/* GitHub */}
                    <div className="col-md-6">
                      <label style={labelStyle}>GitHub URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/yourname"
                        value={mentorForm.github}
                        onChange={e => setMentorForm({ ...mentorForm, github: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                      border: 'none', borderRadius: '12px',
                      padding: '12px 32px', color: '#fff',
                      fontWeight: 700, fontSize: '0.9rem',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.7 : 1,
                      display: 'flex', alignItems: 'center', gap: '8px',
                    }}
                  >
                    {isLoading ? (
                      <><span className="spinner-border spinner-border-sm" /> Saving...</>
                    ) : (
                      '✓ Save Mentor Profile'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ---- PASSWORD TAB ---- */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSave}>
                <div style={{
                  background: '#111126',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '28px',
                  marginBottom: '16px',
                }}>
                  <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '6px', fontSize: '1rem' }}>
                    Change Password
                  </h4>
                  <p style={{ color: '#475569', fontSize: '0.82rem', marginBottom: '24px' }}>
                    Use a strong password with at least 6 characters.
                  </p>

                  <div className="row g-3">
                    <div className="col-12">
                      <label style={labelStyle}>Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        value={passwordForm.currentPassword}
                        onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        style={inputStyle}
                        required
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    <div className="col-md-6">
                      <label style={labelStyle}>New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={passwordForm.newPassword}
                        onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        style={inputStyle}
                        required
                        minLength={6}
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    <div className="col-md-6">
                      <label style={labelStyle}>Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={passwordForm.confirmPassword}
                        onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        style={{
                          ...inputStyle,
                          borderColor: passwordForm.confirmPassword &&
                            passwordForm.newPassword !== passwordForm.confirmPassword
                            ? '#ef4444'
                            : passwordForm.confirmPassword &&
                              passwordForm.newPassword === passwordForm.confirmPassword
                              ? '#22c55e'
                              : 'rgba(255,255,255,0.1)',
                        }}
                        required
                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                        onBlur={e => {
                          e.target.style.borderColor =
                            passwordForm.newPassword !== passwordForm.confirmPassword
                              ? '#ef4444' : 'rgba(255,255,255,0.1)'
                        }}
                      />
                      {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                        <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '4px' }}>
                          Passwords do not match
                        </p>
                      )}
                      {passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword && (
                        <p style={{ color: '#22c55e', fontSize: '0.72rem', marginTop: '4px' }}>
                          ✓ Passwords match
                        </p>
                      )}
                    </div>

                    {/* Password strength */}
                    {passwordForm.newPassword && (
                      <div className="col-12">
                        <label style={{ ...labelStyle, marginBottom: '8px' }}>Password Strength</label>
                        <div className="d-flex gap-2">
                          {[1, 2, 3].map(i => {
                            const len = passwordForm.newPassword.length
                            const hasUpper = /[A-Z]/.test(passwordForm.newPassword)
                            const hasNum = /[0-9]/.test(passwordForm.newPassword)
                            const strength = (len >= 6 ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNum ? 1 : 0)
                            const color = strength === 1 ? '#ef4444' : strength === 2 ? '#f59e0b' : '#22c55e'
                            return (
                              <div key={i} style={{
                                flex: 1, height: '4px', borderRadius: '999px',
                                background: i <= strength ? color : 'rgba(255,255,255,0.08)',
                                transition: 'background 0.3s',
                              }} />
                            )
                          })}
                        </div>
                        <p style={{ color: '#475569', fontSize: '0.72rem', marginTop: '6px' }}>
                          {(() => {
                            const len = passwordForm.newPassword.length
                            const hasUpper = /[A-Z]/.test(passwordForm.newPassword)
                            const hasNum = /[0-9]/.test(passwordForm.newPassword)
                            const strength = (len >= 6 ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNum ? 1 : 0)
                            return strength === 1 ? '⚠️ Weak' : strength === 2 ? '🟡 Moderate' : '✅ Strong'
                          })()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                      border: 'none', borderRadius: '12px',
                      padding: '12px 32px', color: '#fff',
                      fontWeight: 700, fontSize: '0.9rem',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.7 : 1,
                      display: 'flex', alignItems: 'center', gap: '8px',
                    }}
                  >
                    {isLoading ? (
                      <><span className="spinner-border spinner-border-sm" /> Changing...</>
                    ) : (
                      '🔒 Change Password'
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile