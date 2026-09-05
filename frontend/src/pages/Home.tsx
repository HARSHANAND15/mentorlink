import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const featuredMentors = [
  { id: '1', name: 'Priya Sharma', role: 'Product Manager', company: 'Razorpay', domain: 'FinTech', rating: 4.9, reviews: 142, rate: 1500, color: 'linear-gradient(135deg, #00b09b, #096c52)' },
  { id: '2', name: 'Arjun Mehta', role: 'ML Engineer', company: 'Google', domain: 'EdTech', rating: 4.8, reviews: 98, rate: 2000, color: 'linear-gradient(135deg, #1a1aff, #0d006e)' },
  { id: '3', name: 'Sneha Kapoor', role: 'Career Coach', company: 'ex-McKinsey', domain: 'Career', rating: 5.0, reviews: 210, rate: 1800, color: 'linear-gradient(135deg, #f7971e, #c9530a)' },
  { id: '4', name: 'Rohit Verma', role: 'Startup Founder', company: 'EdTech Ventures', domain: 'SaaS', rating: 4.7, reviews: 76, rate: 1200, color: 'linear-gradient(135deg, #8e2de2, #5500cc)' },
  { id: '5', name: 'Kavya Reddy', role: 'UX Lead', company: 'Swiggy', domain: 'Design', rating: 4.9, reviews: 134, rate: 1600, color: 'linear-gradient(135deg, #f953c6, #b91d73)' },
  { id: '6', name: 'Vikram Nair', role: 'Engineering Manager', company: 'Flipkart', domain: 'EdTech', rating: 4.8, reviews: 189, rate: 2200, color: 'linear-gradient(135deg, #00c6ff, #005f8e)' },
]

const domainColors: Record<string, string> = {
  FinTech: '#00b09b',
  EdTech: '#4f46e5',
  Career: '#f59e0b',
  SaaS: '#8b5cf6',
  Design: '#ec4899',
}

const tabs = ['All Domains', 'EdTech', 'FinTech', 'SaaS']

