import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'

export const metadata: Metadata = {
  title: 'تكنيات | شريك البنية التحتية الذكية، لبنان',
  description:
    'تكنيات تصمم وتبني وتدير العمود الفقري التقني الكامل لمؤسستك تحت اتفاقية خدمة واحدة. الشبكة، الأمن السيبراني، السحابة، الطاقة، والأجهزة. بيروت، لبنان.',
  alternates: {
    canonical: 'https://techaneyat.com/ar',
    languages: { en: 'https://techaneyat.com/' },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': 'https://techaneyat.com/#organization',
  name: 'Techaneyat',
  alternateName: 'تكنيات',
  url: 'https://techaneyat.com/ar',
  foundingDate: '2015',
  description: 'تكنيات تصمم وتبني وتدير العمود الفقري التقني الكامل لمؤسستك تحت اتفاقية خدمة واحدة.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Beirut',
    addressCountry: 'LB',
  },
  inLanguage: 'ar',
}

const services = [
  {
    slug: 'network',
    name: 'الشبكات والبنية التحتية',
    tagline: 'العمود الفقري الذي يعمل عليه كل شيء.',
    description: 'كابلات منظمة، مفاتيح، موجهات، WiFi، وألياف ضوئية. نبني شبكات لا تتباطأ ولا تتعطل.',
    metric: { value: '99.9%', label: 'وقت التشغيل' },
  },
  {
    slug: 'cybersecurity',
    name: 'الأمن السيبراني',
    tagline: 'الحماية قبل الاختراق، لا بعده.',
    description: 'جدران الحماية، حماية النقاط الطرفية، EDR، ومراقبة التهديدات. نحمي بياناتك قبل حدوث المشكلة.',
    metric: { value: '< ساعة', label: 'اكتشاف التهديدات' },
  },
  {
    slug: 'smart-security',
    name: 'أنظمة الأمن الذكي',
    tagline: 'رؤية كاملة للمحيط.',
    description: 'كاميرات مراقبة، التحكم في الوصول، إنذارات، والتعرف على الوجه. اعرف من يدخل مبانيك.',
    metric: { value: '100%', label: 'تغطية المحيط' },
  },
  {
    slug: 'cloud',
    name: 'الخدمات السحابية والمُدارة',
    tagline: 'بنية تحتية مُدارة لا تنام.',
    description: 'Microsoft 365، Google Workspace، النسخ الاحتياطي السحابي، والمراقبة عن بعد تحت اتفاقية خدمة.',
    metric: { value: '< 4 ساعات', label: 'زمن الاستجابة' },
  },
  {
    slug: 'power',
    name: 'الطاقة واستمرارية الأعمال',
    tagline: 'لا انقطاع في الكهرباء يوقف عملك.',
    description: 'أنظمة UPS، بطاريات الطاقة الاحتياطية، والطاقة الشمسية. في لبنان، الكهرباء غير مضمونة. لكن استمرارية أعمالك يجب أن تكون.',
    metric: { value: '0 ثانية', label: 'توقف عند التحويل' },
  },
  {
    slug: 'hardware',
    name: 'الأجهزة والحوسبة',
    tagline: 'الأجهزة المناسبة، منشورة بشكل صحيح.',
    description: 'لابتوبات، خوادم، NAS، ومحطات عمل. مصدرة ومهيأة ومنشورة من قبلنا.',
    metric: { value: '< 48 ساعة', label: 'وقت التوزيع' },
  },
]

const stats = [
  { value: '+10', label: 'سنوات في لبنان', sub: 'منذ 2015' },
  { value: '+500', label: 'مشروع منجز', sub: 'في جميع القطاعات' },
  { value: '99.9%', label: 'وقت تشغيل الشبكة', sub: 'العملاء المُدارون' },
  { value: '24/7', label: 'تغطية الدعم', sub: 'دائماً في متناول اليد' },
]

