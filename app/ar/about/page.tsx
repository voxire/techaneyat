import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'عن تكنيات | شريك البنية التحتية الذكية، لبنان',
  description:
    'تأسست تكنيات عام 2015. شريك البنية التحتية الذكية في بيروت، لبنان. شريك واحد، عقد واحد، مساءلة كاملة.',
  alternates: {
    canonical: 'https://techaneyat.com/ar/about',
    languages: { en: 'https://techaneyat.com/about' },
  },
}

const vendors = [
  { name: 'Cisco', category: 'شبكات' },
  { name: 'Fortinet', category: 'أمن سيبراني' },
  { name: 'Microsoft', category: 'سحابة' },
  { name: 'HPE', category: 'خوادم' },
  { name: 'Ubiquiti', category: 'شبكات' },
  { name: 'Hikvision', category: 'أمن فيزيائي' },
  { name: 'APC', category: 'طاقة' },
  { name: 'Dell', category: 'أجهزة' },
  { name: 'CrowdStrike', category: 'حماية نقاط الطرف' },
  { name: 'Milestone', category: 'إدارة فيديو' },
  { name: 'Synology', category: 'تخزين' },
  { name: 'Eaton', category: 'طاقة' },
]

const commitments = [
  {
    label: 'نصمم بشكل صحيح',
    heading: 'تصميم سليم قبل أن يُمسّ أي كابل.',
    body: 'كل مشروع يبدأ بمعاينة ميدانية وتوثيق الحالة الراهنة وتصميم مكتوب. تعتمد التصميم والميزانية قبل الشراء. لا مفاجآت يوم التركيب.',
  },
  {
    label: 'نبني للمدى البعيد',
    heading: 'مثبَّت ليعمل عقداً، لا حتى المقاول التالي.',
    body: 'كابلات منظمة، إدارة رفوف، تسمية، وتوثيق. كل ما نركبه مبني وفق معيار يحترمه المهندس الذي يأتي بعدنا.',
  },
  {
    label: 'نؤمّن بشكل افتراضي',
    heading: 'الأمن ليس إضافة اختيارية.',
    body: 'كل شبكة نبنيها تتضمن تقسيم VLAN وسياسة جدار حماية وضوابط وصول. الأمن جزء من التصميم، لا يُباع منفصلاً بعد الاختراق.',
  },
  {
    label: 'نتحمل المسؤولية',
    heading: 'رقم واحد للاتصال. فريق واحد يجيب.',
    body: 'لا نختفي بعد إغلاق المشروع. نراقب ونصون ونستجيب. إذا تعطّل شيء، تتصل بنا، لا بمورد آخر أو عقد آخر.',
  },
]