const Home = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [activeTab, setActiveTab] = useState('All Domains')
  const [search, setSearch] = useState('')

  const filteredMentors = featuredMentors.filter(m =>
    activeTab === 'All Domains' ? true : m.domain === activeTab
  )

  const t = {
    bgPage: isDark ? '#0a0a1a' : '#f8fafc',
    textMain: isDark ? '#ffffff' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#475569',
    textSubtle: isDark ? '#64748b' : '#64748b',
    heroBg: isDark
      ? 'radial-gradient(ellipse at 60% 0%, #2d1b69 0%, #0a0a1a 60%)'
      : 'radial-gradient(ellipse at 60% 0%, #ede9fe 0%, #f8fafc 70%)',
    heroTagBg: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(124,58,237,0.08)',
    heroTagBorder: isDark ? 'rgba(139,92,246,0.3)' : 'rgba(124,58,237,0.25)',
    heroTagColor: isDark ? '#c084fc' : '#6d3df5',
    searchBg: isDark ? 'rgba(255,255,255,0.08)' : '#ffffff',
    searchBorder: isDark ? 'rgba(255,255,255,0.15)' : '#cbd5e1',
    searchInputColor: isDark ? '#ffffff' : '#0f172a',
    tagBg: isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
    tagBorder: isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
    tagColor: isDark ? '#e2e8f0' : '#334155',
    secMarquee: isDark ? '#0f0f1f' : '#ffffff',
    secBorder: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    secBg1: isDark ? '#0d0d1f' : '#f8fafc',
    secBg2: isDark ? 'radial-gradient(ellipse at 30% 50%, #1a0a3a 0%, #0a0a1a 60%)' : 'radial-gradient(ellipse at 30% 50%, #ede9fe 0%, #f1f5f9 70%)',
    secBg3: isDark ? '#0a0a1a' : '#ffffff',
    secBg4: isDark ? 'radial-gradient(ellipse at 50% 100%, #1a0a3a 0%, #0a0a1a 70%)' : 'radial-gradient(ellipse at 50% 100%, #ede9fe 0%, #f8fafc 80%)',
    cardBg: isDark ? '#161628' : '#ffffff',
    cardBorder: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
    cardShadow: isDark ? '0 16px 40px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15,23,42,0.06)',
    cardSubBg: isDark ? '#0f0f1f' : '#f8fafc',
    floatCardBg: isDark ? '#1e1e3a' : '#ffffff',
    floatCardBorder: isDark ? 'rgba(139,92,246,0.3)' : '#e2e8f0',
    howCardBg: isDark ? '#161628' : '#ffffff',
    howCardBorder: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
    dashBg: isDark ? '#161628' : '#ffffff',
    dashSub: isDark ? '#0f0f1f' : '#f8fafc',
    aiBg: isDark ? '#161628' : '#ffffff',
    aiSecBg: isDark ? '#0d0d1f' : '#f8f4ff',
    gridLines: isDark ? 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)' : 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
    gridOpacity: isDark ? 0.08 : 0.04,
  }

  return (
    <div style={{ background: t.bgPage, minHeight: '100vh', color: t.textMain, transition: 'background 0.25s ease, color 0.25s ease' }}>

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: t.heroBg,
        padding: '80px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, opacity: t.gridOpacity,
          backgroundImage: t.gridLines,
          backgroundSize: '40px 40px',
        }} />

        <div className="container position-relative">
          <div className="row align-items-center">
            {/* Left */}
            <div className="col-lg-6">
              <div className="d-inline-flex align-items-center gap-2 mb-4 px-3 py-2"
                style={{ background: t.heroTagBg, border: `1px solid ${t.heroTagBorder}`, borderRadius: '999px', fontSize: '0.85rem', color: t.heroTagColor }}>
                <span>✦</span>
                <span>1-on-1 sessions with India's top professionals</span>
              </div>

              <h1 style={{ fontSize: '3.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px', color: t.textMain }}>
                Find the right<br />mentor.<br />
                <span style={{ background: 'linear-gradient(90deg, #a78bfa, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Shape your career.
                </span>
              </h1>

              <p style={{ color: t.textMuted, fontSize: '1.05rem', marginBottom: '32px', maxWidth: '480px' }}>
                Book 1:1 sessions with verified professionals across EdTech, FinTech,
                SaaS, and more. No subscription — pay only for the sessions you need.
              </p>

              {/* Search */}
              <div className="d-flex gap-2 mb-4" style={{ maxWidth: '520px' }}>
                <div className="d-flex align-items-center flex-grow-1 px-3"
                  style={{ background: t.searchBg, border: `1px solid ${t.searchBorder}`, borderRadius: '12px', height: '52px' }}>
                  <span className="me-2" style={{ color: t.textSubtle }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search by skill, role, or company..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ background: 'transparent', border: 'none', outline: 'none', color: t.searchInputColor, width: '100%', fontSize: '0.95rem' }}
                  />
                </div>
                <button style={{
                  background: 'linear-gradient(135deg, #f59e0b, #e07b00)',
                  border: 'none', borderRadius: '12px', padding: '0 24px',
                  color: '#000', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                }}>
                  Search
                </button>
              </div>

              {/* Tags */}
              <div className="d-flex flex-wrap gap-2 mb-5">
                {['Product Management', 'Data Science', 'FinTech', 'Machine Learning', 'Career Switch', 'Startup Advice', 'MBA Prep', 'SaaS Growth'].map(tag => (
                  <span key={tag} style={{
                    padding: '6px 14px', borderRadius: '999px', fontSize: '0.8rem', cursor: 'pointer',
                    background: tag === 'Product Management' ? '#7c3aed' : t.tagBg,
                    border: `1px solid ${tag === 'Product Management' ? '#7c3aed' : t.tagBorder}`,
                    color: tag === 'Product Management' ? '#fff' : t.tagColor,
                  }}>{tag}</span>
                ))}
              </div>

              {/* Stats */}
              <div className="d-flex gap-4">
                {[{ val: '500+', label: 'Verified Mentors', color: '#a78bfa' },
                  { val: '12,400+', label: 'Sessions Booked', color: '#f59e0b' },
                  { val: '₹2Cr+', label: 'Mentor Earnings', color: '#34d399' }].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: '0.8rem', color: t.textSubtle }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Floating Mentor Cards */}
            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
              <div style={{ position: 'relative', width: '400px', height: '420px' }}>
                {/* Card 1 */}
                <div style={{
                  position: 'absolute', top: '20px', right: '20px', width: '220px',
                  background: t.floatCardBg, borderRadius: '16px', padding: '16px',
                  border: `1px solid ${t.floatCardBorder}`,
                  boxShadow: t.cardShadow,
                  animation: 'floatUp 3s ease-in-out infinite',
                }}>
                  <img src="https://i.pravatar.cc/150?img=47" alt="" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                  <span style={{ background: '#00b09b', borderRadius: '999px', padding: '2px 10px', fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>FinTech</span>
                  <div style={{ fontWeight: 700, marginTop: '6px', color: t.textMain }}>Priya Sharma</div>
                  <div style={{ fontSize: '0.8rem', color: t.textMuted }}>PM · Razorpay</div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span style={{ fontSize: '0.75rem', color: t.textMuted }}>Verified</span>
                    <button style={{ background: '#7c3aed', border: 'none', borderRadius: '8px', padding: '4px 12px', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>Book</button>
                  </div>
                </div>

                {/* Card 2 */}
                <div style={{
                  position: 'absolute', top: '160px', left: '10px', width: '200px',
                  background: t.floatCardBg, borderRadius: '16px', padding: '16px',
                  border: `1px solid ${t.floatCardBorder}`,
                  boxShadow: t.cardShadow,
                  animation: 'floatUp 3s ease-in-out infinite 1s',
                }}>
                  <img src="https://i.pravatar.cc/150?img=12" alt="" style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                  <span style={{ background: '#4f46e5', borderRadius: '999px', padding: '2px 10px', fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>EdTech</span>
                  <div style={{ fontWeight: 700, marginTop: '6px', fontSize: '0.9rem', color: t.textMain }}>Arjun Mehta</div>
                  <div style={{ fontSize: '0.75rem', color: t.textMuted }}>ML Engineer</div>
                  <div style={{ fontSize: '0.8rem', color: '#a78bfa', marginTop: '6px', fontWeight: 700 }}>₹2,000/session</div>
                </div>

                {/* Card 3 */}
                <div style={{
                  position: 'absolute', bottom: '10px', right: '10px', width: '190px',
                  background: t.floatCardBg, borderRadius: '16px', padding: '16px',
                  border: `1px solid ${t.floatCardBorder}`,
                  boxShadow: t.cardShadow,
                  animation: 'floatUp 3s ease-in-out infinite 0.5s',
                }}>
                  <img src="https://i.pravatar.cc/150?img=32" alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                  <span style={{ background: '#f59e0b', borderRadius: '999px', padding: '2px 10px', fontSize: '0.7rem', fontWeight: 700, color: '#000' }}>Career</span>
                  <div style={{ fontWeight: 700, marginTop: '6px', fontSize: '0.9rem', color: t.textMain }}>Sneha Kapoor</div>
                  <div style={{ fontSize: '0.75rem', color: t.textMuted }}>Career Coach · ex-McKinsey</div>
                  <div style={{ color: '#f59e0b', fontSize: '0.85rem', marginTop: '4px' }}>₹1,800/session ★★★★★</div>
                </div>

                {/* Booking notification */}
                <div style={{
                  position: 'absolute', top: '220px', left: '180px', zIndex: 10,
                  background: t.floatCardBg, borderRadius: '12px', padding: '10px 14px',
                  border: '1px solid rgba(52,211,153,0.3)', fontSize: '0.78rem',
                  color: t.textMain,
                  boxShadow: t.cardShadow,
                  display: 'flex', alignItems: 'center', gap: '6px',
                  animation: 'floatUp 3s ease-in-out infinite 1.5s',
                }}>
                  <span style={{ color: '#34d399' }}>✅</span>
                  <span>Session booked · ₹1,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section style={{ background: t.secMarquee, borderTop: `1px solid ${t.secBorder}`, borderBottom: `1px solid ${t.secBorder}`, padding: '18px 0' }}>
        <div className="container">
          <div className="d-flex justify-content-center flex-wrap gap-4">
            {[
              { icon: '🛡️', text: 'Razorpay Secured' },
              { icon: '✅', text: '500+ Verified Mentors' },
              { icon: '⚡', text: 'Instant Confirmation' },
              { icon: '₹', text: 'No Subscription' },
              { icon: '⭐', text: '4.9★ Avg Rating' },
            ].map(item => (
              <div key={item.text} className="d-flex align-items-center gap-2" style={{ color: t.textMuted, fontSize: '0.9rem', fontWeight: 600 }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ background: t.secBg1, padding: '80px 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <p style={{ color: '#7c3aed', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '12px' }}>HOW IT WORKS</p>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: t.textMain }}>Three steps to your<br />next breakthrough</h2>
          </div>
          <div className="row g-4">
            {[
              { num: '01', icon: '🔍', title: 'Browse & Filter', desc: 'Search by skill, role, or company. Read verified reviews and check live availability.', color: '#7c3aed', bg: 'rgba(124,58,237,0.15)' },
              { num: '02', icon: '📅', title: 'Book a Session', desc: 'Pick a time slot. Pay securely via Razorpay — UPI, card, or net banking. No subscription, ever.', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
              { num: '03', icon: '📈', title: 'Grow Together', desc: 'Show up, learn fast, and leave a verified review. Come back when you\'re ready for the next level.', color: '#34d399', bg: 'rgba(52,211,153,0.15)' },
            ].map((step, i) => (
              <div key={step.num} className="col-md-4">
                <div style={{
                  background: t.howCardBg, borderRadius: '20px', padding: '32px',
                  border: `1px solid ${t.howCardBorder}`, height: '100%',
                  boxShadow: t.cardShadow,
                  position: 'relative',
                }}>
                  {i < 2 && <span style={{ position: 'absolute', right: '-12px', top: '50%', zIndex: 1, color: t.textSubtle, fontSize: '1.2rem' }}>›</span>}
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: step.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '20px' }}>
                    {step.icon}
                  </div>
                  <p style={{ color: '#7c3aed', fontWeight: 800, fontSize: '0.8rem', marginBottom: '8px' }}>{step.num}</p>
                  <h5 style={{ color: t.textMain, fontWeight: 800, marginBottom: '12px' }}>{step.title}</h5>
                  <p style={{ color: t.textMuted, fontSize: '0.9rem', margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOMAINS ===== */}
      <section style={{ background: t.secBg2, padding: '80px 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <p style={{ color: '#7c3aed', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '12px' }}>DOMAINS WE COVER</p>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: t.textMain }}>
              One platform, <span style={{ color: '#a78bfa' }}>four fields</span><br />
              <span style={{ color: '#f59e0b' }}>of expertise</span>
            </h2>
            <p style={{ color: t.textMuted, marginTop: '12px' }}>Whether you're switching careers, scaling a startup, or building financial skills — there's a mentor for exactly that.</p>
          </div>
          <div className="row g-4">
            {[
              { icon: '🎓', tag: 'EdTech', tagColor: '#4f46e5', title: 'Skill-Based Learning & Career Guidance', desc: "Mentors who've made the career switches you're planning — non-tech to product, campus to big tech.", points: ['Personalised skill-learning paths', '1:1 career roadmap sessions', 'Resume & interview prep'], bg: isDark ? 'rgba(79,70,229,0.1)' : 'rgba(79,70,229,0.06)', border: isDark ? 'rgba(79,70,229,0.3)' : 'rgba(79,70,229,0.2)' },
              { icon: '💳', tag: 'FinTech', tagColor: '#00b09b', title: 'Finance, Payments & FinTech Careers', desc: 'Guidance from Razorpay, CRED, Zerodha professionals — with transparent Razorpay payments built in.', points: ['Payments & banking expertise', 'Mentor earnings via Razorpay', 'Real-time payout tracking'], bg: isDark ? 'rgba(0,176,155,0.1)' : 'rgba(0,176,155,0.06)', border: isDark ? 'rgba(0,176,155,0.3)' : 'rgba(0,176,155,0.2)' },
              { icon: '⚡', tag: 'SaaS', tagColor: '#8b5cf6', title: 'Per-Session Marketplace — No Lock-in', desc: 'Mentorship should be accessible. Book a single session, no subscriptions, no commitment.', points: ['Per-session pricing model', 'Cancel or reschedule anytime', 'Zero platform lock-in'], bg: isDark ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.06)', border: isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)' },
              { icon: '🤝', tag: 'Community', tagColor: '#f59e0b', title: 'Smart Matching & Verified Reviews', desc: 'AI-powered matching surfaces the right mentor instantly. Verified reviews build trust that lasts.', points: ['AI-powered mentor matching', 'Verified session reviews', 'Growing alumni network'], bg: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.06)', border: isDark ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.2)' },
            ].map(domain => (
              <div key={domain.tag} className="col-md-6">
                <div style={{ background: isDark ? domain.bg : '#ffffff', border: `1px solid ${domain.border}`, borderRadius: '20px', padding: '32px', height: '100%', boxShadow: t.cardShadow }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span style={{ fontSize: '1.4rem' }}>{domain.icon}</span>
                    <span style={{ background: domain.tagColor, borderRadius: '999px', padding: '3px 12px', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>{domain.tag}</span>
                  </div>
                  <h5 style={{ color: t.textMain, fontWeight: 800, marginBottom: '10px' }}>{domain.title}</h5>
                  <p style={{ color: t.textMuted, fontSize: '0.9rem', marginBottom: '16px' }}>{domain.desc}</p>
                  {domain.points.map(p => (
                    <div key={p} className="d-flex align-items-center gap-2 mb-2">
                      <span style={{ color: domain.tagColor }}>✓</span>
                      <span style={{ color: t.textMuted, fontSize: '0.9rem' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED MENTORS ===== */}
      <section style={{ background: t.secBg3, padding: '80px 0' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <p style={{ color: '#7c3aed', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '4px' }}>FEATURED MENTORS</p>
              <h2 style={{ color: t.textMain, fontWeight: 900, fontSize: '2.2rem', margin: 0 }}>Meet our mentors</h2>
            </div>
            <Link to="/mentors" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 700 }}>Browse all ›</Link>
          </div>

          {/* Tabs */}
          <div className="d-flex gap-2 mb-4 mt-4">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 18px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
                  background: activeTab === tab ? '#7c3aed' : (isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'),
                  color: activeTab === tab ? '#fff' : (isDark ? '#94a3b8' : '#475569'),
                }}>
                {tab}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {filteredMentors.map(mentor => (
              <div key={mentor.id} className="col-md-4">
                <div style={{ background: t.cardBg, borderRadius: '20px', overflow: 'hidden', border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}>
                  {/* Image with gradient overlay */}
                  <div style={{ position: 'relative', height: '200px', background: mentor.color }}>
                    <img src={`https://i.pravatar.cc/300?img=${mentor.id}`} alt={mentor.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'overlay', opacity: 0.7 }} />
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                      <div className="d-flex justify-content-between align-items-end">
                        <div>
                          <span style={{ background: domainColors[mentor.domain] || '#7c3aed', borderRadius: '999px', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700, display: 'block', width: 'fit-content', marginBottom: '4px', color: '#fff' }}>{mentor.domain}</span>
                          <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>{mentor.name}</div>
                          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>{mentor.role} · {mentor.company}</div>
                        </div>
                        <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.85rem' }}>★ {mentor.rating}</div>
                      </div>
                    </div>
                  </div>
                  {/* Card body */}
                  <div style={{ padding: '16px' }}>
                    <div className="d-flex gap-2 mb-3 flex-wrap">
                      {['React', 'TypeScript'].map(skill => (
                        <span key={skill} style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', borderRadius: '8px', padding: '4px 10px', fontSize: '0.75rem', color: t.textMuted }}>{skill}</span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div style={{ color: '#7c3aed', fontWeight: 800, fontSize: '1.1rem' }}>₹{mentor.rate.toLocaleString()}</div>
                        <div style={{ color: t.textSubtle, fontSize: '0.75rem' }}>per session · {mentor.reviews} reviews</div>
                      </div>
                      <Link to={`/mentors/${mentor.id}`}
                        style={{ background: '#7c3aed', borderRadius: '10px', padding: '8px 18px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI MATCHING ===== */}
      <section style={{ background: t.aiSecBg, padding: '80px 0' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left — Match card */}
            <div className="col-lg-6">
              <div style={{ background: t.cardBg, borderRadius: '20px', padding: '28px', boxShadow: t.cardShadow, border: `1px solid ${t.cardBorder}`, maxWidth: '420px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div style={{ fontWeight: 800, color: t.textMain, fontSize: '1rem' }}>Your Mentor Matches</div>
                    <div style={{ color: t.textMuted, fontSize: '0.82rem' }}>Based on your goals & profile</div>
                  </div>
                  <span style={{ background: '#7c3aed', borderRadius: '999px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>✦ AI Matched</span>
                </div>
                {[
                  { name: 'Priya Sharma', role: 'PM · Razorpay', match: 98, color: '#22c55e' },
                  { name: 'Arjun Mehta', role: 'ML Engineer · Google', match: 94, color: '#3b82f6' },
                  { name: 'Sneha Kapoor', role: 'Career Coach · McKinsey', match: 91, color: '#f59e0b' },
                ].map(m => (
                  <div key={m.name} className="d-flex align-items-center gap-3 mb-3">
                    <img src={`https://i.pravatar.cc/60?img=${m.name.length}`} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: t.textMain, fontSize: '0.9rem' }}>{m.name}</div>
                      <div style={{ color: t.textMuted, fontSize: '0.78rem' }}>{m.role}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: m.color, fontWeight: 700, fontSize: '0.85rem' }}>{m.match}%</div>
                      <div style={{ width: '80px', height: '4px', background: isDark ? '#1e1e38' : '#f1f5f9', borderRadius: '999px', marginTop: '4px' }}>
                        <div style={{ width: `${m.match}%`, height: '100%', background: m.color, borderRadius: '999px' }} />
                      </div>
                    </div>
                  </div>
                ))}
                <button style={{ width: '100%', background: '#7c3aed', border: 'none', borderRadius: '12px', padding: '12px', color: '#fff', fontWeight: 700, cursor: 'pointer', marginTop: '8px' }}>
                  View all matches
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="col-lg-6">
              <p style={{ color: '#7c3aed', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '12px' }}>COMMUNITY & MATCHING</p>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: t.textMain, lineHeight: 1.2 }}>
                The right mentor<br />
                <span style={{ color: '#7c3aed' }}>finds you —</span>{' '}
                <span style={{ color: '#f59e0b' }}>fast.</span>
              </h2>
              <p style={{ color: t.textMuted, margin: '16px 0 24px', fontSize: '1rem' }}>
                Tell us your goal and current role. Our matching engine surfaces the three most relevant mentors from 500+ profiles — with verified reviews backing every recommendation.
              </p>
              {['Goal-based matching across 20+ skill categories', 'Every review tied to a completed, paid session', 'Growing alumni network — mentees become mentors', 'Message a mentor before you book, no pressure'].map(pt => (
                <div key={pt} className="d-flex align-items-center gap-3 mb-3">
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isDark ? 'rgba(124,58,237,0.2)' : '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#7c3aed', fontSize: '0.8rem' }}>✓</span>
                  </div>
                  <span style={{ color: t.textMuted, fontSize: '0.9rem' }}>{pt}</span>
                </div>
              ))}
              <Link to="/mentors" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#7c3aed', borderRadius: '999px', padding: '12px 24px', color: '#fff', textDecoration: 'none', fontWeight: 700, marginTop: '16px' }}>
                Get matched now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAY PER SESSION ===== */}
      <section style={{ background: t.secBg1, padding: '80px 0' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p style={{ color: '#7c3aed', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '12px' }}>TRANSPARENT PRICING</p>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: t.textMain, lineHeight: 1.1 }}>
                Pay per session.<br />
                <span style={{ color: t.textSubtle }}>Never per month.</span>
              </h2>
              <p style={{ color: t.textMuted, margin: '20px 0', fontSize: '1rem' }}>
                Mentorship should not be a recurring charge you forget to cancel. Pay exactly for what you use — each session, independently. Checkout is secured by Razorpay.
              </p>
              {['No subscription, no auto-renewal', 'Razorpay checkout — UPI, card, net banking', 'Full refund if mentor cancels', 'Transparent earnings, no hidden platform cuts'].map(pt => (
                <div key={pt} className="d-flex align-items-center gap-3 mb-3">
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff', flexShrink: 0 }}>✓</span>
                  <span style={{ color: t.textMain, fontSize: '0.95rem' }}>{pt}</span>
                </div>
              ))}
              <div className="d-flex gap-3 mt-4 flex-wrap">
                {['🛡️ Razorpay Secured', '⚡ Instant Confirmation', '💸 Same-Day Payout'].map(b => (
                  <span key={b} style={{ background: t.tagBg, border: `1px solid ${t.tagBorder}`, borderRadius: '999px', padding: '6px 16px', fontSize: '0.8rem', color: t.textMuted }}>{b}</span>
                ))}
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="col-lg-6">
              <div style={{ background: t.dashBg, borderRadius: '20px', padding: '24px', border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div style={{ fontWeight: 800, color: t.textMain }}>Mentor Earnings Dashboard</div>
                    <div style={{ color: t.textSubtle, fontSize: '0.82rem' }}>June 2026</div>
                  </div>
                  <span style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '999px', padding: '4px 12px', fontSize: '0.75rem', color: '#34d399' }}>● Active</span>
                </div>
                <div className="row g-3 mb-4">
                  {[
                    { label: 'Total Earned', val: '₹42,600', sub: '+18% vs last month', subColor: '#34d399' },
                    { label: 'Sessions Done', val: '28', sub: '+4 this week', subColor: '#a78bfa' },
                    { label: 'Pending Payout', val: '₹8,400', sub: 'Via Razorpay', subColor: '#60a5fa' },
                    { label: 'Avg. Rating', val: '4.9 ★', sub: 'Top 5% mentor', subColor: '#f59e0b' },
                  ].map(s => (
                    <div key={s.label} className="col-6">
                      <div style={{ background: t.dashSub, borderRadius: '12px', padding: '16px' }}>
                        <div style={{ color: t.textSubtle, fontSize: '0.78rem', marginBottom: '4px' }}>{s.label}</div>
                        <div style={{ fontWeight: 800, color: t.textMain, fontSize: '1.3rem' }}>{s.val}</div>
                        <div style={{ color: s.subColor, fontSize: '0.75rem', marginTop: '4px' }}>{s.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Recent Payouts */}
                <div style={{ color: t.textSubtle, fontSize: '0.78rem', marginBottom: '8px' }}>Recent Payouts</div>
                {[{ date: 'Jun 25', amt: '₹12,000' }, { date: 'Jun 18', amt: '₹9,600' }, { date: 'Jun 10', amt: '₹11,400' }].map(p => (
                  <div key={p.date} className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ color: t.textSubtle, fontSize: '0.85rem' }}>{p.date}</span>
                    <span style={{ color: t.textMain, fontWeight: 700, fontSize: '0.85rem' }}>{p.amt}</span>
                    <span style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '999px', padding: '2px 10px', fontSize: '0.72rem' }}>Paid</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ background: t.secBg4, padding: '80px 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <p style={{ color: '#7c3aed', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '12px' }}>REAL STORIES</p>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: t.textMain }}>What people are saying</h2>
          </div>
          <div className="row g-4">
            {[
              { text: 'Booked one session with a Razorpay PM and left with a full product strategy for my startup. Worth every rupee — no subscription pressure, just pure value.', name: 'Ananya Singh', role: 'Founder, Finflow', initials: 'AS', color: '#7c3aed' },
              { text: 'Switched from mechanical engineering to data science in 6 months. My mentor gave me a week-by-week plan that actually worked. Now at Sarvam AI.', name: 'Karan Bhatia', role: 'Data Scientist, Sarvam AI', initials: 'KB', color: '#4f46e5' },
              { text: 'As a mentor, the earnings dashboard is transparent and payouts hit fast. I made ₹1.2L in 3 months with zero admin overhead.', name: 'Dr. Meera Iyer', role: 'Product Lead & Mentor', initials: 'MI', color: '#00b09b' },
            ].map(item => (
              <div key={item.name} className="col-md-4">
                <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '20px', padding: '28px', height: '100%', boxShadow: t.cardShadow }}>
                  <div style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '16px' }}>★★★★★</div>
                  <p style={{ color: t.textMuted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>"{item.text}"</p>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>{item.initials}</div>
                    <div>
                      <div style={{ color: t.textMain, fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                      <div style={{ color: t.textSubtle, fontSize: '0.8rem' }}>{item.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{ background: t.secBg3, padding: '60px 0 80px' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div style={{ background: 'linear-gradient(135deg, #3b1fa8, #7c3aed)', borderRadius: '20px', padding: '40px', height: '100%' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>👥</div>
                <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '12px' }}>Find Your Mentor</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>Browse 500+ verified mentors. Book your first session in under 2 minutes — no subscription required.</p>
                <Link to="/mentors" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f59e0b', borderRadius: '999px', padding: '12px 24px', color: '#000', textDecoration: 'none', fontWeight: 800 }}>
                  Explore Mentors →
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ background: isDark ? '#161628' : '#f8f4ff', border: `1px solid ${t.cardBorder}`, borderRadius: '20px', padding: '40px', height: '100%', boxShadow: t.cardShadow }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>💼</div>
                <h4 style={{ color: t.textMain, fontWeight: 800, marginBottom: '12px' }}>Become a Mentor</h4>
                <p style={{ color: t.textMuted, marginBottom: '24px' }}>Share your expertise. Set your own rate. Get paid directly via Razorpay — same day, no delays.</p>
                <Link to="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#7c3aed', borderRadius: '999px', padding: '12px 24px', color: '#fff', textDecoration: 'none', fontWeight: 800 }}>
                  Apply as Mentor →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  )
}

export default Home