const whyPoints = [
  {
    number: '01',
    heading: 'اتفاقية خدمة واحدة. لا سبعة.',
    body: 'معظم المؤسسات في لبنان تدير عقوداً منفصلة للشبكة والأمن والسحابة والأجهزة. عندما يعطل شيء، يتبادل الجميع الاتهامات. نحن نمتلك المنظومة الكاملة تحت عقد واحد.',
  },
  {
    number: '02',
    heading: 'مبنيون لواقع لبنان.',
    body: 'انقطاع الكهرباء وعدم استقرار الإنترنت والموردون المتعددون حقائق لا استثناءات. نصمم لهذا الواقع من البداية: فشل تلقائي بين مزودَي الإنترنت، بنية طاقة متكاملة، وأنظمة لا تتوقف.',
  },
  {
    number: '03',
    heading: 'مهندسون على الهاتف لا مديرو حسابات.',
    body: 'عندما تتصل، ترد عليك المهندس الذي بنى نظامك مباشرة. لا وسيط، لا قائمة انتظار تصل إلى شخص آخر.',
  },
  {
    number: '04',
    heading: 'نصمم قبل أن نبيع.',
    body: 'كل مشروع يبدأ بمعاينة ميدانية وتصميم موثق. تعتمد التصميم والميزانية قبل أن نشتري أي معدة. لا مفاجآت يوم التركيب.',
  },
  {
    number: '05',
    heading: 'التوثيق ملكك أنت.',
    body: 'جداول الكابلات، مخططات الرف، خطط IP، وخرائط VLAN — كل شيء موثق ومسلّم لك عند إغلاق المشروع.',
  },
  {
    number: '06',
    heading: 'مراقبة استباقية لا رد فعل.',
    body: 'نعلم بمعظم المشكلات قبل أن يعلم فريقك. صحة الأقراص، نضوب البطاريات، أخطاء الواجهات، النسخ الاحتياطية الفاشلة — مراقبتنا تكتشفها قبل أن تتحول إلى أعطال.',
  },
]

