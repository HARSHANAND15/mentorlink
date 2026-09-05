import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// =====================
// Constants
// =====================
const categories = ['All', 'Career', 'AI', 'Interview', 'Mentors', 'Platform']

export const blogPosts = [
  {
    id: 1,
    title: 'How to choose the right mentor for your next career move',
    category: 'Career',
    readTime: '5 min read',
    summary: 'A practical checklist for matching your current goal with the right mentor, domain, and session format.',
    content: [
      'Start with the outcome you want from mentorship: a job switch, interview confidence, portfolio feedback, leadership clarity, or a better learning plan.',
      'The best mentor is not always the most famous person. Look for someone who has solved a problem close to yours recently and can give specific feedback.',
      'Before booking, compare domain experience, session format, reviews, and whether their skills match the next decision you need to make.',
    ],
    tag: 'Career Growth',
    tagColor: '#f59e0b',
    author: 'Priya Sharma',
    authorInitials: 'PS',
    authorColor: '#00b09b',
    date: 'Jun 25, 2026',
    featured: true,
  },
  {
    id: 2,
    title: 'Daily AI update: skills that hiring teams are asking for now',
    category: 'AI',
    readTime: '4 min read',
    summary: 'A quick scan of AI-ready skills for product, engineering, data, and business roles.',
    content: [
      'Hiring teams are increasingly asking for practical AI fluency rather than vague tool familiarity.',
      'Product and business candidates should understand AI workflows, evaluation basics, and how to scope useful automation.',
      'Engineering and data candidates should practice prompt design, retrieval patterns, model evaluation, and responsible deployment habits.',
    ],
    tag: 'Latest Update',
    tagColor: '#7c3aed',
    author: 'Arjun Mehta',
    authorInitials: 'AM',
    authorColor: '#4f46e5',
    date: 'Jun 22, 2026',
    featured: false,
  },
  {
    id: 3,
    title: 'Interview prep plan for product and software roles',
    category: 'Interview',
    readTime: '6 min read',
    summary: 'Break down your preparation into mock sessions, portfolio review, system design, and storytelling practice.',
    content: [
      'A strong prep plan separates knowledge gaps from performance gaps. Study sessions build knowledge; mock interviews build performance.',
      'For software roles, alternate DSA, system design, project explanation, and behavioral practice.',
      'For product roles, practice product sense, metrics, strategy, execution, and clear storytelling from your past work.',
    ],
    tag: 'Interview Prep',
    tagColor: '#ec4899',
    author: 'Arjun Mehta',
    authorInitials: 'AM',
    authorColor: '#4f46e5',
    date: 'Jun 20, 2026',
    featured: false,
  },
  {
    id: 4,
    title: 'What top mentors review before a first session',
    category: 'Mentors',
    readTime: '3 min read',
    summary: 'Resume, goals, recent work, constraints, and the exact decision you want help with.',
    content: [
      'Great mentors prepare by reading the learner context before the call starts.',
      'They look for the learner goal, current blockers, relevant work samples, and constraints like timeline, budget, or target companies.',
      'The clearer your pre-session note is, the more useful the live session becomes.',
    ],
    tag: 'Mentor Notes',
    tagColor: '#00b09b',
    author: 'Dr. Meera Iyer',
    authorInitials: 'MI',
    authorColor: '#00b09b',
    date: 'Jun 18, 2026',
    featured: false,
  },
  {
    id: 5,
    title: 'MentorLink product update: smoother booking flow',
    category: 'Platform',
    readTime: '2 min read',
    summary: 'We are improving session discovery, booking clarity, and post-session next steps for learners.',
    content: [
      'The booking flow is being tuned to make mentor discovery faster and session expectations clearer.',
      'Learners should be able to compare availability, domain fit, pricing, and session focus without extra back-and-forth.',
      'After each session, the product will increasingly emphasize next steps so advice turns into action.',
    ],
    tag: 'Product News',
    tagColor: '#34d399',
    author: 'MentorLink Team',
    authorInitials: 'ML',
    authorColor: '#7c3aed',
    date: 'Jun 15, 2026',
    featured: false,
  },
  {
    id: 6,
    title: 'Daily learning habit: one focused session, one clear action',
    category: 'Career',
    readTime: '4 min read',
    summary: 'Turn mentor advice into visible progress by ending every session with one measurable action.',
    content: [
      'Progress compounds when each session ends with one clear action instead of ten vague intentions.',
      'Choose an action that can be completed in the next 24 to 72 hours, such as rewriting a resume section or recording one mock answer.',
      'Bring the result back to your next mentor session so feedback becomes a loop, not a one-time event.',
    ],
    tag: 'Daily Guide',
    tagColor: '#f59e0b',
    author: 'Sneha Kapoor',
    authorInitials: 'SK',
    authorColor: '#8b5cf6',
    date: 'Jun 12, 2026',
    featured: false,
  },
  {
    id: 7,
    title: 'How AI is reshaping career coaching in 2026',
    category: 'AI',
    readTime: '7 min read',
    summary: 'AI tools are changing how mentors prepare, how learners research, and how sessions are structured. Here is what is shifting.',
    content: [
      'AI is making mentorship more focused by handling first-pass research, draft reviews, and practice prompts.',
      'Human mentors still matter most for judgment, tradeoffs, accountability, and context-aware feedback.',
      'The strongest coaching experiences combine AI-assisted preparation with a mentor who can challenge assumptions and prioritize the next move.',
    ],
    tag: 'AI Trends',
    tagColor: '#7c3aed',
    author: 'Rohit Verma',
    authorInitials: 'RV',
    authorColor: '#8b5cf6',
    date: 'Jun 10, 2026',
    featured: false,
  },
  {
    id: 8,
    title: 'Mock interview checklist: what to do 48 hours before',
    category: 'Interview',
    readTime: '5 min read',
    summary: 'The exact 10-point checklist that mentors recommend to learners before every mock or real interview.',
    content: [
      'Two days before an interview, reduce new learning and shift into rehearsal mode.',
      'Review your resume stories, prepare role-specific examples, test your setup, and run at least one timed mock.',
      'The goal is not to memorize every answer. The goal is to enter the interview calm, structured, and ready to think aloud.',
    ],
    tag: 'Interview Prep',
    tagColor: '#ec4899',
    author: 'Priya Sharma',
    authorInitials: 'PS',
    authorColor: '#00b09b',
    date: 'Jun 8, 2026',
    featured: false,
  },
]

