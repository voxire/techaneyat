import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'تكنيات | شريك البنية التحتية الذكية — لبنان',
  description:
    'تكنيات تصمم وتبني وتدير العمود الفقري التقني الكامل لمؤسستك تحت اتفاقية خدمة واحدة. بيروت، لبنان.',
  alternates: {
    canonical: 'https://techaneyat.com/ar',
    languages: { en: 'https://techaneyat.com/' },
  },
}

export default function ArabicHomePage() {
  return (
    <>
      <Nav locale="ar" />
      <main>
        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--tn-bg)',
            backgroundImage: 'var(--tn-gradient-hero)',
          }}
        >
          <div className="section-container" style={{ textAlign: 'center' }}>
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>
              شريك البنية التحتية الذكية
            </p>
            <h1 style={{ marginBottom: '24px' }}>
              بنيتك التحتية.<br />
              متاحة دائماً.<br />
              آمنة دائماً.
            </h1>
            <p
              style={{
                color: 'var(--tn-text-2)',
                fontSize: '18px',
                maxWidth: '560px',
                margin: '0 auto 40px',
                lineHeight: 1.8,
              }}
            >
              اتفاقية خدمة واحدة. شريك واحد. الشبكة، الأمن السيبراني، السحابة، الطاقة، والأجهزة — كل شيء تحت إدارة واحدة.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/ar/contact" className="btn-primary">تحدث مع مهندس</a>
              <a href="/ar/case-studies" className="btn-ghost">اطلع على أعمالنا</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  )
}
