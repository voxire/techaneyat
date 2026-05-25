import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { ContactForm } from '@/app/contact/ContactForm'

export const metadata: Metadata = {
  title: 'تواصل مع تكنيات | شريك البنية التحتية، لبنان',
  description:
    'تواصل مع تكنيات. نرد خلال 4 ساعات. بيروت، لبنان. +961 76 100 766.',
  alternates: {
    canonical: 'https://techaneyat.com/ar/contact',
    languages: { en: 'https://techaneyat.com/contact' },
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://techaneyat.com/ar/contact#webpage',
  url: 'https://techaneyat.com/ar/contact',
  name: 'تواصل مع تكنيات',
  description: 'تواصل مع تكنيات. نرد خلال 4 ساعات.',
  publisher: { '@id': 'https://techaneyat.com/#organization' },
  inLanguage: 'ar',
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': 'https://techaneyat.com/#organization',
    name: 'تكنيات',
    telephone: '+961-76-100-766',
    email: 'Sales@techaneyat.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'بيروت',
      addressCountry: 'LB',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  },
}

const contactDetails = [
  { label: 'البريد الإلكتروني', value: 'Sales@techaneyat.com', href: 'mailto:Sales@techaneyat.com' },
  { label: 'الهاتف', value: '+961 76 100 766', href: 'tel:+96176100766' },
  { label: 'الموقع', value: 'بيروت، لبنان', href: undefined },
  { label: 'وقت الرد', value: 'خلال 4 ساعات', href: undefined },
]

export default function ArabicContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <Nav locale="ar" />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero + contact grid */}
        <section
          style={{
            background: 'var(--tn-bg)',
            backgroundImage: 'var(--tn-gradient-hero)',
            padding: '80px 0',
          }}
        >
          <div className="section-container">
            <div className="contact-grid">

              {/* Right (RTL: visually right = start): heading + details */}
              <div>
                <p className="eyebrow" style={{ marginBottom: '24px' }}>تواصل معنا</p>
                <h1 style={{ marginBottom: '16px', maxWidth: '480px' }}>
                  لنتحدث عن بنيتك التحتية.
                </h1>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', marginBottom: '48px', maxWidth: '420px', lineHeight: 1.9 }}>
                  أخبرنا بما تشغله، وما يعطل، أو ما تريد بناءه. سنرد خلال 4 ساعات.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {contactDetails.map((item) => (
                    <div key={item.label}>
                      <p
                        style={{
                          fontFamily: 'var(--tn-font-arabic)',
                          fontSize: '11px',
                          fontWeight: 500,
                          letterSpacing: '0.05em',
                          color: 'var(--tn-text-3)',
                          marginBottom: '4px',
                        }}
                      >
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{
                            color: 'var(--tn-accent)',
                            fontFamily: 'var(--tn-font-mono)',
                            fontSize: '14px',
                            textDecoration: 'none',
                            direction: 'ltr',
                            display: 'inline-block',
                          }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ color: 'var(--tn-text-2)', fontFamily: 'var(--tn-font-arabic)', fontSize: '14px' }}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Left (RTL: visually left = end): form */}
              <div className="glow-card" style={{ padding: '40px' }}>
                <ContactForm />
              </div>

            </div>
          </div>
        </section>

        {/* Why reach out section */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>ماذا يحدث بعد ذلك</p>
            <h2 style={{ marginBottom: '48px', maxWidth: '560px' }}>من أول رسالة إلى عقد نشر كامل.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {[
                {
                  step: '01',
                  title: 'تقييم مجاني',
                  body: 'مهندسنا يراجع وضعك الحالي ويحدد الثغرات. لا التزامات، لا مبيعات.',
                },
                {
                  step: '02',
                  title: 'خطة مرتبة بالأولوية',
                  body: 'نقدم توصية واضحة: ما يجب معالجته أولاً، ما يمكن تأجيله، والتكلفة التقديرية.',
                },
                {
                  step: '03',
                  title: 'اقتراح واحد، SLA واحد',
                  body: 'إذا قررت المضي قدماً، تغطي اتفاقية خدمة واحدة كل ما اتفقنا عليه.',
                },
                {
                  step: '04',
                  title: 'تسليم موثق',
                  body: 'كل مشروع يُسلَّم مع توثيق كامل لما بُني وكيف يعمل.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="glow-card"
                  style={{ padding: '28px' }}
                >
                  <p style={{
                    fontFamily: 'var(--tn-font-mono)',
                    fontSize: '11px',
                    color: 'var(--tn-accent)',
                    marginBottom: '12px',
                    direction: 'ltr',
                    textAlign: 'right',
                  }}>
                    {item.step}
                  </p>
                  <h3 style={{ fontSize: '17px', marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.75 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What clients ask us about */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>أسئلة شائعة</p>
            <h2 style={{ marginBottom: '48px', maxWidth: '560px' }}>ما يسألنا عنه العملاء عادةً.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
              {[
                {
                  q: 'هل تعملون مع الشركات الصغيرة؟',
                  a: 'نعمل بصورة رئيسية مع المؤسسات، الحكومة، المستشفيات، المدارس، والمنظمات غير الحكومية. إذا كانت البنية التحتية حيوية لعملك، يمكننا المساعدة.',
                },
                {
                  q: 'كم يستغرق مشروع شبكة نموذجي؟',
                  a: 'مشاريع الشبكات تتراوح بين 3 أسابيع لطوابق مكتبية صغيرة وأكثر من شهرين لمستشفى أو مبنى حكومي. نقدم جداول زمنية دقيقة بعد التقييم.',
                },
                {
                  q: 'هل تقدمون دعماً مستمراً بعد التركيب؟',
                  a: 'نعم. معظم عملائنا يختارون اتفاقية خدمة مُدارة تغطي المراقبة، الصيانة، والدعم على مدار الساعة.',
                },
                {
                  q: 'هل تعملون خارج بيروت؟',
                  a: 'نعم. لدينا مشاريع في طرابلس، صيدا، وعدة مواقع في جبل لبنان. تواصل معنا لمعرفة إمكانية التغطية في منطقتك.',
                },
              ].map((item) => (
                <div
                  key={item.q}
                  style={{
                    background: 'var(--tn-bg-3)',
                    border: '1px solid var(--tn-border)',
                    borderRadius: '8px',
                    padding: '24px 28px',
                  }}
                >
                  <p style={{ color: 'var(--tn-text)', fontSize: '15px', fontWeight: 600, marginBottom: '10px' }}>{item.q}</p>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.8 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer locale="ar" />
    </>
  )
}
