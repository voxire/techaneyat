import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { caseStudies } from '@/data/caseStudies'

export const metadata: Metadata = {
  title: 'دراسات الحالة | تكنيات لبنان',
  description:
    'نتائج حقيقية لعملاء حقيقيين. مستشفيات، جامعات، منظمات غير حكومية، ومؤسسات في لبنان.',
  alternates: {
    canonical: 'https://techaneyat.com/ar/case-studies',
    languages: { en: 'https://techaneyat.com/case-studies' },
  },
}

const sectorLabelsAr: Record<string, string> = {
  enterprise: 'مؤسسات',
  education: 'تعليم',
  healthcare: 'رعاية صحية',
  government: 'حكومة',
  ngo: 'منظمات غير حكومية',
  retail: 'تجزئة',
}

export default function ArabicCaseStudiesPage() {
  return (
    <>
      <Nav locale="ar" />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section
          style={{
            background: 'var(--tn-bg)',
            backgroundImage: 'var(--tn-gradient-hero)',
            padding: '100px 0 80px',
          }}
        >
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>نتائج العملاء</p>
            <h1 style={{ marginBottom: '20px', maxWidth: '640px' }}>
              نتائج حقيقية. عملاء حقيقيون.
            </h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '520px', lineHeight: 1.9 }}>
              نقيس النجاح بوقت التشغيل، سرعة الاستعادة، والمشاكل التي لا تحدث أصلاً.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ background: 'var(--tn-bg-2)', borderTop: '1px solid var(--tn-border)', borderBottom: '1px solid var(--tn-border)', padding: '48px 0' }}>
          <div className="section-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px' }}>
              {[
                { value: '+500', label: 'مشروع منجز', detail: 'في قطاعات متعددة منذ 2015.' },
                { value: '99.9%', label: 'وقت تشغيل الشبكة', detail: 'الأداء المرصود عبر العملاء المُدارين.' },
                { value: '< 4 ساعات', label: 'زمن الاستجابة', detail: 'اتفاقية معتمدة، لا هدفاً.' },
                { value: '+10', label: 'سنوات في لبنان', detail: 'نفهم الواقع المحلي بعمق.' },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{
                    fontFamily: 'var(--tn-font-display)',
                    fontSize: 'clamp(24px, 3vw, 38px)',
                    fontWeight: 700,
                    color: 'var(--tn-accent)',
                    lineHeight: 1,
                    marginBottom: '8px',
                    direction: 'ltr',
                    textAlign: 'right',
                  }}>
                    {item.value}
                  </p>
                  <p style={{ color: 'var(--tn-text)', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{item.label}</p>
                  <p style={{ color: 'var(--tn-text-3)', fontSize: '13px', lineHeight: 1.5 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies grid */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>جميع المشاريع</p>
            <h2 style={{ marginBottom: '48px' }}>من المستشفيات إلى المؤسسات.</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {caseStudies.map((cs) => (
                <Link
                  key={cs.id}
                  href={`/ar/case-studies/${cs.slug}`}
                  className="glow-card"
                  style={{ padding: '32px', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-arabic)',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: 'var(--tn-accent)',
                      marginBottom: '8px',
                    }}
                  >
                    {sectorLabelsAr[cs.sector]} · {cs.clientType}
                  </p>
                  <h3 style={{ color: 'var(--tn-text)', marginBottom: '12px' }}>
                    {cs.challengeHeadline}
                  </h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '15px', marginBottom: '20px', flex: 1 }}>
                    {cs.resultDetail}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'var(--tn-accent)',
                      direction: 'ltr',
                      textAlign: 'right',
                    }}
                  >
                    {cs.resultMetric}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0', textAlign: 'center', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>مشروعك القادم</p>
            <h2 style={{ marginBottom: '16px' }}>هل أنت الجهة التالية؟</h2>
            <p style={{ color: 'var(--tn-text-2)', maxWidth: '480px', margin: '0 auto 36px', fontSize: '16px', lineHeight: 1.9 }}>
              أخبرنا بوضعك الحالي. سنجري التقييم ونعود بخطة واضحة، دون أي التزامات.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/ar/contact" className="btn-primary">تحدث مع مهندس</Link>
              <Link href="/ar/services" className="btn-ghost">استعرض خدماتنا</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer locale="ar" />
    </>
  )
}