export default function ArabicHomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <Nav locale="ar" />
      <main>

        {/* Hero */}
        <section
          style={{
            minHeight: '92vh',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--tn-bg)',
            backgroundImage: 'var(--tn-gradient-hero)',
            padding: '120px 0 80px',
          }}
        >
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>
              شريك البنية التحتية الذكية
            </p>
            <h1 style={{ marginBottom: '28px', maxWidth: '700px', lineHeight: 1.2 }}>
              بنيتك التحتية.<br />
              متاحة دائماً.<br />
              آمنة دائماً.
            </h1>
            <p
              style={{
                color: 'var(--tn-text-2)',
                fontSize: '18px',
                maxWidth: '560px',
                lineHeight: 1.9,
                marginBottom: '40px',
              }}
            >
              اتفاقية خدمة واحدة. شريك واحد. الشبكة، الأمن السيبراني، الأمن الفيزيائي، السحابة، الطاقة، والأجهزة. كل شيء تحت إدارة واحدة حتى لا يضطر فريقك للتفكير في التقنية.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/ar/contact" className="btn-primary">تحدث مع مهندس</Link>
              <Link href="/ar/services" className="btn-ghost">اكتشف خدماتنا</Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section
          style={{
            background: 'var(--tn-bg-2)',
            borderTop: '1px solid var(--tn-border)',
            borderBottom: '1px solid var(--tn-border)',
            padding: '56px 0',
          }}
        >
          <div className="section-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '32px',
              }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: 'clamp(32px, 4vw, 52px)',
                      fontWeight: 700,
                      color: 'var(--tn-accent)',
                      lineHeight: 1,
                      marginBottom: '8px',
                      direction: 'ltr',
                      textAlign: 'right',
                    }}
                  >
                    {s.value}
                  </p>
                  <p style={{ color: 'var(--tn-text)', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
                    {s.label}
                  </p>
                  <p style={{ color: 'var(--tn-text-3)', fontSize: '12px', fontFamily: 'var(--tn-font-mono)' }}>
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>ما نقدمه</p>
            <h2 style={{ marginBottom: '12px' }}>كل مشكلة تقنية. شريك واحد.</h2>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', maxWidth: '560px', marginBottom: '48px', lineHeight: 1.8 }}>
              من الكابل في الجدار إلى السحابة فوقه: نصمم ونبني وندير العمود الفقري التقني الكامل لمؤسستك.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
                marginBottom: '40px',
              }}
            >
              {services.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/ar/services/${svc.slug}`}
                  className="glow-card"
                  style={{ padding: '28px 28px 32px', textDecoration: 'none', display: 'block' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'var(--tn-font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--tn-accent)', direction: 'ltr' }}>
                      {svc.metric.value}
                    </span>
                    <span style={{ fontFamily: 'var(--tn-font-mono)', fontSize: '10px', color: 'var(--tn-text-3)' }}>
                      {svc.metric.label}
                    </span>
                  </div>
                  <h3 style={{ color: 'var(--tn-text)', marginBottom: '8px', fontSize: '18px' }}>{svc.name}</h3>
                  <p style={{ color: 'var(--tn-accent)', fontSize: '13px', fontFamily: 'var(--tn-font-arabic)', marginBottom: '12px' }}>
                    {svc.tagline}
                  </p>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.75, marginBottom: '20px' }}>
                    {svc.description}
                  </p>
                  <span style={{ color: 'var(--tn-accent)', fontSize: '13px', fontFamily: 'var(--tn-font-mono)' }}>
                    ← تفاصيل الخدمة
                  </span>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="/ar/services" className="btn-ghost">عرض جميع الخدمات</Link>
            </div>
          </div>
        </section>

        {/* Why Techaneyat */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '20px' }}>لماذا تكنيات</p>
            <h2 style={{ marginBottom: '16px', maxWidth: '600px' }}>
              هناك شركات تقنية أخرى في لبنان. إليك سبب اختيار عملاؤنا لنا.
            </h2>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', maxWidth: '520px', marginBottom: '48px', lineHeight: 1.8 }}>
              عشر سنوات. أكثر من 500 مشروع. مؤسسات، حكومة، رعاية صحية، تعليم، ومنظمات غير حكومية في لبنان. الفرق ليس في قائمة المنتجات — بل في طريقة العمل.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '48px',
              }}
            >
              {whyPoints.map((p) => (
                <div key={p.number} className="glow-card" style={{ padding: '32px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '11px',
                      color: 'var(--tn-accent)',
                      marginBottom: '16px',
                      opacity: 0.7,
                      direction: 'ltr',
                      textAlign: 'right',
                    }}
                  >
                    {p.number}
                  </p>
                  <h3 style={{ marginBottom: '14px', fontSize: '18px' }}>{p.heading}</h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.8 }}>{p.body}</p>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
                padding: '32px',
                background: 'var(--tn-bg-3)',
                border: '1px solid var(--tn-border-accent)',
                borderRadius: '12px',
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '18px', fontWeight: 600, color: 'var(--tn-text)', marginBottom: '6px' }}>
                  هل أنت مستعد لتوحيد بنيتك التحتية؟
                </p>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '14px' }}>
                  نرد خلال 4 ساعات. محادثة تقنية مباشرة — لا عروض تسويقية.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
                <Link href="/ar/contact" className="btn-primary">تحدث مع مهندس</Link>
                <Link href="/ar/about" className="btn-ghost">عن تكنيات</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section
          style={{
            background: 'var(--tn-bg)',
            padding: '80px 0',
            textAlign: 'center',
            borderTop: '1px solid var(--tn-border)',
          }}
        >
          <div className="section-container">
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>ابدأ الآن</p>
            <h2 style={{ marginBottom: '16px' }}>هل أنت مستعد لتأمين بنيتك التحتية؟</h2>
            <p style={{ color: 'var(--tn-text-2)', maxWidth: '460px', margin: '0 auto 36px', fontSize: '16px', lineHeight: 1.8 }}>
              نرد خلال 4 ساعات. لا عروض تسويقية: فقط محادثة مباشرة حول احتياجاتك التقنية.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/ar/contact" className="btn-primary">تحدث مع مهندس</Link>
              <a href="tel:+96176100766" className="btn-ghost" style={{ direction: 'ltr' }}>+961 76 100 766</a>
            </div>
          </div>
        </section>

      </main>
      <Footer locale="ar" />
    </>
  )
}
