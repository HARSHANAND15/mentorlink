import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

// =====================
// Types
// =====================
interface Mentor {
  id: string
  name: string
  role: string
  company: string
  domain: string
  domainColor: string
  gradientColor: string
  rating: number
  sessions: number
  location: string
  availability: 'Today' | 'This week' | 'Next week'
  availabilityColor: string
  rate: number
  bio: string
  skills: string[]
  verified: boolean
  image: string
}

// =====================
// Data
// =====================
const allMentors: Mentor[] = [
  {
    id: '1', name: 'Sneha Kapoor', role: 'Career Coach', company: 'ex-McKinsey',
    domain: 'Career', domainColor: '#f59e0b', gradientColor: 'linear-gradient(160deg, #f59e0b 0%, #ef4444 100%)',
    rating: 5.0, sessions: 490, location: 'Mumbai', availability: 'Today', availabilityColor: '#22c55e',
    rate: 1800, bio: "Former McKinsey consultant turned career coach. I've helped 200+ professionals land their dream roles.",
    skills: ['Career Guidance', 'MBA Prep', 'Consulting'], verified: true,
    image: 'https://i.pravatar.cc/400?img=47',
  },
  {
    id: '2', name: 'Vikram Nair', role: 'Engineering Manager', company: 'Flipkart',
    domain: 'EdTech', domainColor: '#4f46e5', gradientColor: 'linear-gradient(160deg, #3b82f6 0%, #4f46e5 100%)',
    rating: 4.8, sessions: 420, location: 'Bengaluru', availability: 'This week', availabilityColor: '#f59e0b',
    rate: 2200, bio: "EM at Flipkart leading a 20-person team. Crack FAANG system design with my structured approach.",
    skills: ['System Design', 'Engineering Leadership', 'DSA'], verified: true,
    image: 'https://i.pravatar.cc/400?img=11',
  },
  {
    id: '3', name: 'Karan Singh', role: 'SDE-3', company: 'Microsoft',
    domain: 'EdTech', domainColor: '#4f46e5', gradientColor: 'linear-gradient(160deg, #6366f1 0%, #8b5cf6 100%)',
    rating: 4.7, sessions: 340, location: 'Pune', availability: 'Next week', availabilityColor: '#94a3b8',
    rate: 1700, bio: "Cleared Google, Amazon & Microsoft in the same year. My DSA prep system has helped 300+ people crack top companies.",
    skills: ['DSA', 'System Design', 'FAANG Prep'], verified: true,
    image: 'https://i.pravatar.cc/400?img=15',
  },
  {
    id: '4', name: 'Priya Sharma', role: 'Product Manager', company: 'Razorpay',
    domain: 'FinTech', domainColor: '#00b09b', gradientColor: 'linear-gradient(160deg, #00b09b 0%, #096c52 100%)',
    rating: 4.9, sessions: 312, location: 'Bengaluru', availability: 'Today', availabilityColor: '#22c55e',
    rate: 1500, bio: "7 years building payment products at scale. I help PMs break into fintech and navigate 0-to-1 product thinking.",
    skills: ['Product Strategy', 'FinTech', 'B2B SaaS'], verified: true,
    image: 'https://i.pravatar.cc/400?img=32',
  },
  {
    id: '5', name: 'Kavya Reddy', role: 'Senior UX Designer', company: 'Swiggy',
    domain: 'Design', domainColor: '#ec4899', gradientColor: 'linear-gradient(160deg, #ec4899 0%, #be185d 100%)',
    rating: 4.9, sessions: 280, location: 'Bengaluru', availability: 'Today', availabilityColor: '#22c55e',
    rate: 1600, bio: "Lead designer behind Swiggy's design system. I help designers build portfolios that land jobs at top product companies.",
    skills: ['UX Research', 'Product Design', 'Figma'], verified: true,
    image: 'https://i.pravatar.cc/400?img=44',
  },
  {
    id: '6', name: 'Riya Mehta', role: 'Design Lead', company: 'Paytm',
    domain: 'Design', domainColor: '#ec4899', gradientColor: 'linear-gradient(160deg, #f43f5e 0%, #ec4899 100%)',
    rating: 4.9, sessions: 235, location: 'Noida', availability: 'Today', availabilityColor: '#22c55e',
    rate: 1500, bio: "Lead the visual identity of Paytm's super-app. Passionate about helping junior designers build strong portfolios.",
    skills: ['Visual Design', 'Motion Design', 'Brand Identity'], verified: true,
    image: 'https://i.pravatar.cc/400?img=49',
  },
  {
    id: '7', name: 'Arjun Mehta', role: 'ML Engineer', company: 'Google',
    domain: 'EdTech', domainColor: '#4f46e5', gradientColor: 'linear-gradient(160deg, #2563eb 0%, #7c3aed 100%)',
    rating: 4.8, sessions: 210, location: 'Hyderabad', availability: 'This week', availabilityColor: '#f59e0b',
    rate: 2000, bio: "Made the leap from civil engineering to ML at Google. I specialize in career transition and ML interview prep.",
    skills: ['Machine Learning', 'Career Switch', 'Python'], verified: true,
    image: 'https://i.pravatar.cc/400?img=12',
  },
  {
    id: '8', name: 'Dev Patel', role: 'Growth Lead', company: 'Razorpay',
    domain: 'SaaS', domainColor: '#8b5cf6', gradientColor: 'linear-gradient(160deg, #7c3aed 0%, #4f46e5 100%)',
    rating: 4.8, sessions: 198, location: 'Mumbai', availability: 'Today', availabilityColor: '#22c55e',
    rate: 1300, bio: "Drove Razorpay's SMB growth from 0 to 500K merchants. I help B2B SaaS teams nail GTM and growth strategy.",
    skills: ['Growth Marketing', 'B2B GTM', 'Analytics'], verified: true,
    image: 'https://i.pravatar.cc/400?img=13',
  },
  {
    id: '9', name: 'Meera Iyer', role: 'VP Product', company: 'CRED',
    domain: 'FinTech', domainColor: '#00b09b', gradientColor: 'linear-gradient(160deg, #10b981 0%, #059669 100%)',
    rating: 5.0, sessions: 175, location: 'Bengaluru', availability: 'This week', availabilityColor: '#f59e0b',
    rate: 3000, bio: "Led product at CRED from Series B to unicorn. Mentoring senior PMs on product leadership and 0-to-1.",
    skills: ['Product Leadership', 'Consumer FinTech', '0-to-1'], verified: true,
    image: 'https://i.pravatar.cc/400?img=45',
  },
  {
    id: '10', name: 'Rohit Verma', role: 'Startup Founder', company: 'EdTech Ventures',
    domain: 'SaaS', domainColor: '#8b5cf6', gradientColor: 'linear-gradient(160deg, #8b5cf6 0%, #6d28d9 100%)',
    rating: 4.7, sessions: 145, location: 'Delhi NCR', availability: 'This week', availabilityColor: '#f59e0b',
    rate: 1200, bio: "Built and sold two SaaS startups. I mentor founders on GTM strategy, fundraising narrative, and SaaS metrics.",
    skills: ['Startup Strategy', 'Fundraising', 'SaaS Metrics'], verified: true,
    image: 'https://i.pravatar.cc/400?img=14',
  },
  {
    id: '11', name: 'Ananya Bose', role: 'Data Scientist', company: 'Zerodha',
    domain: 'FinTech', domainColor: '#00b09b', gradientColor: 'linear-gradient(160deg, #00b09b 0%, #4f46e5 100%)',
    rating: 4.6, sessions: 118, location: 'Bengaluru', availability: 'Today', availabilityColor: '#22c55e',
    rate: 1400, bio: "Building trading analytics at Zerodha. I help data professionals break into fintech and understand financial systems.",
    skills: ['Data Science', 'Trading Systems', 'Python'], verified: true,
    image: 'https://i.pravatar.cc/400?img=46',
  },
  {
    id: '12', name: 'Aditya Kumar', role: 'Co-founder & CTO', company: 'LearnPath AI',
    domain: 'SaaS', domainColor: '#8b5cf6', gradientColor: 'linear-gradient(160deg, #7c3aed 0%, #a855f7 100%)',
    rating: 4.6, sessions: 102, location: 'Bengaluru', availability: 'Next week', availabilityColor: '#94a3b8',
    rate: 2500, bio: "Built and scaled LearnPath AI to 2M users. I mentor technical founders on building AI-first products.",
    skills: ['Technical Leadership', 'EdTech', 'AI Products'], verified: true,
    image: 'https://i.pravatar.cc/400?img=16',
  },
]

