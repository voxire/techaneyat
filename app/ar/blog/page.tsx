import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'المدونة | تكنيات لبنان',
  description:
    'رؤى تقنية في البنية التحتية للشبكات، الأمن السيبراني، السحابة، واستمرارية الطاقة. من فريق تكنيات.',
  alternates: {
    canonical: 'https://techaneyat.com/ar/blog',
    languages: { en: 'https://techaneyat.com/blog' },
  },
}

const upcomingTopics = [
  {
    category: 'الشبكات',
    title: 'لماذا تفشل شبكات المؤسسات في لبنان: الأسباب الجذرية والحلول',
    summary: 'تحليل تقني لأكثر أسباب انقطاع الشبكات شيوعاً في البيئة اللبنانية، مع استراتيجيات اختبار الصمود.',
  },
  {
    category: 'الأمن السيبراني',
    title: 'هجمات التصيد الاحتيالي على المؤسسات اللبنانية: الأنماط والوقاية',
    summary: 'دراسة لأنماط هجمات التصيد الموجهة لقطاعات الرعاية الصحية والمنظمات غير الحكومية في لبنان.',
  },
  {
    category: 'الطاقة',
    title: 'حساب حمل UPS بشكل صحيح: دليل عملي للبيئات اللبنانية',
    summary: 'كيفية تقييم احتياجات الطاقة الحقيقية، أحجام البطاريات، وتكامل المولد لبيئة تنقطع فيها الكهرباء يومياً.',
  },
  {
    category: 'السحابة',
    title: 'Microsoft 365 مقابل Google Workspace: أيهما يناسب مؤسستك في لبنان؟',
    summary: 'مقارنة عملية بين المنصتين من منظور البنية التحتية المحلية، التكاليف بالدولار، وسهولة الإدارة.',
  },
]

export default function ArabicBlogPage() {
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
            <p className="eyebrow" style={{ marginBottom: '24px' }}>رؤى تقنية</p>
            <h1 style={{ marginBottom: '20px', maxWidth: '600px' }}>
              معرفة عملية في البنية التحتية.
            </h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '520px', lineHeight: 1.9 }}>
              محتوى تقني مركّز على الأنظمة التي تُبقي الشركات تعمل، من فريق يبنيها يومياً.
            </p>
          </div>
        </section>

        {/* Coming soon with topic previews */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>قريباً</p>
            <h2 style={{ marginBottom: '12px' }}>المقالات قيد الإعداد.</h2>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', marginBottom: '48px', maxWidth: '520px', lineHeight: 1.8 }}>
              فريقنا الهندسي يُعدّ مقالات تقنية عملية. هذه المواضيع قادمة أولاً:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {upcomingTopics.map((topic) => (
                <div
                  key={topic.title}
                  style={{
                    background: 'var(--tn-bg-3)',
                    border: '1px solid var(--tn-border)',
                    borderRadius: '12px',
                    padding: '28px',
                    opacity: 0.7,
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--tn-font-arabic)',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'var(--tn-accent)',
                    marginBottom: '12px',
                  }}>
                    {topic.category}
                  </p>
                  <h3 style={{ fontSize: '16px', marginBottom: '12px', lineHeight: 1.5 }}>{topic.title}</h3>
                  <p style={{ color: 'var(--tn-text-3)', fontSize: '13px', lineHeight: 1.75 }}>{topic.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe CTA */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container" style={{ textAlign: 'center' }}>
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>ابقَ على اطلاع</p>
            <h2 style={{ marginBottom: '16px', maxWidth: '560px', margin: '0 auto 16px' }}>
              لا تفوّت المحتوى التقني.
            </h2>
            <p style={{ color: 'var(--tn-text-2)', maxWidth: '440px', margin: '0 auto 36px', fontSize: '16px', lineHeight: 1.9 }}>
              تواصل معنا وسنعلمك عند نشر مقالات جديدة في مجال بنيتك التحتية.
            </p>
            <a href="/ar/contact" className="btn-primary">تواصل معنا</a>
          </div>
        </section>

      </main>
      <Footer locale="ar" />
    </>
  )
}
