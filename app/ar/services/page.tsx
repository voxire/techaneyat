import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'الخدمات | تكنيات لبنان',
  description:
    'الشبكات، الأمن السيبراني، الأمن الذكي، السحابة، الطاقة، والأجهزة: كل شيء تحت اتفاقية خدمة واحدة. تكنيات، بيروت لبنان.',
  alternates: {
    canonical: 'https://techaneyat.com/ar/services',
    languages: { en: 'https://techaneyat.com/services' },
  },
}

const serviceCards = [
  {
    slug: 'network',
    name: 'الشبكات والبنية التحتية',
    tagline: 'العمود الفقري الذي يعمل عليه كل شيء.',
    description: 'كابلات منظمة، مفاتيح مُدارة، WiFi للمؤسسات، وفشل تلقائي بين مزودَي الإنترنت. نصمم ونبني شبكات تصمد مع توثيق كامل يُسلَّم عند الإنجاز.',
    keyPoints: ['كابلات Cat6A والألياف الضوئية', 'WiFi للمؤسسات مع تجوال سلس', 'فشل تلقائي بين مزودَي الإنترنت', 'مراقبة على مدار الساعة'],
    metric: { value: '99.9%', label: 'وقت التشغيل' },
  },
  {
    slug: 'cybersecurity',
    name: 'الأمن السيبراني',
    tagline: 'الحماية قبل الاختراق، لا بعده.',
    description: 'جدار حماية من الجيل التالي، EDR على كل نقطة طرفية، مراقبة التهديدات، وتدريب الموظفين. طبقات حماية مُعيَّنة لتهديدات المؤسسات اللبنانية.',
    keyPoints: ['جدار حماية Fortinet / Cisco', 'اكتشاف التهديدات والاستجابة لها', 'مراقبة مستمرة للتهديدات', 'محاكاة التصيد الاحتيالي'],
    metric: { value: '< ساعة', label: 'اكتشاف التهديدات' },
  },
  {
    slug: 'smart-security',
    name: 'أنظمة الأمن الذكي',
    tagline: 'اعرف من يدخل. متى. ولماذا.',
    description: 'كاميرات IP عالية الدقة، التحكم في الوصول مع سجل كامل، إنذارات الاقتحام، وتحليلات الفيديو: كل شيء متكامل في منصة واحدة تديرها من هاتفك.',
    keyPoints: ['كاميرات IP بدقة 4K', 'التحكم في الوصول مع سجل تدقيق', 'نظام إدارة الفيديو', 'تطبيق مراقبة عن بعد'],
    metric: { value: '100%', label: 'تغطية المحيط' },
  },
  {
    slug: 'cloud',
    name: 'الخدمات السحابية والمُدارة',
    tagline: 'بنية تحتية لا تتوقف عن العمل.',
    description: 'Microsoft 365، Google Workspace، نسخ احتياطي سحابي، ومراقبة عن بعد تحت اتفاقية خدمة. ندير بيئتك بشكل استباقي حتى لا يضطر فريقك للتفكير في التقنية.',
    keyPoints: ['Microsoft 365 / Google Workspace', 'نسخ احتياطي سحابي 3-2-1', 'مراقبة وتصحيح عن بعد', 'دعم تقني مع اتفاقية خدمة'],
    metric: { value: '< 4 ساعات', label: 'زمن الاستجابة' },
  },
  {
    slug: 'power',
    name: 'الطاقة واستمرارية الأعمال',
    tagline: 'لا انقطاع في الكهرباء يوقف عملك.',
    description: 'أنظمة UPS محسوبة وفق الحمل الفعلي، توسعة البطاريات، ربط المولد التلقائي، والطاقة الشمسية. مبنية للبنان: حيث الكهرباء الموثوقة استثناء لا قاعدة.',
    keyPoints: ['UPS محسوب وفق الحمل', 'ربط تلقائي بالمولد ATS', 'طاقة شمسية وبطاريات', 'لوحة مراقبة الطاقة'],
    metric: { value: '0 ثانية', label: 'توقف عند التحويل' },
  },
  {
    slug: 'hardware',
    name: 'الأجهزة والحوسبة',
    tagline: 'الأجهزة المناسبة، منشورة بشكل صحيح.',
    description: 'لابتوبات، خوادم، NAS، ومحطات عمل مصدرة من موزعين معتمدين، ومهيأة وفق صورة موحدة، ومنشورة من قبلنا. لا استيراد رمادي. لا ضمانات وهمية.',
    keyPoints: ['مصادر من موزعين معتمدين', 'صورة نظام موحدة وإعدادات', 'خوادم وتخزين NAS', 'إدارة الضمان'],
    metric: { value: '< 48 ساعة', label: 'وقت التوزيع' },
  },
]

