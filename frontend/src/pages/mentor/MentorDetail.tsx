import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMentorByIdApi } from '../../api/mentorApi'
import StarRating from '../../components/common/StarRating'
import Loader from '../../components/common/Loader'
import type { IMentor } from '../../types/mentor.types'

// Demo mentors — backend ready hone tak ye use hoga
const demoMentors: IMentor[] = [
  {
    _id: '1',
    name: 'Sneha Kapoor',
    title: 'Career Coach · ex-McKinsey',
    bio: "Former McKinsey consultant turned career coach. I've helped 200+ professionals land their dream roles through strategic resume building, mock interviews, and personalized career roadmaps. Whether you're switching industries or climbing the ladder, I'll help you get there faster.",
    skills: ['Career Guidance', 'MBA Prep', 'Consulting', 'Interview Prep', 'Resume Review'],
    rating: 5.0,
    hourlyRate: 1800,
    sessionDuration: 60,
    totalSessions: 490,
    domain: 'Career',
    location: 'Mumbai',
    availability: 'Today',
    rate: 1800,
    verified: true,
  },
  {
    _id: '2',
    name: 'Vikram Nair',
    title: 'Engineering Manager · Flipkart',
    bio: "EM at Flipkart leading a 20-person team. I specialize in helping engineers crack FAANG system design rounds with a structured, battle-tested approach. I've helped 300+ engineers land roles at Google, Amazon, and Microsoft.",
    skills: ['System Design', 'Engineering Leadership', 'DSA', 'FAANG Prep', 'Team Building'],
    rating: 4.8,
    hourlyRate: 2200,
    sessionDuration: 60,
    totalSessions: 420,
    domain: 'EdTech',
    location: 'Bengaluru',
    availability: 'This week',
    rate: 2200,
    verified: true,
  },
  {
    _id: '3',
    name: 'Priya Sharma',
    title: 'Product Manager · Razorpay',
    bio: '7 years building payment products at scale at Razorpay. I help PMs break into FinTech and navigate 0-to-1 product thinking. My mentees have landed roles at Razorpay, CRED, and Zerodha.',
    skills: ['Product Strategy', 'FinTech', 'B2B SaaS', 'Roadmapping', 'Stakeholder Management'],
    rating: 4.9,
    hourlyRate: 1500,
    sessionDuration: 60,
    totalSessions: 312,
    domain: 'FinTech',
    location: 'Bengaluru',
    availability: 'Today',
    rate: 1500,
    verified: true,
  },
]

// Domain color map
const domainColors: Record<string, string> = {
  Career: '#f59e0b',
  EdTech: '#4f46e5',
  FinTech: '#00b09b',
  SaaS: '#8b5cf6',
  Design: '#ec4899',
}

const domainGradients: Record<string, string> = {
  Career: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  EdTech: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
  FinTech: 'linear-gradient(135deg, #00b09b 0%, #096c52 100%)',
  SaaS: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  Design: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
}