export default function ArabicAboutPage() {
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
            <p className="eyebrow" style={{ marginBottom: '24px' }}>عن تكنيات</p>
            <h1 style={{ maxWidth: '720px', marginBottom: '28px' }}>
              مبنيون لامتلاك مشكلتك التقنية.
            </h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.9 }}>
              تأسست عام 2015. بيروت، لبنان. مبنية حول مبدأ واحد: يجب ألا يسمع العميل &quot;هذه ليست مشكلتنا.&quot; شريك واحد. عقد واحد. مساءلة كاملة.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section
          style={{
            background: 'var(--tn-bg-2)',
            borderTop: '1px solid var(--tn-border)',
            borderBottom: '1px solid var(--tn-border)',
            padding: '48px 0',
          }}
        >
          <div className="section-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px' }}>
              {[
                { value: '+10', label: 'سنوات في لبنان', sub: 'منذ 2015' },
                { value: '+500', label: 'مشروع منجز', sub: 'في جميع القطاعات' },
                { value: '99.9%', label: 'وقت تشغيل الشبكة', sub: 'العملاء المُدارون' },
                { value: '24/7', label: 'تغطية الدعم', sub: 'دائماً في متناول اليد' },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: 'var(--tn-font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'var(--tn-accent)', lineHeight: 1, marginBottom: '8px', direction: 'ltr', textAlign: 'right' }}>
                    {s.value}
                  </p>
                  <p style={{ color: 'var(--tn-text)', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{s.label}</p>
                  <p style={{ color: 'var(--tn-text-3)', fontSize: '12px', fontFamily: 'var(--tn-font-mono)' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lebanon context */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '20px' }}>السياق</p>
                <h2 style={{ marginBottom: '28px' }}>البنية التحتية في لبنان أصعب.</h2>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.9, marginBottom: '20px' }}>
                  انقطاع الكهرباء حتى 20 ساعة يومياً في بعض المناطق. سوق إنترنت لا تعني فيه ضمانات وقت التشغيل شيئاً. نظام مقاولات نادراً ما يُولي أهمية للتوثيق والتصميم السليم.
                </p>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.9 }}>
                  نحن نعمل في هذه البيئة منذ 2015. بنينا شبكات تصمد أمام انقطاع الكهرباء، وصممنا أنظمة أمن لمرافق تعمل على ثلاثة مولدات، ونقلنا مؤسسات إلى السحابة خلال الأزمة المالية عام 2019 وأثناء الجائحة. البيئة تجعلنا مهندسين أفضل.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'الطاقة', detail: 'نهندس لواقع الطاقة اللبناني. كل نظام حيوي لديه خطة استمرارية طاقة.' },
                  { label: 'الاتصالات', detail: 'الفشل التلقائي بين مزودَي الإنترنت معيار في كل شبكة ندير. مزود واحد يعني نقطة فشل واحدة.' },
                  { label: 'تشتت الموردين', detail: 'معظم بيئات التقنية هنا مجمّعة من 10 موردين مختلفين بلا نقطة مساءلة واحدة.' },
                  { label: 'غياب التوثيق', detail: 'لم نتسلم شبكة مرة واحدة وجدنا لها توثيقاً كاملاً. نحن دائماً نتركه وراءنا.' },
                ].map((item) => (
                  <div key={item.label} style={{ padding: '20px 24px', background: 'var(--tn-bg-3)', border: '1px solid var(--tn-border)', borderRadius: '8px', borderRight: '3px solid var(--tn-accent)' }}>
                    <p style={{ fontFamily: 'var(--tn-font-mono)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tn-accent)', marginBottom: '8px', direction: 'ltr', textAlign: 'right' }}>
                      {item.label}
                    </p>
                    <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.75 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* One-SLA */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '20px' }}>فلسفة اتفاقية الخدمة الواحدة</p>
                <h2 style={{ marginBottom: '28px' }}>عقد واحد. كل نظام.</h2>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.9, marginBottom: '20px' }}>
                  معظم بيئات التقنية في لبنان مجمّعة من موردين مختلفين. الشبكة شركة. الأمن السيبراني شركة أخرى. الكاميرات ثالثة. السحابة أينما انتهت بها الأمور.
                </p>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.9, marginBottom: '20px' }}>
                  عندما يعطل شيء، يتبادل الجميع الاتهامات. مورد الشبكة يقول إنها مشكلة الجدار الناري. مورد الجدار الناري يقول تحقق من مزود الإنترنت. مزود الإنترنت يقول إن الراوتر ليس جهازهم. فريقك ينتظر. عملك يتوقف.
                </p>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.9 }}>
                  تكنيات تلغي ذلك. نصمم ونبني وندير عمودك الفقري التقني الكامل تحت اتفاقية خدمة واحدة. رقم واحد للاتصال. فريق واحد مسؤول عن كل شيء.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'var(--tn-bg-3)', border: '1px solid var(--tn-border-accent)', borderRadius: '12px', padding: '32px' }}>
                  <p style={{ fontFamily: 'var(--tn-font-mono)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tn-text-3)', marginBottom: '20px' }}>
                    بدون تكنيات
                  </p>
                  {['مورد الشبكة', 'مورد الجدار الناري', 'مورد الكاميرات', 'شريك Microsoft', 'مورد الطاقة', 'مورد الأجهزة', 'مورد الدعم التقني'].map((v) => (
                    <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid var(--tn-border)', flexDirection: 'row-reverse' }}>
                      <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#EF4444', flexShrink: 0 }}>✕</span>
                      <span style={{ color: 'var(--tn-text-2)', fontSize: '14px' }}>{v}</span>
                    </div>
                  ))}
                  <p style={{ marginTop: '20px', fontFamily: 'var(--tn-font-arabic)', fontSize: '12px', color: '#EF4444' }}>
                    7 موردين. 7 عقود. 7 محادثات عند العطل.
                  </p>
                </div>
                <div style={{ background: 'var(--tn-bg-3)', border: '1px solid var(--tn-border-accent)', borderRadius: '12px', padding: '32px' }}>
                  <p style={{ fontFamily: 'var(--tn-font-mono)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tn-text-3)', marginBottom: '20px' }}>
                    مع تكنيات
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', flexDirection: 'row-reverse' }}>
                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--tn-accent-dim)', border: '1px solid var(--tn-border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'var(--tn-accent)', flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'var(--tn-text)', fontSize: '14px', fontWeight: 500 }}>تكنيات — عقد واحد، جميع الخدمات</span>
                  </div>
                  <p style={{ marginTop: '20px', fontFamily: 'var(--tn-font-arabic)', fontSize: '12px', color: 'var(--tn-accent)' }}>
                    مورد واحد. عقد واحد. مكالمة واحدة عند الحاجة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>طريقة عملنا</p>
            <h2 style={{ marginBottom: '48px' }}>أربعة التزامات في كل مشروع.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {commitments.map((c) => (
                <div key={c.label} className="glow-card" style={{ padding: '32px' }}>
                  <p style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--tn-accent)', marginBottom: '16px' }}>
                    {c.label}
                  </p>
                  <h3 style={{ marginBottom: '16px', fontSize: '17px' }}>{c.heading}</h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.8 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section style={{ background: 'var(--tn-bg-2)', borderTop: '1px solid var(--tn-border)', padding: '64px 0' }}>
          <div className="section-container">
            <p style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '13px', fontWeight: 500, color: 'var(--tn-text-3)', marginBottom: '32px' }}>
              شركاء التقنية والمنصات
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {vendors.map((v) => (
                <div key={v.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px 18px', background: 'var(--tn-bg-3)', border: '1px solid var(--tn-border)', borderRadius: '6px' }}>
                  <span style={{ fontFamily: 'var(--tn-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--tn-text)', direction: 'ltr' }}>{v.name}</span>
                  <span style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '11px', color: 'var(--tn-text-3)' }}>{v.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>فريقنا</p>
            <h2 style={{ marginBottom: '16px' }}>مهندسون لا مديرو حسابات.</h2>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', maxWidth: '560px', marginBottom: '48px', lineHeight: 1.9 }}>
              كل مشروع يقوده مهندس يفهم المنظومة كاملة — من الكابلات المنظمة إلى إعداد السحابة. أنت تتحدث مع من بنى نظامك، لا مع وسيط.
            </p>
            <p style={{ color: 'var(--tn-text-3)', fontFamily: 'var(--tn-font-mono)', fontSize: '12px' }}>
              ملفات الفريق قريباً.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0', textAlign: 'center', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>اعمل معنا</p>
            <h2 style={{ marginBottom: '16px' }}>هل أنت مستعد لتوحيد بنيتك التحتية؟</h2>
            <p style={{ color: 'var(--tn-text-2)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px', fontSize: '16px', lineHeight: 1.8 }}>
              أخبرنا بما تشغله وما يحتاج تغييراً. سنرد خلال 4 ساعات.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/ar/contact" className="btn-primary">تحدث مع مهندس</Link>
              <Link href="/ar/services" className="btn-ghost">اكتشف خدماتنا</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer locale="ar" />
    </>
  )
}