export default function ArabicServicesPage() {
  return (
    <>
      <Nav locale="ar" />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{ background: 'var(--tn-bg)', backgroundImage: 'var(--tn-gradient-hero)', padding: '100px 0 80px' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>ما نقدمه</p>
            <h1 style={{ marginBottom: '20px', maxWidth: '640px' }}>
              كل مشكلة تقنية. شريك واحد.
            </h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.9 }}>
              من الكابل في الجدار إلى السحابة فوقه: نصمم ونبني وندير العمود الفقري التقني الكامل لمؤسستك. الشبكة، الأمن السيبراني، الأمن الفيزيائي، السحابة، الطاقة، والأجهزة: كل شيء تحت اتفاقية خدمة واحدة.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ background: 'var(--tn-bg-2)', borderTop: '1px solid var(--tn-border)', borderBottom: '1px solid var(--tn-border)', padding: '48px 0' }}>
          <div className="section-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
              {[
                { value: '1', label: 'اتفاقية خدمة لكل شيء', detail: 'عقد واحد، نقطة مساءلة واحدة، بغض النظر عن أي نظام يحتاج اهتماماً.' },
                { value: '4 ساعات', label: 'زمن الاستجابة', detail: 'التزامنا المعتمد عبر جميع العملاء المُدارين. ليس هدفاً. بل اتفاقية.' },
                { value: '+10', label: 'سنوات في لبنان', detail: 'نعمل منذ 2015. نفهم البيئة المحلية بعمق.' },
                { value: '+500', label: 'مشروع منجز', detail: 'مؤسسات، حكومة، رعاية صحية، تعليم، ومنظمات غير حكومية في لبنان.' },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ fontFamily: 'var(--tn-font-display)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: 'var(--tn-accent)', lineHeight: 1, marginBottom: '8px', direction: 'ltr', textAlign: 'right' }}>
                    {item.value}
                  </p>
                  <p style={{ color: 'var(--tn-text)', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>{item.label}</p>
                  <p style={{ color: 'var(--tn-text-3)', fontSize: '13px', lineHeight: 1.5 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>ست خدمات</p>
            <h2 style={{ marginBottom: '48px' }}>تغطية كاملة للبنية التحتية.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {serviceCards.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/ar/services/${svc.slug}`}
                  className="glow-card"
                  style={{ padding: '32px', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'var(--tn-font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--tn-accent)', direction: 'ltr' }}>{svc.metric.value}</span>
                    <span style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '11px', color: 'var(--tn-text-3)' }}>{svc.metric.label}</span>
                  </div>
                  <h3 style={{ color: 'var(--tn-text)', marginBottom: '8px' }}>{svc.name}</h3>
                  <p style={{ color: 'var(--tn-accent)', fontSize: '13px', fontFamily: 'var(--tn-font-arabic)', marginBottom: '16px' }}>{svc.tagline}</p>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.75, marginBottom: '24px', flex: 1 }}>{svc.description}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                    {svc.keyPoints.map((pt) => (
                      <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--tn-text-2)', flexDirection: 'row-reverse' }}>
                        <span style={{ color: 'var(--tn-accent)', fontSize: '10px' }}>◂</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <span style={{ color: 'var(--tn-accent)', fontSize: '13px', fontFamily: 'var(--tn-font-mono)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ← تفاصيل الخدمة
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0', textAlign: 'center', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>شريك واحد لكل شيء</p>
            <h2 style={{ marginBottom: '16px' }}>لا تعرف من أين تبدأ؟</h2>
            <p style={{ color: 'var(--tn-text-2)', maxWidth: '480px', margin: '0 auto 36px', fontSize: '16px', lineHeight: 1.9 }}>
              أخبرنا بما تشغله وما لا يعمل. سنجري التقييم ونعود بخطة مرتبة حسب الأولوية. دون أي التزام.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/ar/contact" className="btn-primary">تحدث مع مهندس</Link>
              <Link href="/ar/about" className="btn-ghost">عن تكنيات</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer locale="ar" />
    </>
  )
}