// =====================
// MentorDetail Component
// =====================
const MentorDetail = () => {
  const { id } = useParams()
  const [mentor, setMentor] = useState<IMentor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [wishlisted, setWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'availability'>('about')

  useEffect(() => {
    if (!id) return

    // Backend se fetch karo, error pe demo data use karo
    getMentorByIdApi(id)
      .then(setMentor)
      .catch(() => {
        const found = demoMentors.find(m => m._id === id) || demoMentors[0]
        setMentor(found)
      })
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) return <Loader />
  if (!mentor) return (
    <div style={{ background: '#0a0a1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😕</div>
        <h4 style={{ color: '#fff', marginBottom: '8px' }}>Mentor not found</h4>
        <Link to="/mentors" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 700 }}>← Back to Mentors</Link>
      </div>
    </div>
  )

  const name = mentor.userId?.name || mentor.user?.name || mentor.name || 'MentorLink Mentor'
  const domain = mentor.domain || 'EdTech'
  const domainColor = domainColors[domain] || '#7c3aed'
  const domainGradient = domainGradients[domain] || 'linear-gradient(135deg, #7c3aed, #4f46e5)'
  const rate = mentor.rate || mentor.hourlyRate || 1500
  const sessions = mentor.sessions || mentor.totalSessions || 0
  const rating = mentor.avgRating || mentor.rating || 4.5

  // Mock reviews
  const reviews = [
    { name: 'Rahul K.', initials: 'RK', color: '#4f46e5', rating: 5, text: 'Incredibly insightful session. Got a clear roadmap for my career switch in just 45 minutes.', date: 'Jun 20, 2026' },
    { name: 'Anjali M.', initials: 'AM', color: '#00b09b', rating: 5, text: 'Best investment I made in my career. The mentor was super patient and gave actionable advice.', date: 'Jun 15, 2026' },
    { name: 'Saurabh P.', initials: 'SP', color: '#f59e0b', rating: 4, text: 'Very knowledgeable. Helped me understand exactly what to focus on for my FAANG prep.', date: 'Jun 10, 2026' },
  ]

  // Mock availability slots
  const slots = [
    { day: 'Monday', times: ['10:00 AM', '2:00 PM', '5:00 PM'] },
    { day: 'Wednesday', times: ['11:00 AM', '3:00 PM'] },
    { day: 'Friday', times: ['9:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'] },
    { day: 'Saturday', times: ['10:00 AM', '12:00 PM'] },
  ]

  return (
    <div style={{ background: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: `radial-gradient(ellipse at 60% 0%, ${domainColor}33 0%, #0a0a1a 60%)`,
        padding: '50px 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="container position-relative">
          {/* Breadcrumb */}
          <div className="d-flex align-items-center gap-2 mb-5" style={{ fontSize: '0.85rem' }}>
            <Link to="/" style={{ color: '#475569', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#334155' }}>›</span>
            <Link to="/mentors" style={{ color: '#475569', textDecoration: 'none' }}>Find Mentors</Link>
            <span style={{ color: '#334155' }}>›</span>
            <span style={{ color: '#94a3b8' }}>{name}</span>
          </div>

          <div className="row align-items-end g-4">
            {/* Left — Avatar + Info */}
            <div className="col-lg-8">
              <div className="d-flex gap-4 align-items-start">
                {/* Avatar */}
                <div style={{
                  width: '100px', height: '100px', borderRadius: '24px',
                  background: domainGradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2.8rem', fontWeight: 900, color: '#fff',
                  flexShrink: 0, border: `2px solid ${domainColor}44`,
                  boxShadow: `0 0 30px ${domainColor}44`,
                }}>
                  {name.charAt(0).toUpperCase()}
                </div>

                <div>
                  {/* Domain + Verified */}
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span style={{
                      background: domainColor,
                      borderRadius: '999px', padding: '3px 12px',
                      fontSize: '0.75rem', fontWeight: 700,
                      color: domain === 'Career' ? '#000' : '#fff',
                    }}>
                      {domain}
                    </span>
                    {mentor.verified && (
                      <span style={{
                        background: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.3)',
                        borderRadius: '999px', padding: '3px 10px',
                        fontSize: '0.72rem', fontWeight: 700, color: '#22c55e',
                        display: 'flex', alignItems: 'center', gap: '4px',
                      }}>
                        ✔ Verified
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '4px', color: '#fff' }}>
                    {name}
                  </h1>

                  {/* Title */}
                  <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '12px' }}>
                    {mentor.title || `${mentor.role || 'Mentor'} · ${mentor.company || 'MentorLink'}`}
                  </p>

                  {/* Rating + Stats row */}
                  <div className="d-flex align-items-center gap-4 flex-wrap">
                    <div className="d-flex align-items-center gap-2">
                      <StarRating rating={rating} size="sm" />
                      <span style={{ color: '#64748b', fontSize: '0.82rem' }}>
                        ({reviews.length} reviews)
                      </span>
                    </div>
                    <span style={{ color: '#475569', fontSize: '0.85rem' }}>
                      👥 {sessions}+ sessions
                    </span>
                    {mentor.location && (
                      <span style={{ color: '#475569', fontSize: '0.85rem' }}>
                        📍 {mentor.location}
                      </span>
                    )}
                    {mentor.availability && (
                      <span style={{
                        fontSize: '0.8rem', fontWeight: 700,
                        color: mentor.availability === 'Today' ? '#22c55e' : mentor.availability === 'This week' ? '#f59e0b' : '#94a3b8',
                        display: 'flex', alignItems: 'center', gap: '4px',
                      }}>
                        <span style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: mentor.availability === 'Today' ? '#22c55e' : mentor.availability === 'This week' ? '#f59e0b' : '#94a3b8',
                          display: 'inline-block',
                        }} />
                        {mentor.availability}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Price + Book */}
            <div className="col-lg-4">
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '24px',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '4px' }}>Session Price</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#a78bfa' }}>
                    ₹{rate.toLocaleString()}
                  </div>
                  <div style={{ color: '#475569', fontSize: '0.78rem' }}>per session · {mentor.sessionDuration || 60} minutes</div>
                </div>

                <Link
                  to={`/book/${id}`}
                  style={{
                    display: 'block', textAlign: 'center',
                    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                    borderRadius: '12px', padding: '14px',
                    color: '#fff', textDecoration: 'none',
                    fontWeight: 800, fontSize: '1rem',
                    boxShadow: '0 8px 24px rgba(124,58,237,0.35)',
                    marginBottom: '12px',
                  }}
                >
                  Book a Session
                </Link>

                {/* Wishlist button */}
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  style={{
                    width: '100%',
                    background: wishlisted ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.04)',
                    border: wishlisted ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px', padding: '10px',
                    color: wishlisted ? '#f87171' : '#64748b',
                    fontWeight: 700, fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {wishlisted ? '❤️ Saved to Wishlist' : '🤍 Add to Wishlist'}
                </button>

                {/* Trust badges */}
                <div className="d-flex justify-content-center gap-3 mt-3">
                  {['🛡️ Verified', '💸 Razorpay', '↩️ Refund'].map(b => (
                    <span key={b} style={{ color: '#334155', fontSize: '0.72rem' }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="d-flex gap-1 mt-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {(['about', 'reviews', 'availability'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab ? `2px solid ${domainColor}` : '2px solid transparent',
                  padding: '12px 20px',
                  color: activeTab === tab ? '#fff' : '#475569',
                  fontWeight: activeTab === tab ? 700 : 400,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  marginBottom: '-1px',
                  transition: 'all 0.2s',
                }}
              >
                {tab === 'about' ? 'About' : tab === 'reviews' ? `Reviews (${reviews.length})` : 'Availability'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TAB CONTENT ===== */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">

            {/* ---- ABOUT TAB ---- */}
            {activeTab === 'about' && (
              <div>
                {/* Bio */}
                <div style={{
                  background: '#111126',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '28px',
                  marginBottom: '20px',
                }}>
                  <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '16px', fontSize: '1rem' }}>
                    About {name}
                  </h4>
                  <p style={{ color: '#94a3b8', lineHeight: 1.8, margin: 0 }}>
                    {mentor.bio || 'Experienced mentor with a passion for helping professionals achieve their career goals.'}
                  </p>
                </div>

                {/* Skills */}
                <div style={{
                  background: '#111126',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '28px',
                  marginBottom: '20px',
                }}>
                  <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '16px', fontSize: '1rem' }}>
                    Skills & Expertise
                  </h4>
                  <div className="d-flex flex-wrap gap-2">
                    {(mentor.skills || []).map(skill => (
                      <span key={skill} style={{
                        background: `${domainColor}15`,
                        border: `1px solid ${domainColor}33`,
                        borderRadius: '10px',
                        padding: '8px 16px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: domainColor,
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* What you'll get */}
                <div style={{
                  background: '#111126',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '28px',
                }}>
                  <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '16px', fontSize: '1rem' }}>
                    What you'll get in this session
                  </h4>
                  {[
                    '60-minute focused 1:1 video session',
                    'Personalized action plan based on your goals',
                    'Access to resources and templates shared by mentor',
                    'Follow-up notes via email after session',
                    'Option to book follow-up sessions',
                  ].map(item => (
                    <div key={item} className="d-flex align-items-center gap-3 mb-3">
                      <span style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: `${domainColor}20`,
                        border: `1px solid ${domainColor}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', color: domainColor, flexShrink: 0,
                      }}>✓</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---- REVIEWS TAB ---- */}
            {activeTab === 'reviews' && (
              <div>
                {/* Average Rating Card */}
                <div style={{
                  background: '#111126',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '28px',
                  marginBottom: '20px',
                }}>
                  <div className="row align-items-center">
                    <div className="col-md-4 text-center">
                      <div style={{ fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                        {rating.toFixed(1)}
                      </div>
                      <StarRating rating={rating} size="lg" />
                      <div style={{ color: '#475569', fontSize: '0.82rem', marginTop: '8px' }}>
                        Based on {reviews.length} reviews
                      </div>
                    </div>
                    <div className="col-md-8">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = reviews.filter(r => r.rating === star).length
                        const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                        return (
                          <div key={star} className="d-flex align-items-center gap-3 mb-2">
                            <span style={{ color: '#f59e0b', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                              {star} ★
                            </span>
                            <div style={{
                              flex: 1, height: '6px', borderRadius: '999px',
                              background: 'rgba(255,255,255,0.06)',
                              overflow: 'hidden',
                            }}>
                              <div style={{
                                width: `${percent}%`, height: '100%',
                                background: '#f59e0b', borderRadius: '999px',
                                transition: 'width 0.5s ease',
                              }} />
                            </div>
                            <span style={{ color: '#475569', fontSize: '0.78rem', width: '20px' }}>{count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                {reviews.map((review, i) => (
                  <div key={i} style={{
                    background: '#111126',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '12px',
                  }}>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '50%',
                          background: review.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: '0.82rem', color: '#fff',
                        }}>
                          {review.initials}
                        </div>
                        <div>
                          <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.9rem' }}>{review.name}</div>
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                      </div>
                      <span style={{ color: '#334155', fontSize: '0.78rem' }}>{review.date}</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* ---- AVAILABILITY TAB ---- */}
            {activeTab === 'availability' && (
              <div style={{
                background: '#111126',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '28px',
              }}>
                <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '20px', fontSize: '1rem' }}>
                  Available Slots
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '24px' }}>
                  All times shown in IST (Indian Standard Time). Book a slot that works for you.
                </p>

                {slots.map(daySlot => (
                  <div key={daySlot.day} style={{ marginBottom: '24px' }}>
                    <div style={{
                      color: '#94a3b8', fontWeight: 700, fontSize: '0.85rem',
                      marginBottom: '12px', letterSpacing: '0.05em',
                    }}>
                      {daySlot.day}
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {daySlot.times.map(time => (
                        <Link
                          key={time}
                          to={`/book/${id}`}
                          style={{
                            background: `${domainColor}15`,
                            border: `1px solid ${domainColor}33`,
                            borderRadius: '10px',
                            padding: '8px 16px',
                            color: domainColor,
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                          }}
                        >
                          {time}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <Link
                    to={`/book/${id}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                      borderRadius: '12px', padding: '12px 24px',
                      color: '#fff', textDecoration: 'none', fontWeight: 700,
                    }}
                  >
                    Book a Session →
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* ===== RIGHT STICKY SIDEBAR ===== */}
          <div className="col-lg-4">

            {/* Quick Stats */}
            <div style={{
              background: '#111126',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '16px',
            }}>
              <h5 style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '0.9rem' }}>
                Quick Stats
              </h5>
              {[
                { icon: '👥', label: 'Total Sessions', val: `${sessions}+` },
                { icon: '⭐', label: 'Average Rating', val: `${rating.toFixed(1)} / 5.0` },
                { icon: '💼', label: 'Domain', val: domain },
                { icon: '📍', label: 'Location', val: mentor.location || 'India' },
                { icon: '⏱', label: 'Session Duration', val: `${mentor.sessionDuration || 60} mins` },
                { icon: '🗓️', label: 'Next Available', val: mentor.availability || 'This week' },
              ].map(stat => (
                <div key={stat.label} className="d-flex justify-content-between align-items-center mb-3">
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>
                    {stat.icon} {stat.label}
                  </span>
                  <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem' }}>
                    {stat.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Book Now CTA (sticky) */}
            <div style={{
              background: `linear-gradient(135deg, ${domainColor}20, rgba(124,58,237,0.15))`,
              border: `1px solid ${domainColor}30`,
              borderRadius: '20px',
              padding: '24px',
              position: 'sticky',
              top: '80px',
            }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>Session Price</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#a78bfa', marginBottom: '16px' }}>
                ₹{rate.toLocaleString()}
                <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 400 }}>/session</span>
              </div>

              <Link to={`/book/${id}`} style={{
                display: 'block', textAlign: 'center',
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                borderRadius: '12px', padding: '13px',
                color: '#fff', textDecoration: 'none',
                fontWeight: 800, fontSize: '0.95rem',
                marginBottom: '10px',
                boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
              }}>
                Book a Session
              </Link>

              <div className="text-center" style={{ color: '#334155', fontSize: '0.78rem', marginTop: '12px' }}>
                🛡️ Secured by Razorpay · ↩️ Full refund if mentor cancels
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default MentorDetail
