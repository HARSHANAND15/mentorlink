import { Link, useParams } from 'react-router-dom'
import { blogPosts } from './Blog'

const BlogDetail = () => {
  const { id } = useParams()
  const post = blogPosts.find(article => article.id === Number(id))
  const relatedPosts = blogPosts.filter(article => article.id !== post?.id).slice(0, 3)

  if (!post) {
    return (
      <main style={{ background: '#0a0a1a', minHeight: '100vh', color: '#fff', padding: '90px 0' }}>
        <div className="container text-center">
          <p style={{ color: '#7c3aed', fontWeight: 800, marginBottom: '12px' }}>ARTICLE NOT FOUND</p>
          <h1 style={{ color: '#fff', fontWeight: 900, marginBottom: '18px' }}>This blog post is not available</h1>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              padding: '11px 24px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              color: '#fff',
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>
      <section style={{
        background: 'radial-gradient(ellipse at 50% 0%, #2d1b69 0%, #0a0a1a 68%)',
        padding: '72px 0 46px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <Link to="/blog" style={{ color: '#a78bfa', fontWeight: 800, textDecoration: 'none', fontSize: '0.9rem' }}>
            Back to Blog
          </Link>

          <div style={{ marginTop: '28px' }}>
            <span style={{
              background: post.tagColor,
              borderRadius: '999px',
              padding: '5px 14px',
              color: post.tagColor === '#f59e0b' ? '#000' : '#fff',
              fontSize: '0.78rem',
              fontWeight: 800,
            }}>
              {post.tag}
            </span>
          </div>

          <h1 style={{ color: '#fff', fontSize: '3rem', lineHeight: 1.12, fontWeight: 900, margin: '18px 0' }}>
            {post.title}
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '760px' }}>
            {post.summary}
          </p>

          <div className="d-flex align-items-center gap-3 flex-wrap" style={{ marginTop: '26px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: post.authorColor,
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
              fontWeight: 900,
              fontSize: '0.82rem',
            }}>
              {post.authorInitials}
            </div>
            <div>
              <div style={{ color: '#e2e8f0', fontWeight: 800 }}>{post.author}</div>
              <div style={{ color: '#475569', fontSize: '0.82rem' }}>{post.date} • {post.readTime} • {post.category}</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '56px 0 76px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <article style={{
            background: '#111126',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: '34px',
          }}>
            {post.content.map((paragraph, index) => (
              <p
                key={paragraph}
                style={{
                  color: '#cbd5e1',
                  fontSize: '1rem',
                  lineHeight: 1.85,
                  marginBottom: index === post.content.length - 1 ? 0 : '22px',
                }}
              >
                {paragraph}
              </p>
            ))}
          </article>

          <div style={{ marginTop: '36px' }}>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem', marginBottom: '18px' }}>More Articles</h2>
            <div className="row g-3">
              {relatedPosts.map(article => (
                <div className="col-md-4" key={article.id}>
                  <Link
                    to={`/blog/${article.id}`}
                    style={{
                      display: 'block',
                      height: '100%',
                      padding: '18px',
                      borderRadius: '14px',
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: '#161628',
                      color: '#e2e8f0',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ color: '#7c3aed', fontSize: '0.76rem', fontWeight: 900 }}>{article.category}</span>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', lineHeight: 1.45, marginTop: '8px' }}>
                      {article.title}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BlogDetail