// =====================
// Blog Page Component
// =====================
const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const today = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  // Featured post — pehla featured:true wala
  const featuredPost = blogPosts.find(p => p.featured)

  // Grid posts — featured hatao, category + search filter lagao
  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(p => !p.featured)
      .filter(p => activeCategory === 'All' ? true : p.category === activeCategory)
      .filter(p =>
        searchQuery === ''
          ? true
          : p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [activeCategory, searchQuery])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main style={{ background: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: 'radial-gradient(ellipse at 50% 0%, #2d1b69 0%, #0a0a1a 65%)',
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="container position-relative">
          <div className="row align-items-center g-5">

            {/* Left — Hero Text */}
            <div className="col-lg-7">
              <span style={{
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.3)',
                borderRadius: '999px',
                padding: '6px 16px',
                fontSize: '0.82rem',
                color: '#a78bfa',
                fontWeight: 700,
                letterSpacing: '0.05em',
                display: 'inline-block',
                marginBottom: '20px',
              }}>
                ✦ Daily MentorLink Blog
              </span>

              <h1 style={{
                fontSize: '3.2rem',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: '16px',
                color: '#fff',
              }}>
                Latest news, career updates,<br />
                <span style={{
                  background: 'linear-gradient(90deg, #a78bfa, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  and mentor insights.
                </span>
              </h1>

              <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '32px', maxWidth: '500px' }}>
                Fresh guidance for learners and mentors, updated daily with career trends,
                interview prep, product updates, and mentorship playbooks.
              </p>

              {/* Search Bar */}
              <div className="d-flex gap-2" style={{ maxWidth: '480px', marginBottom: '28px' }}>
                <div className="d-flex align-items-center flex-grow-1 px-3"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    height: '48px',
                  }}>
                  <span className="me-2" style={{ color: '#64748b' }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search articles, topics, authors..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#fff',
                      width: '100%',
                      fontSize: '0.9rem',
                    }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')}
                      style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1rem' }}>
                      ✕
                    </button>
                  )}
                </div>
                <button style={{
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0 20px',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}>
                  Search
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/mentors" style={{
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  borderRadius: '999px',
                  padding: '10px 24px',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}>
                  Find Mentors
                </Link>
                <Link to="/signup" style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '999px',
                  padding: '10px 24px',
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}>
                  Become a Mentor
                </Link>
              </div>
            </div>

            {/* Right — Today's Digest Card */}
            <div className="col-lg-5">
              <div style={{
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: '20px',
                padding: '28px',
              }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                  }}>📰</div>
                  <div>
                    <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem' }}>TODAY'S DIGEST</div>
                    <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{today}</div>
                  </div>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6 }}>
                  3 new mentor tips, 2 career updates, and 1 platform note prepared for today.
                </p>

                {/* Quick stats */}
                <div className="row g-3">
                  {[
                    { num: '8', label: 'Articles Today', color: '#a78bfa' },
                    { num: '6', label: 'Categories', color: '#f59e0b' },
                    { num: '5 min', label: 'Avg Read Time', color: '#34d399' },
                  ].map(s => (
                    <div key={s.label} className="col-4 text-center">
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.num}</div>
                      <div style={{ fontSize: '0.72rem', color: '#475569' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Category pills */}
                <div className="d-flex flex-wrap gap-2 mt-4">
                  {['Career', 'AI', 'Interview', 'Platform'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        background: activeCategory === cat ? '#7c3aed' : 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '999px',
                        padding: '4px 14px',
                        color: activeCategory === cat ? '#fff' : '#94a3b8',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      {featuredPost && (
        <section style={{ background: '#0d0d1f', padding: '60px 0' }}>
          <div className="container">
            <p style={{ color: '#7c3aed', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.82rem', marginBottom: '20px' }}>
              ★ FEATURED ARTICLE
            </p>

            <div style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.1) 100%)',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: '24px',
              padding: '40px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '32px',
              alignItems: 'center',
            }}>
              <div>
                {/* Tag */}
                <span style={{
                  background: featuredPost.tagColor,
                  borderRadius: '999px',
                  padding: '4px 14px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#000',
                  display: 'inline-block',
                  marginBottom: '16px',
                }}>
                  {featuredPost.tag}
                </span>

                <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.8rem', marginBottom: '12px', lineHeight: 1.3 }}>
                  {featuredPost.title}
                </h2>

                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px', maxWidth: '600px', lineHeight: 1.7 }}>
                  {featuredPost.summary}
                </p>

                {/* Author + Meta */}
                <div className="d-flex align-items-center gap-4 flex-wrap">
                  <div className="d-flex align-items-center gap-2">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: featuredPost.authorColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '0.8rem',
                    }}>
                      {featuredPost.authorInitials}
                    </div>
                    <div>
                      <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.85rem' }}>{featuredPost.author}</div>
                      <div style={{ color: '#475569', fontSize: '0.75rem' }}>{featuredPost.date}</div>
                    </div>
                  </div>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>⏱ {featuredPost.readTime}</span>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>📂 {featuredPost.category}</span>
                </div>
              </div>

              {/* Read Now Button */}
              <div style={{ flexShrink: 0 }}>
                <Link to={`/blog/${featuredPost.id}`} style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  borderRadius: '16px',
                  padding: '20px 28px',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textAlign: 'center',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📖</span>
                  Read Now
                  <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#c4b5fd' }}>
                    {featuredPost.readTime}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== BLOG GRID SECTION ===== */}
      <section style={{ background: '#0a0a1a', padding: '60px 0' }}>
        <div className="container">

          {/* Toolbar — Title + Filters */}
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-4 mb-5">
            <div>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.8rem', marginBottom: '4px' }}>
                All Latest Blogs
              </h2>
              <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0 }}>
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
                {searchQuery ? ` for "${searchQuery}"` : ''}
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="d-flex flex-wrap gap-2" role="group" aria-label="Blog categories">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    transition: 'all 0.2s',
                    background: activeCategory === category
                      ? 'linear-gradient(135deg, #7c3aed, #4f46e5)'
                      : 'rgba(255,255,255,0.06)',
                    color: activeCategory === category ? '#fff' : '#94a3b8',
                    boxShadow: activeCategory === category
                      ? '0 4px 14px rgba(124,58,237,0.3)'
                      : 'none',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Cards Grid */}
          {filteredPosts.length > 0 ? (
            <div className="row g-4">
              {filteredPosts.map(post => (
                <div key={post.id} className="col-md-6 col-lg-4">
                  <article
                    onMouseEnter={() => setHoveredCard(post.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: '#161628',
                      border: hoveredCard === post.id
                        ? '1px solid rgba(124,58,237,0.4)'
                        : '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '20px',
                      padding: '28px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      transform: hoveredCard === post.id ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: hoveredCard === post.id
                        ? '0 12px 40px rgba(124,58,237,0.15)'
                        : 'none',
                    }}
                  >
                    {/* Top — Tag + Title + Summary */}
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span style={{
                          background: post.tagColor,
                          borderRadius: '999px',
                          padding: '3px 12px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: post.tagColor === '#f59e0b' ? '#000' : '#fff',
                        }}>
                          {post.tag}
                        </span>
                        <span style={{ color: '#334155', fontSize: '0.75rem' }}>{post.date}</span>
                      </div>

                      <h3 style={{
                        color: hoveredCard === post.id ? '#c4b5fd' : '#e2e8f0',
                        fontWeight: 800,
                        fontSize: '1rem',
                        lineHeight: 1.4,
                        marginBottom: '12px',
                        transition: 'color 0.2s',
                      }}>
                        {post.title}
                      </h3>

                      <p style={{
                        color: '#64748b',
                        fontSize: '0.875rem',
                        lineHeight: 1.65,
                        marginBottom: '20px',
                      }}>
                        {post.summary}
                      </p>
                    </div>

                    {/* Bottom — Author + Meta + Read Link */}
                    <div>
                      <div style={{
                        height: '1px',
                        background: 'rgba(255,255,255,0.06)',
                        marginBottom: '16px',
                      }} />

                      <div className="d-flex justify-content-between align-items-center">
                        {/* Author */}
                        <div className="d-flex align-items-center gap-2">
                          <div style={{
                            width: '32px', height: '32px',
                            borderRadius: '50%',
                            background: post.authorColor,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '0.72rem', color: '#fff',
                            flexShrink: 0,
                          }}>
                            {post.authorInitials}
                          </div>
                          <div>
                            <div style={{ color: '#e2e8f0', fontSize: '0.78rem', fontWeight: 600 }}>
                              {post.author}
                            </div>
                            <div style={{ color: '#334155', fontSize: '0.7rem' }}>
                              ⏱ {post.readTime}
                            </div>
                          </div>
                        </div>

                        {/* Read More */}
                        <Link
                          to={`/blog/${post.id}`}
                          style={{
                            color: '#7c3aed',
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          Read →
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-5">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <h4 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '8px' }}>No articles found</h4>
              <p style={{ color: '#475569' }}>
                Try a different category or clear your search.
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery('') }}
                style={{
                  background: '#7c3aed', border: 'none', borderRadius: '999px',
                  padding: '10px 24px', color: '#fff', fontWeight: 700,
                  cursor: 'pointer', marginTop: '12px',
                }}
              >
                Show all articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section style={{
        background: 'radial-gradient(ellipse at 50% 50%, #1a0a3a 0%, #0a0a1a 70%)',
        padding: '80px 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="container">
          <div style={{
            maxWidth: '560px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📬</div>
            <p style={{ color: '#7c3aed', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.82rem', marginBottom: '12px' }}>
              STAY UPDATED
            </p>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '2rem', marginBottom: '12px' }}>
              Get the daily digest in your inbox
            </h2>
            <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '0.95rem' }}>
              Career tips, mentor insights, and platform updates — delivered every morning.
              No spam, unsubscribe anytime.
            </p>

            {subscribed ? (
              <div style={{
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.3)',
                borderRadius: '16px',
                padding: '20px 28px',
                color: '#34d399',
                fontWeight: 700,
                fontSize: '1rem',
              }}>
                ✅ You're subscribed! Check your inbox for the first digest.
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="d-flex gap-2" style={{ maxWidth: '440px', margin: '0 auto' }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: '#fff',
                      outline: 'none',
                      fontSize: '0.9rem',
                    }}
                  />
                  <button type="submit" style={{
                    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 22px',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}>
                    Subscribe →
                  </button>
                </div>
                <p style={{ color: '#334155', fontSize: '0.78rem', marginTop: '12px' }}>
                  🔒 No spam. Unsubscribe anytime.
                </p>
              </form>
            )}

            {/* Trust badges */}
            <div className="d-flex justify-content-center gap-4 flex-wrap mt-4">
              {['500+ Readers', 'Daily Updates', 'Free Forever'].map(b => (
                <span key={b} style={{
                  color: '#334155',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Blog
