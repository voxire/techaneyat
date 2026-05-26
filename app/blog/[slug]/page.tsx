import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { getBlogPostBySlug, blogPosts } from '@/data/blog'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Techaneyat Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://techaneyat.com/blog/${post.slug}`,
    },
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <Nav locale="en" />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{
          background: 'var(--tn-bg)',
          backgroundImage: 'var(--tn-gradient-hero)',
          padding: 'clamp(72px, 10vw, 112px) 0 clamp(40px, 6vw, 64px)',
          borderBottom: '1px solid var(--tn-border)',
        }}>
          <div className="section-container" style={{ maxWidth: '800px' }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link href="/blog" style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--tn-text-3)',
                textDecoration: 'none',
              }}>
                Blog
              </Link>
              <span style={{ color: 'var(--tn-text-3)', fontSize: '11px' }}>/</span>
              <span style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--tn-accent)',
              }}>
                {post.category}
              </span>
            </nav>

            <h1 style={{
              fontFamily: 'var(--tn-font-display)',
              fontSize: 'clamp(26px, 4vw, 44px)',
              fontWeight: 700,
              color: 'var(--tn-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '20px',
            }}>
              {post.title}
            </h1>

            <p style={{
              color: 'var(--tn-text-2)',
              fontSize: '18px',
              lineHeight: 1.7,
              marginBottom: '28px',
            }}>
              {post.excerpt}
            </p>

            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              fontFamily: 'var(--tn-font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--tn-text-3)',
              borderTop: '1px solid var(--tn-border)',
              paddingTop: '20px',
            }}>
              <span>{formatDate(post.date)}</span>
              <span>{post.readTime} read</span>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section style={{ background: 'var(--tn-bg)', padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <style>{`
            .article-body {
              max-width: 720px;
              color: var(--tn-text-2);
              font-size: 16px;
              line-height: 1.85;
            }
            .article-body p {
              margin-bottom: 20px;
            }
            .article-body h2 {
              font-family: var(--tn-font-display);
              font-size: clamp(20px, 2.4vw, 26px);
              font-weight: 700;
              color: var(--tn-text);
              letter-spacing: -0.02em;
              margin: 48px 0 16px;
              line-height: 1.25;
            }
            .article-body h3 {
              font-family: var(--tn-font-display);
              font-size: 18px;
              font-weight: 600;
              color: var(--tn-text);
              margin: 32px 0 12px;
            }
            .article-body ul, .article-body ol {
              padding-left: 20px;
              margin-bottom: 20px;
            }
            .article-body li {
              margin-bottom: 10px;
            }
            .article-body strong {
              color: var(--tn-text);
              font-weight: 600;
            }
            .article-body a {
              color: var(--tn-accent);
              text-decoration: none;
              border-bottom: 1px solid rgba(0,200,255,0.3);
            }
            .article-body a:hover {
              border-bottom-color: var(--tn-accent);
            }
            .article-body code {
              font-family: var(--tn-font-mono);
              font-size: 13px;
              background: var(--tn-bg-3);
              border: 1px solid var(--tn-border);
              border-radius: 4px;
              padding: 2px 6px;
              color: var(--tn-accent);
            }
          `}</style>

          <div className="section-container" style={{ maxWidth: '800px' }}>
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: 'var(--tn-bg-2)',
          borderTop: '1px solid var(--tn-border)',
          borderBottom: '1px solid var(--tn-border)',
          padding: 'clamp(48px, 6vw, 72px) 0',
        }}>
          <div className="section-container" style={{ maxWidth: '800px' }}>
            <div style={{
              background: 'var(--tn-bg-3)',
              border: '1px solid var(--tn-border-accent)',
              borderRadius: '12px',
              padding: 'clamp(28px, 4vw, 48px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '10px' }}>Talk to an engineer</p>
                <p style={{
                  fontFamily: 'var(--tn-font-display)',
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  fontWeight: 700,
                  color: 'var(--tn-text)',
                  marginBottom: 0,
                }}>
                  Ready to implement this for your organization?
                </p>
              </div>
              <Link href="/contact" className="btn-primary" style={{ flexShrink: 0 }}>
                Get a Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section style={{ background: 'var(--tn-bg)', padding: 'clamp(56px, 8vw, 80px) 0' }}>
            <style>{`
              .related-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
              }
              .related-card {
                background: var(--tn-bg-3);
                border: 1px solid var(--tn-border);
                border-radius: 10px;
                padding: 24px;
                text-decoration: none;
                display: flex;
                flex-direction: column;
                transition: border-color 0.25s, box-shadow 0.25s;
              }
              .related-card:hover {
                border-color: var(--tn-border-accent);
                box-shadow: 0 0 24px var(--tn-accent-glow);
              }
              @media (max-width: 767px) {
                .related-grid { grid-template-columns: 1fr; }
              }
            `}</style>

            <div className="section-container">
              <p className="eyebrow" style={{ marginBottom: '32px' }}>More articles</p>
              <div className="related-grid">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="related-card">
                    <span style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--tn-accent)',
                      display: 'block',
                      marginBottom: '10px',
                    }}>
                      {p.category}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--tn-text)',
                      lineHeight: 1.3,
                      marginBottom: '12px',
                      flex: 1,
                    }}>
                      {p.title}
                    </h3>
                    <span style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--tn-text-3)',
                    }}>
                      {p.readTime} read
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer locale="en" />
    </>
  )
}
