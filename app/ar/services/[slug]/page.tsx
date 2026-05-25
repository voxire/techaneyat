import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { services } from '@/data/services'

type Props = {
  params: Promise<{ slug: string }>
}

type IncludedItem = { label: string; description: string }
type Step = { title: string; body: string }
type UseCase = { sector: string; detail: string }
type Problem = { title: string; body: string }
type RelatedService = { slug: string; name: string; short: string }

type ServiceContent = {
  name: string
  eyebrow: string
  headline: string
  description: string
  context: string
  keyMetric: { value: string; label: string }
  included: IncludedItem[]
  steps: Step[]
  technologies: string[]
  useCases: UseCase[]
  problems: Problem[]
  relatedServices: RelatedService[]
}

const serviceContent: Record<string, ServiceContent> = {
  network: {
    name: 'الشبكات والبنية التحتية',
    eyebrow: 'الشبكات والبنية التحتية',
    headline: 'العمود الفقري الذي يعمل عليه كل شيء.',
    description: 'شبكة مصممة بشكل صحيح تكون غير مرئية — إنها فقط تعمل. كابلات منظمة، مفاتيح مُدارة، WiFi للمؤسسات، وفشل تلقائي بين مزودَي الإنترنت مبنية لتصمد عندما يحتاجها فريقك.',
    context: 'معظم الشبكات في لبنان وُضعت بواسطة أرخص من كان متاحاً في الوقت. لا توثيق. لا تكرار. مفتاح واحد معطل يشل طابقاً بأكمله. انقطاع من EDL يقتل الراوتر ولا أحد يعرف كلمة مرور الفشل التلقائي. ورثنا مئات هذه البيئات. نعرف بالضبط ما الذي ينكسر ولماذا — ونبني شبكتك حتى لا تعاني من نفس المشكلة.',
    keyMetric: { value: '99.9%', label: 'وقت تشغيل الشبكة عبر العملاء المُدارين' },
    included: [
      { label: 'كابلات منظمة Cat6A والألياف الضوئية', description: 'كل مسار كابل مخطط ومُسمى وموثق. Cat6A للمناطق عالية الكثافة، ألياف أحادية الوضع للروابط بين الطوابق والمباني. رسومات كاملة مُسلَّمة عند الإنجاز.' },
      { label: 'مفاتيح وموجهات مُدارة', description: 'تبديل الطبقة 2/3 مع تجزئة VLAN وQoS وإدارة مركزية. نحدد Cisco أو Ubiquiti أو MikroTik حسب حجمك وميزانيتك.' },
      { label: 'WiFi للمؤسسات مع تجوال سلس', description: 'نقاط وصول مُوضعة للتغطية لا للسهولة. كثافة العملاء محسوبة لكل طابق. تجوال سلس بين نقاط الوصول حتى لا تنقطع مكالمة VoIP عند المشي.' },
      { label: 'فشل تلقائي بين مزودَي الإنترنت وSD-WAN', description: 'اتصالان بمزودَي إنترنت نشطان في آنٍ واحد. إذا انقطع أحدهما، ينتقل الحمل تلقائياً في أقل من ثانية. لا أحد يلاحظ شيئاً.' },
      { label: 'مراقبة وتنبيه على مدار الساعة', description: 'كل جهاز على شبكتك مراقب. نعلم عند إغلاق منفذ مفتاح قبل أن يعلم فريقك. تنبيهات وسجلات وتقارير أداء شهرية.' },
      { label: 'توثيق كامل ورسومات as-built', description: 'جداول كابلات، مخططات رف، خطط عناوين IP، خرائط VLAN. كل ما نبنيه موثق. أنت تمتلك التوثيق — لا نحن.' },
    ],
    steps: [
      { title: 'معاينة ميدانية وتدقيق الحالة الراهنة', body: 'نتجول في كل طابق، ونختبر كل منفذ، ونرسم كل مسار كابل. نوثق ما هو موجود، ونحدد نقاط الفشل، ونقيس فجوات التغطية قبل أن يُلمس أي كابل.' },
      { title: 'التصميم والمواصفات والموافقة', body: 'نُنتج تصميماً كاملاً للشبكة: مسارات الكابلات، قائمة المعدات، طوبولوجيا VLAN، مخطط IP. تعتمد التصميم والميزانية قبل أي شراء. لا مفاجآت.' },
      { title: 'التركيب والاختبار والتسليم', body: 'تركيب منظم مع اختبار صارم على كل مسار. نعتمد الكابلات، ونضبط كل جهاز، وتشغيل الشبكة تحت الحمل قبل التسليم. فريقك يتلقى التدريب. التوثيق ملكك.' },
    ],
    technologies: ['Cisco', 'Ubiquiti', 'MikroTik', 'Fortinet', 'Aruba', 'Palo Alto Networks', 'Fluke Networks', 'Panduit'],
    useCases: [
      { sector: 'المكاتب المؤسسية', detail: 'مكاتب متعددة الطوابق من 50 إلى أكثر من 500 مستخدم. تجزئة VLAN بين الأقسام، WiFi للزوار معزول عن الشبكة الداخلية، غرف اجتماعات باتصال AV موثوق.' },
      { sector: 'المدارس والجامعات', detail: 'WiFi عالي الكثافة لقاعات المحاضرات والمختبرات. شبكات منفصلة للطلاب وأعضاء هيئة التدريس. سياسات نطاق ترددي لمنع الإساءة. روابط ألياف بين المباني.' },
      { sector: 'المستشفيات والعيادات', detail: 'تجزئة الشبكة بين المناطق السريرية والإدارية وشبكة الزوار. PoE للهواتف IP والأجهزة الطبية. روابط تكرارية في الأجنحة الحيوية.' },
      { sector: 'المستودعات والمصانع', detail: 'WiFi صناعي لأجهزة المسح الضوئي والأجهزة المتنقلة. تغطية في البيئات ذات التحديات الترددية مع الرفوف المعدنية والأسقف العالية.' },
    ],
    problems: [
      { title: 'WiFi ينقطع في نصف المكتب', body: 'نقاط وصول للمستهلكين وُضعت دون معاينة ميدانية. التغطية متقطعة ونقاط الوصول مثقلة. نعيد تصميم مواقع نقاط الوصول ونستبدل الأجهزة غير الكافية.' },
      { title: 'لا فشل تلقائي عند انقطاع مزود الإنترنت', body: 'اتصال واحد بمزود إنترنت دون بديل. كل انقطاع يوقف العمليات. ننفذ فشلاً تلقائياً حتى يصبح انقطاع المزود غير محسوس.' },
      { title: 'لا توثيق للشبكة من المقاول السابق', body: 'لا أحد يعرف أي VLAN على أي منفذ أو أين ينتهي مسار الكابل. نراجع ونرسم ونوثق حالتك الراهنة بالكامل قبل أن نلمس أي شيء.' },
      { title: 'اختناقات في الشبكة خلال ساعات الذروة', body: 'مفاتيح غير مُدارة، لا QoS، لا أولوية للحركة. تتدهور مكالمات الفيديو عندما يكون الجميع عبر الإنترنت. نعيد تصميم طبقة التبديل وننفذ سياسات QoS.' },
    ],
    relatedServices: [
      { slug: 'cybersecurity', name: 'الأمن السيبراني', short: 'احمِ ما يعمل على شبكتك.' },
      { slug: 'power', name: 'الطاقة واستمرارية الأعمال', short: 'أبقِ الشبكة تعمل خلال انقطاع الكهرباء.' },
    ],
  },

  cybersecurity: {
    name: 'الأمن السيبراني',
    eyebrow: 'الأمن السيبراني',
    headline: 'الحماية قبل الاختراق، لا بعده.',
    description: 'جدران حماية، اكتشاف التهديدات والاستجابة لها على كل نقطة طرفية، مراقبة مستمرة، وتدريب الموظفين. نبني وضعاً أمنياً متعدد الطبقات يوقف التهديدات قبل أن تصبح حوادث.',
    context: 'المؤسسات اللبنانية تُستهدف. المؤسسات المالية والمنظمات غير الحكومية والمستشفيات والجهات الحكومية واجهت جميعها برامج فدية وسرقة بيانات واختراق البريد الإلكتروني للأعمال في السنوات الأخيرة. النمط دائماً واحد: لا EDR، لا مراقبة، قواعد جدار الحماية الافتراضية، وموظف نقر على رابط. رأينا العواقب. ننشر الضوابط التي كانت ستمنعها.',
    keyMetric: { value: '< ساعة', label: 'متوسط زمن اكتشاف التهديدات على نقاط الطرف المُراقبة' },
    included: [
      { label: 'نشر جدار حماية من الجيل التالي', description: 'Fortinet FortiGate أو Cisco ASA مع فحص عميق للحزم وتحكم في التطبيقات وIPS مفعّل. ليس مجرد مرشح حزم — بل محيط محكوم بسياسة مع رؤية كاملة للحركة.' },
      { label: 'اكتشاف التهديدات والاستجابة لها EDR', description: 'وكيل منشور على كل محطة عمل وخادم. اكتشاف سلوكي يلتقط التهديدات التي يفوتها مكافح الفيروسات التقليدي. احتواء تلقائي عند تأكيد التهديدات.' },
      { label: 'مراقبة وتنبيه على مدار الساعة', description: 'بيئتك مراقبة باستمرار. النشاط المشبوه يولد تنبيهات مع سياق — لا مجرد ضوضاء سجلات. التنبيهات الحرجة تُصعَّد فوراً.' },
      { label: 'محاكاة التصيد الاحتيالي وتدريب الموظفين', description: 'موظفوك هم أكبر سطح هجوم لديك. نجري حملات تصيد محاكاة لقياس المخاطر، ثم نقدم تدريباً موجهاً. معظم الاختراقات تبدأ بنقرة.' },
      { label: 'تخطيط الاستجابة للحوادث', description: 'خطة IR موثقة قبل أن تحتاجها. الأدوار، هياكل الاتصال، إجراءات الاحتواء، وخطوات الاسترداد. نجري تمريناً مكتبياً مع فريقك لتحقق من الخطة.' },
      { label: 'توثيق سياسات الأمن', description: 'سياسة الاستخدام المقبول، سياسة كلمات المرور، سياسة الوصول عن بعد، وتصنيف البيانات. موثقة ومعتمدة ومنشورة. مطلوبة في معظم أطر الامتثال.' },
    ],
    steps: [
      { title: 'تقييم الأمن وتحليل الفجوات', body: 'نراجع وضعك الحالي: المنافذ المفتوحة، الأنظمة غير المُرقَّعة، بيانات الاعتماد الضعيفة، غياب MFA، تقنية الظل، وسلوك المستخدم. تحصل على سجل مخاطر مُحدد الأولوية قبل أن نوصي بأي منتج.' },
      { title: 'نشر الحماية المتعددة الطبقات', body: 'نشر جدار الحماية وEDR والمراقبة بالتسلسل مع صفر توقف. نضبط السياسة وقواعد الاكتشاف للحد من الإنذارات الكاذبة، ونتحقق من التغطية عبر كل نقطة طرفية.' },
      { title: 'مراقبة مستمرة ومراجعة ربع سنوية', body: 'مراقبة مستمرة للتهديدات مع تقارير شهرية. مراجعات أمنية ربع سنوية لتقييم المخاطر الجديدة، ومراجعة الحوادث، وتحديث السياسات.' },
    ],
    technologies: ['Fortinet FortiGate', 'Cisco ASA', 'CrowdStrike Falcon', 'Microsoft Defender', 'Cisco Umbrella', 'Palo Alto Networks', 'KnowBe4', 'Splunk'],
    useCases: [
      { sector: 'المؤسسات المالية', detail: 'البنوك وشركات الصرافة والمستشمرون المالي تحت متطلبات بنك لبنان التنظيمية. حماية البيانات وضوابط الوصول ومسارات التدقيق للامتثال.' },
      { sector: 'مقدمو الرعاية الصحية', detail: 'المستشفيات والعيادات مع التزامات بيانات المرضى. حماية نقاط الطرف على محطات العمل الطبية، وتجزئة الشبكة بين المناطق السريرية والإدارية.' },
      { sector: 'المنظمات غير الحكومية والدولية', detail: 'مؤسسات لديها بيانات المستفيدين الحساسة ومتطلبات تقارير المانحين. حماية الاتصالات وتخزين الملفات والوصول عن بعد للفرق الموزعة.' },
      { sector: 'الحكومة والقطاع العام', detail: 'الوزارات والمؤسسات العامة ببيانات المواطنين. تعزيز المحيط، إدارة هوية الوصول، وبرامج التوعية الأمنية لأعداد كبيرة من الموظفين.' },
    ],
    problems: [
      { title: 'لا رؤية لما يحدث على الشبكة', body: 'لا مراقبة، لا سجلات، لا تنبيهات. يمكن للمهاجمين الجلوس داخل بيئتك لأسابيع دون اكتشاف. ننشر مراقبة تمنحك رؤية كاملة منذ اليوم الأول.' },
      { title: 'الموظفون يتعرضون لحملات تصيد منتظمة', body: 'البريد الإلكتروني هو ناقل الهجوم الأساسي. بدون تدريب وMFA، نقرة واحدة تكلفك كثيراً. نخفض معدلات النقر بأكثر من 70% بحملات محاكاة موجهة.' },
      { title: 'أجهزة غير معروفة تتصل بالشبكة', body: 'لا تحكم في وصول الشبكة يعني أن من يتوصل يكون داخلها. ننفذ سياسات NAC تُصادق الأجهزة قبل منحها الوصول.' },
      { title: 'خطر برامج الفدية بلا خطة استرداد', body: 'نسخ احتياطية موجودة لكن لم تُختبر قط. لا خطة IR، لا إجراء استرداد مُختبر. ننفذ نسخاً احتياطية غير قابلة للتغيير وعملية استرداد مُتحقق منها قبل أن تحتاجها.' },
    ],
    relatedServices: [
      { slug: 'network', name: 'الشبكات والبنية التحتية', short: 'أمّن ما تُبنى عليه الشبكة.' },
      { slug: 'cloud', name: 'الخدمات السحابية والمُدارة', short: 'أمن مُدار لأعباء عملك السحابية.' },
    ],
  },

  'smart-security': {
    name: 'أنظمة الأمن الذكي',
    eyebrow: 'الأمن الذكي',
    headline: 'اعرف من يدخل. متى. ولماذا.',
    description: 'كاميرات IP عالية الدقة، التحكم في الوصول مع سجل كامل، كشف اقتحام، وتحليلات الفيديو — كل شيء متكامل في منصة واحدة تديرها من هاتفك.',
    context: 'الأمن الفيزيائي في لبنان يتطلب أكثر من مجرد كاميرات. يتطلب كاميرات تسجل في ضعف الإضاءة، وتحكماً في الوصول يسجل كل دخول، ونظاماً يمكن مراقبته عن بعد عند غياب الموظفين. ندمج المراقبة والتحكم في الوصول والإنذارات في منصة واحدة.',
    keyMetric: { value: '100%', label: 'تغطية المحيط في كل تركيب نصممه' },
    included: [
      { label: 'كاميرات IP عالية الدقة و4K', description: 'كاميرات Hikvision وDahua IP مختارة حسب الموقع: قبة، رصاصة، PTZ، وعين السمكة. تغطية IR مناسبة للتسجيل الليلي. لا نقاط عمياء بالتصميم.' },
      { label: 'التحكم في الوصول مع سجل تدقيق كامل', description: 'قارئات بطاقات، ماسحات بيومترية، أو بيانات اعتماد هاتفية على كل باب خاضع للتحكم. كل دخول وخروج مسجل بطابع زمني وهوية. يتكامل مع HR للإلغاء الفوري.' },
      { label: 'نظام إدارة الفيديو VMS', description: 'Milestone أو Genetec VMS يوحد جميع الكاميرات في واجهة واحدة. تنبيهات حركة، تسجيل مجدول، وبحث في الفيديو حسب الوقت والمنطقة أو الحدث. متاح من أي جهاز.' },
      { label: 'كشف الإنذار والاقتحام', description: 'مستشعرات حركة، جهات اتصال الأبواب، كاشفات كسر الزجاج، وأزرار الذعر. أحداث الإنذار مرتبطة بلقطات الكاميرا للسياق الفوري.' },
      { label: 'مراقبة عن بعد وتطبيق هاتفي', description: 'عرض اللقطات المباشرة والمسجلة، تفعيل وإلغاء الإنذارات، وإدارة أذونات الوصول من هاتفك. تحكم كامل دون الحضور في الموقع.' },
      { label: 'تحليلات الفيديو', description: 'التعرف على لوحات الأرقام، عد الأشخاص، كشف التسكع، وتنبيهات منطقة المحيط. تُطبَّق حيث تكون ذات صلة — لا تُباع كحزمة لن تُضبَّط.' },
    ],
    steps: [
      { title: 'تقييم الموقع ونمذجة التهديدات', body: 'نتجول في مبانيك مع فريق الأمن. نرسم نقاط الدخول، نحدد النقاط العمياء، نقيّم أحوال الإضاءة، ونوثق مخاطرك المحددة — ثم نصمم حولها.' },
      { title: 'التصميم والمشتريات', body: 'مواقع الكاميرات، مسارات الكابلات، مواصفات NVR/الخادم، طوبولوجيا التحكم في الوصول، ومناطق الإنذار — كلها موثقة في حزمة تصميم قبل الشراء.' },
      { title: 'التركيب والتكامل والتدريب', body: 'تركيب احترافي بلا كابلات مكشوفة حيث يهم المظهر. جميع الأنظمة مدمجة في منصة واحدة. فريقك مُدرَّب على التشغيل اليومي والاستجابة للحوادث.' },
    ],
    technologies: ['Hikvision', 'Dahua', 'Milestone VMS', 'Genetec', 'HID Global', 'Suprema', 'Honeywell', 'Bosch Security'],
    useCases: [
      { sector: 'المكاتب المؤسسية', detail: 'التحكم في الوصول للردهة وغرفة الخوادم والطابق التنفيذي. تغطية كاملة بالكاميرا للمناطق المشتركة وصفوف السيارات وأرصفة التحميل.' },
      { sector: 'المدارس والحرم الجامعية', detail: 'كاميرات المحيط على جميع بوابات الدخول. التحكم في الوصول بتحديد المناطق حسب الدور: موظفون، طلاب، زوار. أزرار ذعر في الفصول.' },
      { sector: 'التجزئة والضيافة', detail: 'كاميرات منع الخسائر عند نقاط البيع ونقاط الوصول لغرفة المخزن. تحليلات عد الأشخاص لتقارير حركة الزوار. التحكم في الوصول لمنطقة العمل للموظفين.' },
      { sector: 'الحكومة والبنية التحتية الحيوية', detail: 'تحكم وصول عالي الأمان مع بيومتريات ومصادقة متعددة العوامل. تخزين NVR مكرر. مساكن كاميرا مقاومة للتلاعب. معالجة بيانات متوافقة مع GDPR.' },
    ],
    problems: [
      { title: 'نقاط عمياء في الكاميرا لم تُعالج', body: 'المُركِّب الأصلي وضع الكاميرات للسهولة لا للتغطية. نعيد تصميم المواقع بناءً على نموذج تهديد فعلي.' },
      { title: 'لا سجل تدقيق لدخول الأبواب', body: 'الموظفون يتشاركون المفاتيح أو رموز PIN بلا تسجيل. عند اختفاء شيء، لا طريقة لمعرفة من دخل. التحكم في الوصول يحل هذا فور نشره.' },
      { title: 'لا يمكن مراجعة الكاميرات عن بعد', body: 'أنظمة DVR قديمة بلا وصول عن بعد، أو أنظمة على شبكة منفصلة عن اتصال الإنترنت. ننقل أو نعيد تهيئة لمنحك رؤية عن بعد كاملة.' },
      { title: 'نظام إنذار بلا تكامل مع الكاميرا', body: 'ينطلق إنذار لكن المشغل لا يستطيع رؤية ما سببه. ندمج الإنذارات والكاميرات حتى يأتي كل حدث مع لقطات لا مجرد إشعار.' },
    ],
    relatedServices: [
      { slug: 'network', name: 'الشبكات والبنية التحتية', short: 'الكاميرات IP تحتاج شبكة مبنية لها.' },
      { slug: 'cybersecurity', name: 'الأمن السيبراني', short: 'أمّن الأنظمة التي تراقب مبانيك.' },
    ],
  },

  cloud: {
    name: 'الخدمات السحابية والمُدارة',
    eyebrow: 'الخدمات السحابية والمُدارة',
    headline: 'بنية تحتية لا تتوقف عن العمل.',
    description: 'Microsoft 365، Google Workspace، نسخ احتياطي سحابي، ومراقبة عن بعد على مدار الساعة — كل شيء مُدار تحت اتفاقية خدمة واحدة. دعم استباقي لا رد فعل على الحرائق.',
    context: 'معظم المؤسسات اللبنانية تعمل على مزيج من الخوادم المحلية وحسابات Dropbox الشخصية والبرامج غير المرخصة — بلا استراتيجية نسخ احتياطي وبلا دعم تقني حتى ينكسر شيء. عندما ينكسر، البحث عن تقني يكلف ساعات وأحياناً أياماً. ندير بيئتك بشكل استباقي: تُطبَّق التحديثات، وتُتحقق النسخ الاحتياطية، وتُكتشف المشكلات قبل أن يبلغ عنها المستخدمون.',
    keyMetric: { value: '< 4 ساعات', label: 'متوسط زمن الاستجابة عبر جميع العملاء المُدارين' },
    included: [
      { label: 'Microsoft 365 وGoogle Workspace', description: 'الترخيص والترحيل والتهيئة الكاملة. حسابات المستخدمين والأقراص المشتركة وسياسات البريد الإلكتروني وMFA والوصول الشرطي. منشورة بشكل صحيح.' },
      { label: 'النسخ الاحتياطي السحابي والتعافي من الكوارث', description: 'بنية نسخ احتياطي 3-2-1: ثلاث نسخ، نوعان من الوسائط، نسخة واحدة خارج الموقع. التحقق اليومي من النسخ الاحتياطية. أهداف وقت الاسترداد موثقة ومُختبَرة.' },
      { label: 'المراقبة والإدارة عن بعد RMM', description: 'كل خادم ومحطة عمل مُدارة مراقبة لأداء الأجهزة وصحة الأقراص والذاكرة والتوافر. نرى المشكلات قبل فريقك. معظم المشكلات تُحل دون زيارة ميدانية.' },
      { label: 'إدارة التحديثات', description: 'تحديثات نظام التشغيل والتطبيقات تُختبر وتُنشر بجدول زمني. لا مزيد من الأجهزة التي تعمل بـ Windows مع ثلاث سنوات من التحديثات الفائتة.' },
      { label: 'دعم تقني مع اتفاقية خدمة', description: 'قناة دعم مخصصة لفريقك. المشكلات مُسجَّلة ومُصنَّفة ومحلولة ضمن اتفاقية الخدمة. أهداف وقت الاستجابة متفق عليها مسبقاً وتُتبَّع شهرياً.' },
      { label: 'تقارير صحة شهرية', description: 'كل جهاز مُدار، حالة النسخ الاحتياطي، تغطية التحديثات، التذاكر المفتوحة، وملخص الحوادث. وثيقة واحدة تخبرك بالضبط كيف أدّت بيئتك الشهر الماضي.' },
    ],
    steps: [
      { title: 'تدقيق البيئة', body: 'نحصي كل جهاز وتطبيق وحساب مستخدم وتهيئة نسخ احتياطي. نوثق ما هو موجود وما هو في خطر وما يحتاج تغييراً قبل أن نتحمل مسؤولية عنه.' },
      { title: 'الترحيل والتهيئة', body: 'ننقل بياناتك وننشر منصتك السحابية ونضبط النسخ الاحتياطي وننضم فريقك. تُجرى عمليات الترحيل خارج ساعات العمل. صفر بيانات مفقودة، صفر انقطاع في الإنتاجية.' },
      { title: 'الإدارة المستمرة والتقارير الشهرية', body: 'بعد الإطلاق، ندير كل شيء. التقارير الشهرية تصل إلى بريدك الإلكتروني. المراجعات الفصلية تواءم بيئتك التقنية مع توجه عملك. رقم واحد للاتصال.' },
    ],
    technologies: ['Microsoft 365', 'Google Workspace', 'Microsoft Azure', 'Acronis', 'Veeam', 'N-able', 'ConnectWise', 'Cloudflare'],
    useCases: [
      { sector: 'المنظمات غير الحكومية بفرق موزعة', detail: 'موظفون موزعون في لبنان ودولياً. Microsoft 365 مع Teams وSharePoint وOneDrive يحل محل مشاركة الملفات المتفرقة. توثيق امتثال لتقارير المانحين.' },
      { sector: 'شركات الخدمات المهنية', detail: 'مكاتب محاماة وشركات محاسبة واستشارات ببيانات عملاء سرية. تخزين سحابي آمن وMFA على جميع الحسابات وسياسات الاحتفاظ بالبيانات.' },
      { sector: 'الشركات سريعة النمو', detail: 'شركات تنمو بسرعة حيث يتأخر التقنية عن التوظيف. نضم مستخدمين جدداً في أقل من ساعة. الأجهزة تُصدَّر وتُهيَّأ وتُسلَّم جاهزة للاستخدام.' },
      { sector: 'المؤسسات التي تستبدل خوادمها المحلية', detail: 'خوادم قديمة بلا عقد دعم، يحافظ عليها شخص واحد قد يغادر. ننقل أعباء العمل إلى السحابة ونلغي نقطة الفشل الواحدة.' },
    ],
    problems: [
      { title: 'الملفات على لابتوبات شخصية وUSB بلا نسخ احتياطي', body: 'بيانات الأعمال الحيوية في أماكن لا تصلها أي سياسة نسخ احتياطي. لابتوب مسروق أو محرك فاشل وتضيع. نوحدها ونحميها من اليوم الأول.' },
      { title: 'خوادم لم تُحدَّث منذ سنوات', body: 'تأخر التحديث بسبب الأولويات. الخادم لا يزال يعمل فلا أحد يلمسه. نؤسس جدولاً للتحديث ونسد الثغرة قبل استغلالها.' },
      { title: 'لا دعم تقني عند الأعطال', body: 'انتظار تقني متعاقد قد يرد أو لا يرد. نوفر دعماً بأهداف استجابة محددة في اتفاقية الخدمة.' },
      { title: 'نسخ احتياطية موجودة لكن لم تُختبر قط', body: 'نسخ احتياطية تعمل على قرص خارجي في غرفة الخوادم. لا تحقق، لا نسخة خارج الموقع، لا استرداد مُختبَر. نستبدل هذا ببنية 3-2-1 مُتحقق منها ومُختبَرة.' },
    ],
    relatedServices: [
      { slug: 'cybersecurity', name: 'الأمن السيبراني', short: 'أمّن بيئتك السحابية من اليوم الأول.' },
      { slug: 'hardware', name: 'الأجهزة والحوسبة', short: 'نصدر ونهيئ الأجهزة التي يستخدمها فريقك.' },
    ],
  },

  power: {
    name: 'الطاقة واستمرارية الأعمال',
    eyebrow: 'الطاقة والطاقة',
    headline: 'لا انقطاع في الكهرباء يوقف عملك.',
    description: 'أنظمة UPS محسوبة وفق حمولتك الفعلية، توسعة البطاريات، ربط المولد التلقائي، والطاقة الشمسية. مبنية للبنان — حيث الطاقة الموثوقة استثناء لا قاعدة.',
    context: 'لبنان يحصل في المتوسط على 3 إلى 12 ساعة من كهرباء EDL يومياً حسب المنطقة. كل مؤسسة تعمل على مولد، لكن معظم المولدات تستغرق 10 إلى 30 ثانية للتشغيل — كافية لتعطل خادم أو إتلاف قاعدة بيانات أو قطع مكالمة VoIP. معظم تركيبات UPS صغيرة الحجم أو غير مشحونة أو تعمل على بطاريات لم تُستبدل قط.',
    keyMetric: { value: '0 ثانية', label: 'توقف أثناء تحويل الطاقة مع UPS مُحدد الحجم بشكل صحيح' },
    included: [
      { label: 'أنظمة UPS محسوبة وفق الحمل الحيوي', description: 'APC أو Eaton UPS مُحدد وفق حمولتك الفعلية لا رقم تقريبي. وقت التشغيل محسوب لوقت بدء المولد مع هامش أمان. مراقبة صحة البطاريات مشمولة.' },
      { label: 'توسعة البطاريات والاستبدال', description: 'وحدات بطاريات ممتدة لزيادة وقت التشغيل عند الحاجة. برنامج استبدال بطاريات للقضاء على نقطة الفشل الأكثر شيوعاً في أي نظام UPS.' },
      { label: 'ربط المولد التلقائي ATS', description: 'توصيل مفتاح التحويل التلقائي حتى يبدأ المولد ويأخذ الحمل دون تدخل يدوي. UPS يسد الفجوة. أجهزتك لا ترى التحويل.' },
      { label: 'ألواح شمسية وتخزين بطاريات', description: 'طاقة شمسية على السطح أو الأرض مع تخزين ببطاريات الليثيوم. يقلل من وقت تشغيل المولد، يخفض تكلفة الوقود، ويمدد مدة الاحتياطي.' },
      { label: 'لوحة مراقبة الطاقة', description: 'رؤية فورية لحمل UPS وصحة البطاريات ووقت تشغيل المولد واستهلاك الطاقة. تنبيهات قبل فشل البطاريات. تقارير شهرية عن أحداث الطاقة ووقت التشغيل.' },
      { label: 'حساب الحمل وتدقيق الطاقة', description: 'نقيس حمولتك الفعلية قبل تحديد أي شيء. الإفراط في التحديد يهدر الأموال. الإفراط في التقليل يسبب بالضبط المشكلة التي تحاول منعها.' },
    ],
    steps: [
      { title: 'تدقيق الطاقة وقياس الحمل', body: 'نُجهز أنظمتك الحيوية ونقيس استهلاك الطاقة الفعلي. نوثق وقت تشغيل المولد، ونختبر وقت تشغيل UPS الحالي، ونحدد كل نقطة فشل واحدة في بنيتك الحالية.' },
      { title: 'تصميم النظام والمواصفات', body: 'UPS والبطاريات وATS والمكونات الشمسية مُحددة لملف حمولتك الدقيق. أهداف وقت التشغيل متفق عليها مسبقاً. المعدات مختارة من العلامات التجارية ذات الضمان المحلي.' },
      { title: 'التركيب والتشغيل واختبار الفشل التلقائي', body: 'تركيب احترافي مع صفر توقف على أنظمتك الحيوية. اختبار فشل تلقائي كامل: نقطع التيار الرئيسي ونتحقق من أداء كل مكون كما صُمم.' },
    ],
    technologies: ['APC by Schneider Electric', 'Eaton', 'SMA Solar Technology', 'Victron Energy', 'Pylontech', 'Huawei Solar', 'ComAp', 'ABB'],
    useCases: [
      { sector: 'مراكز البيانات وغرف الخوادم', detail: 'UPS للحامل على كل دائرة حيوية. وحدات بطاريات ممتدة لوقت تشغيل 30+ دقيقة. UPS مكرر في تهيئة N+1 للأحمال الأكثر أهمية.' },
      { sector: 'المستشفيات والعيادات', detail: 'المعدات الطبية والخوادم والإضاءة على طاقة نظيفة ومنظمة. UPS صفر تحويل على الدوائر الحيوية للحياة. مولد مربوط بـ ATS للتشغيل دون مراقبة.' },
      { sector: 'المكاتب ذات العمليات بعد ساعات العمل', detail: 'الفرق التي تعمل متأخراً تحتاج أنظمة متاحة عند انقطاع EDL. UPS على البنية التحتية للشبكة ومحطات العمل. الطاقة الشمسية تقلل الاعتماد على المولد.' },
      { sector: 'البنوك والمكاتب المالية', detail: 'أنظمة المعاملات التي لا يمكن أن تتوقف في منتصف العملية. طاقة مستمرة على أجهزة الصراف والخوادم المصرفية الأساسية والبنية التحتية للشبكة.' },
    ],
    problems: [
      { title: 'يتعطل الخادم في كل تبديل للطاقة', body: 'المولد يستغرق وقتاً طويلاً للتشغيل، أو UPS صغير الحجم. نُحدد وننشر UPS الصحيح بوقت تشغيل كافٍ لسد التحويل بشكل سليم.' },
      { title: 'بطاريات UPS لم تُستبدل قط', body: 'البطاريات تتدهور على مدى 3 إلى 5 سنوات. UPS ببطاريات ميتة لا يوفر حماية. نراجع صحة البطاريات ونُنفذ برنامج استبدال.' },
      { title: 'المولد يعمل طول اليوم بتكلفة وقود عالية', body: 'بدون طاقة شمسية، يحمل المولد الحمل الكامل أثناء انقطاع EDL. نصمم أنظمة شمسية وبطاريات تتحمل الحمل النهاري.' },
      { title: 'لا رؤية لحمل UPS أو حالة البطاريات', body: 'إذا فشل UPS بصمت، تعرف عند توقف الخادم. ننشر مراقبة الطاقة التي تنبهك قبل أن يتحول حدث البطارية إلى انقطاع.' },
    ],
    relatedServices: [
      { slug: 'network', name: 'الشبكات والبنية التحتية', short: 'أبقِ شبكتك متصلة خلال كل انقطاع.' },
      { slug: 'cloud', name: 'الخدمات السحابية والمُدارة', short: 'راقب أنظمة الطاقة عن بعد.' },
    ],
  },

  hardware: {
    name: 'الأجهزة والحوسبة',
    eyebrow: 'الأجهزة والحوسبة',
    headline: 'الأجهزة المناسبة، منشورة بشكل صحيح.',
    description: 'لابتوبات، خوادم، NAS، ومحطات عمل مصدرة من موزعين معتمدين، مُهيأة وفق صورة موحدة، ومنشورة من قبلنا. لا استيراد رمادي. لا تهيئة متروكة للصدفة. ضمان يعمل فعلاً.',
    context: 'مصادر الأجهزة في لبنان متشتتة: استيراد رمادي بلا ضمان، أجهزة للمستهلكين في بيئات الأعمال، وخوادم مُجمَّعة بلا تهيئة سليمة. معظم المؤسسات ليس لديها سياسة أجهزة موحدة: الموظفون يستخدمون لابتوبات شخصية، "الخادم" برج كمبيوتر في خزانة، ولا أحد يعرف ما المُثبَّت على أي جهاز.',
    keyMetric: { value: '< 48 ساعة', label: 'وقت توزيع الأجهزة من الطلب حتى التشغيل' },
    included: [
      { label: 'لابتوبات وكمبيوترات مكتبية ومحطات عمل', description: 'أجهزة Dell وHP وLenovo للأعمال من موزعين معتمدين. شروط ضمان صحيحة، لا استيراد رمادي. مُحددة للدور — لا الخيار الأرخص الذي يمر.' },
      { label: 'خوادم وتخزين NAS', description: 'خوادم HPE ProLiant وDell PowerEdge. Synology وQNAP NAS لخدمة الملفات والنسخ الاحتياطي. مُحددة بشكل صحيح، مُركَّبة في الرف، ومُكبَّلة بشكل سليم.' },
      { label: 'صورة نظام موحدة والتهيئة', description: 'كل جهاز مُحمَّل بصورتك القياسية قبل أن يغادر أيدينا. مُنضم للنطاق، السياسات مُطبَّقة، البرامج مُثبَّتة. افتح علبته، وصله، اعمل.' },
      { label: 'طابعات ومحيطيات وملحقات', description: 'طابعات Brother وHP للأعمال، UPS لمحطات العمل، شاشات، محطات إرساء، وهواتف IP. كل ما يحتاجه فريقك للعمل من اليوم الأول.' },
      { label: 'التوزيع وتأهيل المستخدمين', description: 'نوصل الأجهزة المُهيأة إلى موقعك ونكمل التوزيع. ملفات تعريف المستخدمين مُنشأة، البريد الإلكتروني مُهيأ، المحيطيات موصولة. فريقك منتج من الدقيقة الأولى.' },
      { label: 'إدارة الضمان', description: 'ندير مطالبات الضمان مع الشركات المصنعة نيابة عنك. إذا فشل جهاز في فترة الضمان، نتولى عملية الاستبدال — لا تحتاج لمتابعة أحد.' },
    ],
    steps: [
      { title: 'المتطلبات والمواصفات', body: 'نُجري مقابلات مع رؤساء الأقسام ونراجع مخزون الأجهزة الحالي. نُحدد الأجهزة وفق عبء العمل الفعلي — فرق التصميم تحصل على أجهزة قادرة على GPU، فرق المالية تحصل على لابتوبات أعمال موثوقة.' },
      { title: 'الشراء والتهيئة', body: 'نصدر من موزعين معتمدين، ونُهيئ كل جهاز وفق صورتك القياسية، ونختبر قبل التوزيع. الأصول مُعلَّمة ومُدخلة في سجل مخزونك.' },
      { title: 'التوزيع والإدارة المستمرة', body: 'توزيع مجدول بلا خسارة في الإنتاجية. الأجهزة تُسلَّم للمستخدمين مع تهيئة البريد الإلكتروني وتثبيت التطبيقات. ندير دورة حياة الأصول وتجديدات الضمان ودورات التحديث مستقبلاً.' },
    ],
    technologies: ['Dell', 'HP', 'Lenovo', 'HPE ProLiant', 'Synology', 'QNAP', 'Brother', 'Cisco IP Phones', 'Microsoft Intune'],
    useCases: [
      { sector: 'إعداد المكاتب الجديدة', detail: 'شراء كامل لأجهزة مكتب جديد: محطات عمل، خادم، طابعات، شبكة، وUPS. ننسق التسليم والتوزيع حتى يكون المكتب جاهزاً في اليوم الأول.' },
      { sector: 'دورات تحديث الأجهزة', detail: 'استبدال مخطط للأجهزة المتقادمة قبل أن تفشل. نراجع الأسطول، ونُحدد الأجهزة المعرضة للخطر حسب العمر وسجل الأعطال، وننتج خطة استبدال متدرجة.' },
      { sector: 'أجهزة الفريق عن بعد', detail: 'لابتوبات مُهيأة مسبقاً وتُرسَل للموظفين عن بعد. صورة قياسية وعميل VPN وسياسات الشركة مُطبَّقة قبل أن يغادر الجهاز أيدينا.' },
      { sector: 'المدارس ومراكز التدريب', detail: 'محطات عمل المختبرات بمواصفات متسقة. صور البرامج مُنشرة مركزياً. لوحات مفاتيح ومحيطيات مُحددة للاستخدام المكثف. الضمان مُدار لكل جهاز.' },
    ],
    problems: [
      { title: 'الموظفون يستخدمون لابتوبات شخصية بلا إدارة', body: 'بيانات الشركة على أجهزة شخصية بلا تشفير، لا نسخ احتياطي، ولا طريقة للمسح عن بعد. نشتري أجهزة أعمال مُسجَّلة في MDM من اليوم الأول.' },
      { title: 'لا صورة أجهزة موحدة عبر الأسطول', body: 'كل جهاز مختلف: نسخة نظام تشغيل مختلفة، برامج مختلفة، إعدادات مختلفة. الدعم يستغرق ضعف الوقت. نُنشئ ونُطبق صورة قياسية.' },
      { title: 'لا خادم ملفات، كل شيء على الأقراص المحلية', body: 'التعاون مستحيل. البيانات غير مُحتاطة. شخص يغادر وتذهب ملفاته معه. ننشر NAS أو منصة ملفات سحابية وننقل البيانات بشكل صحيح.' },
      { title: 'أجهزة سوق رمادية بلا ضمان حقيقي', body: 'أجهزة مصدرها موزعون غير رسميين تفشل بلا سبيل للرجوع. نصدر حصراً من قنوات معتمدة بشروط ضمان موثقة.' },
    ],
    relatedServices: [
      { slug: 'cloud', name: 'الخدمات السحابية والمُدارة', short: 'ندير كل جهاز ننشره لك.' },
      { slug: 'network', name: 'الشبكات والبنية التحتية', short: 'الشبكة التي تعمل عليها أجهزتك.' },
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = serviceContent[slug]
  if (!content) return { title: 'Not Found' }
  return {
    title: `${content.name} | تكنيات لبنان`,
    description: content.description,
    alternates: {
      canonical: `https://techaneyat.com/ar/services/${slug}`,
      languages: { en: `https://techaneyat.com/services/${slug}` },
    },
  }
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export default async function ArabicServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const content = serviceContent[slug]
  if (!content) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.name,
    description: content.description,
    url: `https://techaneyat.com/ar/services/${slug}`,
    provider: { '@id': 'https://techaneyat.com/#organization' },
    areaServed: { '@type': 'Country', name: 'Lebanon' },
    inLanguage: 'ar',
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Nav locale="ar" />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{ background: 'var(--tn-bg)', backgroundImage: 'var(--tn-gradient-hero)', padding: '100px 0 72px' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>{content.eyebrow}</p>
            <h1 style={{ marginBottom: '24px', maxWidth: '680px' }}>{content.headline}</h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.9, marginBottom: '40px' }}>{content.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="/ar/contact" className="btn-primary">تحدث مع مهندس</a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', background: 'var(--tn-accent-dim)', border: '1px solid var(--tn-border-accent)', borderRadius: '4px' }}>
                <span style={{ fontFamily: 'var(--tn-font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--tn-accent)', direction: 'ltr' }}>{content.keyMetric.value}</span>
                <span style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '11px', color: 'var(--tn-text-3)', maxWidth: '140px', lineHeight: 1.4 }}>{content.keyMetric.label}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lebanon context */}
        <section style={{ background: 'var(--tn-bg-2)', borderTop: '1px solid var(--tn-border)', borderBottom: '1px solid var(--tn-border)', padding: '64px 0' }}>
          <div className="section-container" style={{ maxWidth: '760px' }}>
            <p style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '11px', fontWeight: 500, color: 'var(--tn-accent)', marginBottom: '20px' }}>الواقع في لبنان</p>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '17px', lineHeight: 1.95 }}>{content.context}</p>
          </div>
        </section>

        {/* What's included */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>ما يتضمنه</p>
            <h2 style={{ marginBottom: '8px' }}>كل شيء مشمول تحت اتفاقية خدمة واحدة.</h2>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', marginBottom: '48px', maxWidth: '520px' }}>لا بنود مستثناة. لا مفاجآت عند الحاجة للاهتمام.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {content.included.map((item) => (
                <div key={item.label} className="glow-card" style={{ padding: '28px 28px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexDirection: 'row-reverse' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--tn-accent-dim)', border: '1px solid var(--tn-border-accent)', color: 'var(--tn-accent)', fontSize: '10px', flexShrink: 0 }}>✓</span>
                    <p style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '14px', fontWeight: 600, color: 'var(--tn-text)' }}>{item.label}</p>
                  </div>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.8 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>كيف يعمل</p>
            <h2 style={{ marginBottom: '48px' }}>من أول اتصال حتى التشغيل الكامل.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {content.steps.map((step, i) => (
                <div key={step.title} className="glow-card" style={{ padding: '32px' }}>
                  <p style={{ fontFamily: 'var(--tn-font-mono)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--tn-accent)', marginBottom: '16px', direction: 'ltr', textAlign: 'right' }}>
                    STEP {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{ marginBottom: '16px' }}>{step.title}</h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '15px', lineHeight: 1.8 }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section style={{ background: 'var(--tn-bg)', padding: '60px 0', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '12px', fontWeight: 500, color: 'var(--tn-text-3)', marginBottom: '28px' }}>التقنيات والموردون الذين نعمل معهم</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {content.technologies.map((tech) => (
                <span key={tech} style={{ padding: '7px 14px', background: 'var(--tn-bg-3)', border: '1px solid var(--tn-border)', borderRadius: '4px', fontFamily: 'var(--tn-font-mono)', fontSize: '12px', color: 'var(--tn-text-2)', direction: 'ltr' }}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>من يستفيد</p>
            <h2 style={{ marginBottom: '48px' }}>مبني لكل قطاع.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {content.useCases.map((uc) => (
                <div key={uc.sector} className="glow-card" style={{ padding: '28px' }}>
                  <p style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--tn-accent)', marginBottom: '12px' }}>{uc.sector}</p>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.8 }}>{uc.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>مشكلات شائعة نحلها</p>
            <h2 style={{ marginBottom: '8px' }}>هل يبدو هذا مألوفاً؟</h2>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', marginBottom: '48px', maxWidth: '480px' }}>هذه المواقف التي ندخل إليها أكثر. إذا وصفت أياً منها بيئتك، دعنا نصلحها.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {content.problems.map((p) => (
                <div key={p.title} style={{ padding: '28px', background: 'var(--tn-bg-3)', border: '1px solid var(--tn-border)', borderRadius: '8px', borderRight: '3px solid var(--tn-accent)' }}>
                  <p style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '15px', fontWeight: 600, color: 'var(--tn-text)', marginBottom: '10px' }}>{p.title}</p>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.8 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '60px 0', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '12px', fontWeight: 500, color: 'var(--tn-text-3)', marginBottom: '24px' }}>غالباً ما يُقترن مع</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {content.relatedServices.map((rel) => (
                <Link key={rel.slug} href={`/ar/services/${rel.slug}`} className="glow-card" style={{ padding: '20px 24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '4px', flex: '1 1 260px', maxWidth: '360px' }}>
                  <span style={{ fontFamily: 'var(--tn-font-arabic)', fontSize: '15px', fontWeight: 600, color: 'var(--tn-text)' }}>{rel.name}</span>
                  <span style={{ color: 'var(--tn-text-2)', fontSize: '13px' }}>{rel.short}</span>
                  <span style={{ color: 'var(--tn-accent)', fontFamily: 'var(--tn-font-mono)', fontSize: '11px', marginTop: '8px' }}>← اعرف أكثر</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0', textAlign: 'center', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>ابدأ الآن</p>
            <h2 style={{ marginBottom: '16px', maxWidth: '560px', margin: '0 auto 16px' }}>احصل على عرض لخدمة {content.name}.</h2>
            <p style={{ color: 'var(--tn-text-2)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px' }}>
              أخبرنا بإعدادك الحالي وما يحتاج تغييراً. نرد خلال 4 ساعات بمحادثة تقنية مباشرة.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/ar/contact" className="btn-primary">تحدث مع مهندس</a>
              <a href="tel:+96176100766" className="btn-ghost" style={{ direction: 'ltr' }}>+961 76 100 766</a>
            </div>
          </div>
        </section>

      </main>
      <Footer locale="ar" />
    </>
  )
}