// =====================
// Filter Options
// =====================
const domainOptions = [
  { label: 'FinTech', color: '#00b09b' },
  { label: 'EdTech', color: '#4f46e5' },
  { label: 'Career', color: '#f59e0b' },
  { label: 'SaaS', color: '#8b5cf6' },
  { label: 'Design', color: '#ec4899' },
]

const priceOptions = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 – ₹3,000', min: 2000, max: 3000 },
  { label: '₹3,000+', min: 3000, max: Infinity },
]

const ratingOptions = [
  { label: '4.5+ stars', min: 4.5 },
  { label: '4+ stars', min: 4.0 },
  { label: '3.5+ stars', min: 3.5 },
]

const availabilityOptions = ['Available Today', 'This Week', 'Next Week']
const languageOptions = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada']
const sortOptions = ['Most Popular', 'Highest Rated', 'Price: Low to High', 'Price: High to Low']

// =====================
// Helper
// =====================
const domainCount = (domain: string) => allMentors.filter(m => m.domain === domain).length

// =====================
// MentorList Component
// =====================
const MentorList = () => {
  const [searchParams] = useSearchParams()

  // --- Filter States ---
  const [search, setSearch] = useState('')
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<string>('')
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  // --- UI States ---
  const [sortBy, setSortBy] = useState('Most Popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [wishlist, setWishlist] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(12)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // --- Domain Collapse States ---
  const [domainOpen, setDomainOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
  const [ratingOpen, setRatingOpen] = useState(true)
  const [availOpen, setAvailOpen] = useState(true)
  const [langOpen, setLangOpen] = useState(true)

  // URL se domain filter read karo
  useEffect(() => {
    const domainFromUrl = searchParams.get('domain')
    if (domainFromUrl) {
      setSelectedDomains([domainFromUrl])
    }
  }, [searchParams])

  // --- Toggle Helpers ---
  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item])
  }

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  // --- Filtered + Sorted Mentors ---
  const filteredMentors = useMemo(() => {
    let result = [...allMentors]

    // Search filter
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.skills.some(s => s.toLowerCase().includes(q))
      )
    }

    // Domain filter
    if (selectedDomains.length > 0) {
      result = result.filter(m => selectedDomains.includes(m.domain))
    }

    // Price filter
    if (selectedPrices.length > 0) {
      result = result.filter(m => {
        return selectedPrices.some(p => {
          const option = priceOptions.find(o => o.label === p)
          return option ? m.rate >= option.min && m.rate < option.max : false
        })
      })
    }

    // Rating filter
    if (selectedRating) {
      const minRating = ratingOptions.find(r => r.label === selectedRating)?.min || 0
      result = result.filter(m => m.rating >= minRating)
    }

    // Availability filter
    if (selectedAvailability.length > 0) {
      result = result.filter(m => {
        if (selectedAvailability.includes('Available Today') && m.availability === 'Today') return true
        if (selectedAvailability.includes('This Week') && m.availability === 'This week') return true
        if (selectedAvailability.includes('Next Week') && m.availability === 'Next week') return true
        return false
      })
    }

    // Sort
    if (sortBy === 'Highest Rated') result.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'Price: Low to High') result.sort((a, b) => a.rate - b.rate)
    else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.rate - a.rate)
    else result.sort((a, b) => b.sessions - a.sessions) // Most Popular = most sessions

    return result
  }, [search, selectedDomains, selectedPrices, selectedRating, selectedAvailability, sortBy])

  const visibleMentors = filteredMentors.slice(0, visibleCount)

  return (
    <div style={{ background: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: 'radial-gradient(ellipse at 50% 0%, #2d1b69 0%, #0a0a1a 70%)',
        padding: '70px 0 80px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="container position-relative">
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '12px' }}>
            Find Your{' '}
            <span style={{
              background: 'linear-gradient(90deg, #a78bfa, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Perfect Mentor
            </span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '32px' }}>
            Browse 500+ verified mentors across EdTech, FinTech, SaaS, Design and more.
          </p>

          {/* Search Bar */}
          <div className="d-flex gap-2 justify-content-center" style={{ maxWidth: '600px', margin: '0 auto 24px' }}>
            <div className="d-flex align-items-center flex-grow-1 px-3"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '14px',
                height: '52px',
              }}>
              <span className="me-2" style={{ color: '#64748b' }}>🔍</span>
              <input
                type="text"
                placeholder="Search by name, skill, role, or company..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: '#fff', width: '100%', fontSize: '0.95rem',
                }}
              />
              {search && (
                <button onClick={() => setSearch('')}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>✕</button>
              )}
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #f59e0b, #e07b00)',
              border: 'none', borderRadius: '14px', padding: '0 28px',
              color: '#000', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer',
            }}>
              Search
            </button>
          </div>

          {/* Domain Quick Tags */}
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            {domainOptions.map(d => (
              <button
                key={d.label}
                onClick={() => toggleItem(selectedDomains, setSelectedDomains, d.label)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '999px',
                  border: selectedDomains.includes(d.label)
                    ? `1.5px solid ${d.color}`
                    : '1px solid rgba(255,255,255,0.15)',
                  background: selectedDomains.includes(d.label)
                    ? `rgba(${d.label === 'FinTech' ? '0,176,155' : d.label === 'EdTech' ? '79,70,229' : d.label === 'Career' ? '245,158,11' : d.label === 'SaaS' ? '139,92,246' : '236,72,153'},0.15)`
                    : 'rgba(255,255,255,0.05)',
                  color: selectedDomains.includes(d.label) ? '#fff' : '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0a0a1a" />
          </svg>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container py-4">
        <div className="row g-4">

          {/* ===== LEFT SIDEBAR FILTERS ===== */}
          <div className="col-lg-3">
            <div style={{
              background: '#111126',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '24px',
              position: 'sticky',
              top: '80px',
            }}>
              <h5 style={{ color: '#fff', fontWeight: 800, marginBottom: '24px', fontSize: '1rem' }}>
                Filters
              </h5>

              {/* --- DOMAIN FILTER --- */}
              <div className="mb-4">
                <button
                  onClick={() => setDomainOpen(!domainOpen)}
                  style={{
                    background: 'none', border: 'none', color: '#e2e8f0',
                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '0 0 12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: '12px',
                  }}
                >
                  Domain
                  <span style={{ fontSize: '0.75rem', color: '#475569' }}>{domainOpen ? '▲' : '▼'}</span>
                </button>
                {domainOpen && domainOptions.map(d => (
                  <div key={d.label} className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}
                      onClick={() => toggleItem(selectedDomains, setSelectedDomains, d.label)}>
                      <div style={{
                        width: '10px', height: '10px', borderRadius: '50%', background: d.color, flexShrink: 0,
                      }} />
                      <span style={{
                        color: selectedDomains.includes(d.label) ? '#fff' : '#94a3b8',
                        fontSize: '0.875rem',
                        fontWeight: selectedDomains.includes(d.label) ? 700 : 400,
                      }}>
                        {d.label}
                      </span>
                    </div>
                    <span style={{
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '999px',
                      padding: '1px 8px',
                      fontSize: '0.72rem',
                      color: '#475569',
                    }}>
                      {domainCount(d.label)}
                    </span>
                  </div>
                ))}
              </div>

              {/* --- PRICE FILTER --- */}
              <div className="mb-4">
                <button
                  onClick={() => setPriceOpen(!priceOpen)}
                  style={{
                    background: 'none', border: 'none', color: '#e2e8f0',
                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '0 0 12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: '12px',
                  }}
                >
                  Price per Session
                  <span style={{ fontSize: '0.75rem', color: '#475569' }}>{priceOpen ? '▲' : '▼'}</span>
                </button>
                {priceOpen && priceOptions.map(p => (
                  <div key={p.label} className="d-flex align-items-center gap-2 mb-2" style={{ cursor: 'pointer' }}
                    onClick={() => toggleItem(selectedPrices, setSelectedPrices, p.label)}>
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '4px',
                      border: selectedPrices.includes(p.label) ? '2px solid #7c3aed' : '1.5px solid #334155',
                      background: selectedPrices.includes(p.label) ? '#7c3aed' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {selectedPrices.includes(p.label) && <span style={{ color: '#fff', fontSize: '0.6rem' }}>✓</span>}
                    </div>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{p.label}</span>
                  </div>
                ))}
              </div>

              {/* --- RATING FILTER --- */}
              <div className="mb-4">
                <button
                  onClick={() => setRatingOpen(!ratingOpen)}
                  style={{
                    background: 'none', border: 'none', color: '#e2e8f0',
                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '0 0 12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: '12px',
                  }}
                >
                  Minimum Rating
                  <span style={{ fontSize: '0.75rem', color: '#475569' }}>{ratingOpen ? '▲' : '▼'}</span>
                </button>
                {ratingOpen && ratingOptions.map(r => (
                  <div key={r.label} className="d-flex align-items-center gap-2 mb-2" style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedRating(selectedRating === r.label ? '' : r.label)}>
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      border: selectedRating === r.label ? '2px solid #7c3aed' : '1.5px solid #334155',
                      background: selectedRating === r.label ? '#7c3aed' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {selectedRating === r.label && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                    </div>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                      <span style={{ color: '#f59e0b' }}>★</span> {r.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* --- AVAILABILITY FILTER --- */}
              <div className="mb-4">
                <button
                  onClick={() => setAvailOpen(!availOpen)}
                  style={{
                    background: 'none', border: 'none', color: '#e2e8f0',
                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '0 0 12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: '12px',
                  }}
                >
                  Availability
                  <span style={{ fontSize: '0.75rem', color: '#475569' }}>{availOpen ? '▲' : '▼'}</span>
                </button>
                {availOpen && availabilityOptions.map(a => {
                  const dotColor = a === 'Available Today' ? '#22c55e' : a === 'This Week' ? '#f59e0b' : '#94a3b8'
                  return (
                    <div key={a} className="d-flex align-items-center gap-2 mb-2" style={{ cursor: 'pointer' }}
                      onClick={() => toggleItem(selectedAvailability, setSelectedAvailability, a)}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '4px',
                        border: selectedAvailability.includes(a) ? '2px solid #7c3aed' : '1.5px solid #334155',
                        background: selectedAvailability.includes(a) ? '#7c3aed' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {selectedAvailability.includes(a) && <span style={{ color: '#fff', fontSize: '0.6rem' }}>✓</span>}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: dotColor, display: 'inline-block' }} />
                        {a}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* --- LANGUAGES FILTER --- */}
              <div className="mb-2">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  style={{
                    background: 'none', border: 'none', color: '#e2e8f0',
                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '0 0 12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: '12px',
                  }}
                >
                  Languages
                  <span style={{ fontSize: '0.75rem', color: '#475569' }}>{langOpen ? '▲' : '▼'}</span>
                </button>
                {langOpen && (
                  <div className="d-flex flex-wrap gap-2">
                    {languageOptions.map(lang => (
                      <button
                        key={lang}
                        onClick={() => toggleItem(selectedLanguages, setSelectedLanguages, lang)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '8px',
                          border: selectedLanguages.includes(lang)
                            ? '1.5px solid #7c3aed'
                            : '1px solid rgba(255,255,255,0.1)',
                          background: selectedLanguages.includes(lang)
                            ? 'rgba(124,58,237,0.15)'
                            : 'rgba(255,255,255,0.04)',
                          color: selectedLanguages.includes(lang) ? '#c4b5fd' : '#64748b',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear Filters */}
              {(selectedDomains.length > 0 || selectedPrices.length > 0 || selectedRating || selectedAvailability.length > 0 || selectedLanguages.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedDomains([])
                    setSelectedPrices([])
                    setSelectedRating('')
                    setSelectedAvailability([])
                    setSelectedLanguages([])
                  }}
                  style={{
                    width: '100%', marginTop: '20px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '10px', padding: '10px',
                    color: '#f87171', fontWeight: 700, fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  ✕ Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* ===== RIGHT — MENTOR GRID ===== */}
          <div className="col-lg-9">

            {/* Toolbar */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
                <span style={{ color: '#fff', fontWeight: 700 }}>{filteredMentors.length}</span> mentors found
              </p>

              <div className="d-flex align-items-center gap-3">
                {/* Sort Dropdown */}
                <div className="d-flex align-items-center gap-2">
                  <span style={{ color: '#64748b', fontSize: '0.82rem' }}>↕</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      color: '#e2e8f0',
                      fontSize: '0.85rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {sortOptions.map(s => <option key={s} value={s} style={{ background: '#111126' }}>{s}</option>)}
                  </select>
                </div>

                {/* Grid / List Toggle */}
                <div className="d-flex" style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}>
                  {(['grid', 'list'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      style={{
                        background: viewMode === mode ? '#7c3aed' : 'transparent',
                        border: 'none',
                        padding: '8px 12px',
                        color: viewMode === mode ? '#fff' : '#64748b',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                      }}
                    >
                      {mode === 'grid' ? '⊞' : '☰'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredMentors.length === 0 && (
              <div className="text-center py-5">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                <h4 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '8px' }}>No mentors found</h4>
                <p style={{ color: '#475569' }}>Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setSearch(''); setSelectedDomains([]); setSelectedPrices([]); setSelectedRating(''); setSelectedAvailability([]); setSelectedLanguages([]) }}
                  style={{
                    background: '#7c3aed', border: 'none', borderRadius: '999px',
                    padding: '10px 24px', color: '#fff', fontWeight: 700, cursor: 'pointer', marginTop: '12px',
                  }}
                >
                  Reset all filters
                </button>
              </div>
            )}

            {/* Mentor Cards */}
            <div className={viewMode === 'grid' ? 'row g-4' : 'row g-3'}>
              {visibleMentors.map(mentor => (
                <div key={mentor.id} className={viewMode === 'grid' ? 'col-md-6 col-xl-4' : 'col-12'}>

                  {viewMode === 'grid' ? (
                    /* ===== GRID CARD ===== */
                    <div
                      onMouseEnter={() => setHoveredCard(mentor.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: '#111126',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: hoveredCard === mentor.id
                          ? '1px solid rgba(124,58,237,0.4)'
                          : '1px solid rgba(255,255,255,0.06)',
                        transition: 'all 0.25s ease',
                        transform: hoveredCard === mentor.id ? 'translateY(-4px)' : 'translateY(0)',
                        boxShadow: hoveredCard === mentor.id ? '0 16px 48px rgba(124,58,237,0.15)' : 'none',
                      }}
                    >
                      {/* Photo with gradient overlay */}
                      <div style={{ position: 'relative', height: '200px' }}>
                        <img src={mentor.image} alt={mentor.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {/* Gradient overlay */}
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: `${mentor.gradientColor.replace('linear-gradient', 'linear-gradient').replace('160deg', '160deg')}, rgba(0,0,0,0.3)`,
                          opacity: 0.75,
                          mixBlendMode: 'multiply',
                        }} />
                        {/* Domain tag top-left */}
                        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                          <span style={{
                            background: mentor.domainColor,
                            borderRadius: '999px',
                            padding: '4px 12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: mentor.domain === 'Career' ? '#000' : '#fff',
                          }}>
                            {mentor.domain}
                          </span>
                        </div>
                        {/* Wishlist top-right */}
                        <button
                          onClick={() => toggleWishlist(mentor.id)}
                          style={{
                            position: 'absolute', top: '12px', right: '12px',
                            background: 'rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '50%',
                            width: '34px', height: '34px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', fontSize: '0.9rem',
                            color: wishlist.includes(mentor.id) ? '#ef4444' : '#fff',
                          }}
                        >
                          {wishlist.includes(mentor.id) ? '❤️' : '🤍'}
                        </button>
                        {/* Name + Role bottom of image */}
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                          <div className="d-flex justify-content-between align-items-end">
                            <div>
                              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {mentor.name}
                                {mentor.verified && <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>✔</span>}
                              </div>
                              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>
                                {mentor.role} · {mentor.company}
                              </div>
                            </div>
                            <div style={{
                              background: 'rgba(0,0,0,0.4)',
                              borderRadius: '8px',
                              padding: '3px 8px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: '#fff',
                              display: 'flex', alignItems: 'center', gap: '3px',
                            }}>
                              <span style={{ color: '#f59e0b' }}>★</span> {mentor.rating}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div style={{ padding: '16px' }}>
                        {/* Bio */}
                        <p style={{
                          color: '#64748b', fontSize: '0.82rem', lineHeight: 1.55,
                          marginBottom: '12px',
                          display: '-webkit-box', WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {mentor.bio}
                        </p>

                        {/* Skills */}
                        <div className="d-flex flex-wrap gap-1 mb-3">
                          {mentor.skills.map(skill => (
                            <span key={skill} style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '6px',
                              padding: '3px 10px',
                              fontSize: '0.72rem',
                              color: '#94a3b8',
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Sessions + Location + Availability */}
                        <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                          <span style={{ color: '#475569', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            👥 {mentor.sessions} sessions
                          </span>
                          <span style={{ color: '#475569', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            📍 {mentor.location}
                          </span>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: mentor.availabilityColor,
                            display: 'flex', alignItems: 'center', gap: '4px',
                          }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: mentor.availabilityColor, display: 'inline-block' }} />
                            {mentor.availability}
                          </span>
                        </div>

                        {/* Price + Book Now */}
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div style={{ color: '#a78bfa', fontWeight: 800, fontSize: '1.1rem' }}>
                              ₹{mentor.rate.toLocaleString()}
                            </div>
                            <div style={{ color: '#334155', fontSize: '0.72rem' }}>per session</div>
                          </div>
                          <Link
                            to={`/mentors/${mentor.id}`}
                            style={{
                              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                              borderRadius: '10px',
                              padding: '9px 20px',
                              color: '#fff',
                              textDecoration: 'none',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
                            }}
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>

                  ) : (
                    /* ===== LIST CARD ===== */
                    <div
                      onMouseEnter={() => setHoveredCard(mentor.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: '#111126',
                        borderRadius: '16px',
                        border: hoveredCard === mentor.id
                          ? '1px solid rgba(124,58,237,0.4)'
                          : '1px solid rgba(255,255,255,0.06)',
                        padding: '20px',
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center',
                        transition: 'all 0.2s ease',
                        transform: hoveredCard === mentor.id ? 'translateX(4px)' : 'translateX(0)',
                      }}
                    >
                      {/* Avatar */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{
                          width: '72px', height: '72px', borderRadius: '16px',
                          overflow: 'hidden', position: 'relative',
                        }}>
                          <img src={mentor.image} alt={mentor.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{
                            position: 'absolute', inset: 0,
                            background: mentor.gradientColor, opacity: 0.5, mixBlendMode: 'multiply',
                          }} />
                        </div>
                        <span style={{
                          position: 'absolute', bottom: '-4px', right: '-4px',
                          background: mentor.domainColor,
                          borderRadius: '6px', padding: '1px 6px',
                          fontSize: '0.6rem', fontWeight: 700,
                          color: mentor.domain === 'Career' ? '#000' : '#fff',
                        }}>
                          {mentor.domain}
                        </span>
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>{mentor.name}</span>
                          {mentor.verified && <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>✔</span>}
                          <span style={{ color: '#f59e0b', fontSize: '0.82rem' }}>★ {mentor.rating}</span>
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '8px' }}>
                          {mentor.role} · {mentor.company}
                        </div>
                        <div className="d-flex gap-1 flex-wrap">
                          {mentor.skills.slice(0, 3).map(skill => (
                            <span key={skill} style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '6px', padding: '2px 8px',
                              fontSize: '0.7rem', color: '#64748b',
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="d-none d-md-flex flex-column align-items-center gap-1" style={{ flexShrink: 0, minWidth: '100px' }}>
                        <span style={{ color: '#475569', fontSize: '0.78rem' }}>👥 {mentor.sessions} sessions</span>
                        <span style={{ color: '#475569', fontSize: '0.78rem' }}>📍 {mentor.location}</span>
                        <span style={{ color: mentor.availabilityColor, fontSize: '0.75rem', fontWeight: 700 }}>
                          ● {mentor.availability}
                        </span>
                      </div>

                      {/* Price + Book */}
                      <div className="d-flex flex-column align-items-end gap-2" style={{ flexShrink: 0 }}>
                        <button onClick={() => toggleWishlist(mentor.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: wishlist.includes(mentor.id) ? '#ef4444' : '#334155' }}>
                          {wishlist.includes(mentor.id) ? '❤️' : '🤍'}
                        </button>
                        <div style={{ color: '#a78bfa', fontWeight: 800, fontSize: '1rem', textAlign: 'right' }}>
                          ₹{mentor.rate.toLocaleString()}
                          <div style={{ color: '#334155', fontSize: '0.7rem', fontWeight: 400 }}>per session</div>
                        </div>
                        <Link to={`/mentors/${mentor.id}`}
                          style={{
                            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                            borderRadius: '8px', padding: '7px 16px',
                            color: '#fff', textDecoration: 'none',
                            fontWeight: 700, fontSize: '0.82rem',
                          }}>
                          Book Now
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filteredMentors.length && (
              <div className="text-center mt-5">
                <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '16px' }}>
                  Showing {visibleCount} of {filteredMentors.length} mentors
                </p>
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  style={{
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    borderRadius: '999px',
                    padding: '12px 32px',
                    color: '#a78bfa',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  Load more mentors →
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorList
