import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { blogPosts } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Blog | Techaneyat',
  description:
    'Technical insights on network infrastructure, cybersecurity, cloud, and power continuity from the Techaneyat team in Beirut, Lebanon.',
  alternates: {
    canonical: 'https://techaneyat.com/blog',
    languages: { ar: 'https://techaneyat.com/ar/blog' },
  },
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function BlogPage() {
  return (
    <>
      <Nav locale="en" />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{
          background: 'var(--tn-bg)',
          backgroundImage: 'var(--tn-gradient-hero)',
          padding: 'clamp(80px, 12vw, 120px) 0 clamp(48px, 8vw, 80px)',
          borderBottom: '1px solid var(--tn-border)',
        }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '20px' }}>Technical Insights</p>
            <h1 style={{ marginBottom: '16px', maxWidth: '640px' }}>Infrastructure intelligence.</h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '480px', lineHeight: 1.7 }}>
              Practical knowledge on the systems that keep businesses running in Lebanon and the region.
            </p>
          </div>
        </section>

        {/* Post grid */}
        <section style={{ background: 'var(--tn-bg)', padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <style>{`
            .blog-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
            .blog-card {
              background: var(--tn-bg-3);
              border: 1px solid var(--tn-border);
              border-radius: 12px;
              padding: 36px 32px;
              display: flex;
              flex-direction: column;
              text-decoration: none;
              transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
              position: relative;
              overflow: hidden;
            }
            .blog-card::before {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: inherit;
              background: var(--tn-gradient-card);
              opacity: 0;
              transition: opacity 0.3s;
              pointer-events: none;
            }
            .blog-card:hover {
              border-color: var(--tn-border-accent);
              box-shadow: 0 0 32px var(--tn-accent-glow), 0 24px 48px rgba(0,0,0,0.4);
              transform: translateY(-3px);
            }
            .blog-card:hover::before { opacity: 1; }
            .blog-card--featured {
              grid-column: 1 / -1;
            }
            .blog-cat {
              font-family: var(--tn-font-mono);
              font-size: 10px;
              font-weight: 500;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              color: var(--tn-accent);
              margin-bottom: 14px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .blog-cat::before {
              content: '';
              display: block;
              width: 16px;
              height: 1px;
              background: var(--tn-accent);
              flex-shrink: 0;
            }
            .blog-meta {
              font-family: var(--tn-font-mono);
              font-size: 10px;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: var(--tn-text-3);
              display: flex;
              gap: 16px;
              flex-wrap: wrap;
              margin-top: auto;
              padding-top: 20px;
              border-top: 1px solid var(--tn-border);
            }
            .blog-cta {
              font-family: var(--tn-font-display);
              font-size: 13px;
              font-weight: 500;
              color: var(--tn-accent);
              display: inline-flex;
              align-items: center;
              gap: 6px;
              border-bottom: 1px solid rgba(0,200,255,0.28);
              padding-bottom: 2px;
              margin-bottom: 24px;
            }
            @media (max-width: 767px) {
              .blog-grid { grid-template-columns: 1fr; }
              .blog-card--featured { grid-column: auto; }
            }
            @media (max-width: 479px) {
              .blog-card { padding: 24px 20px; }
            }
          `}</style>

          <div className="section-container">
            <div className="blog-grid">
              {blogPosts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`blog-card${i === 0 ? ' blog-card--featured' : ''}`}
                >
                  <p className="blog-cat">{post.category}</p>

                  <h2 style={{
                    fontFamily: 'var(--tn-font-display)',
                    fontSize: i === 0 ? 'clamp(20px, 2.4vw, 26px)' : '18px',
                    fontWeight: 700,
                    color: 'var(--tn-text)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    marginBottom: '12px',
                  }}>
                    {post.title}
                  </h2>

                  <p style={{
                    color: 'var(--tn-text-2)',
                    fontSize: '14px',
                    lineHeight: 1.75,
                    marginBottom: '20px',
                    flex: i === 0 ? 'none' : 1,
                  }}>
                    {post.excerpt}
                  </p>

                  <span className="blog-cta">Read article <span aria-hidden="true">→</span></span>

                  <div className="blog-meta">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime} read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer locale="en" />
    </>
  )
}
