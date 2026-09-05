import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Col */}
          <div className="col-lg-4 col-md-6">
            <Link className="footer-brand" to="/">
              <span className="footer-brand-mark">ML</span>
              <span>Mentor Link</span>
            </Link>
            <p className="footer-copy">
              Connect with India's top industry mentors and accelerate your career growth
              through personalized 1:1 mentorship sessions.
            </p>
            <div className="d-flex align-items-center gap-2 mt-3" style={{ color: '#94a3b8', fontSize: '0.84rem' }}>
              <span>🛡️</span>
              <span>Payments secured by Razorpay</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="footer-heading">Platform</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/mentors">Find Mentors</Link></li>
              <li><Link to="/signup">Become a Mentor</Link></li>
              <li><Link to="/#how-it-works">How it Works</Link></li>
              <li><Link to="/blog">Blog & Insights</Link></li>
            </ul>
          </div>

          {/* Domains */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="footer-heading">Domains</h6>
            <ul className="footer-links">
              <li><Link to="/mentors?domain=FinTech">💳 FinTech</Link></li>
              <li><Link to="/mentors?domain=EdTech">🎓 EdTech</Link></li>
              <li><Link to="/mentors?domain=Career">🚀 Career</Link></li>
              <li><Link to="/mentors?domain=SaaS">⚡ SaaS</Link></li>
              <li><Link to="/mentors?domain=Design">🎨 Design</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">Contact & Location</h6>
            <ul className="footer-links">
              <li>
                <a href="mailto:support@mentorlink.com">
                  ✉️ support@mentorlink.com
                </a>
              </li>
              <li>
                <a href="tel:+919999999999">
                  📞 +91 99999 99999
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Patna%2C+Bihar%2C+India"
                  target="_blank"
                  rel="noreferrer"
                >
                  📍 Patna, Bihar, India
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>Created with ❤️ by HARSH ANAND</span>
          <span>© {new Date().getFullYear()} Mentor Link. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
