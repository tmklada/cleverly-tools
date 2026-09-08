/**
 * كل نصوص الصفحة بالعربية في مكان واحد.
 * ملاحظة قانونية: لا وعود دخل، لا ادعاءات طبية، ولا تمثيل رسمي لـ QNET.
 */
import {
  Sparkles, HeartPulse, Home, Plane, GraduationCap, Gem,
  Handshake, Compass, MessageCircleQuestion, MessageSquareHeart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const nav = {
  links: [
    { href: "#about", label: "من أنا" },
    { href: "#world", label: "عالم QNET" },
    { href: "#products", label: "المنتجات" },
    { href: "#how", label: "كيف نبدأ" },
    { href: "#opportunity", label: "فرصة العمل" },
    { href: "#faq", label: "الأسئلة" },
  ],
  cta: "تواصل عبر واتساب",
  menuOpen: "فتح القائمة",
  menuClose: "إغلاق القائمة",
};

export const hero = {
  badge: "مندوبة QNET مستقلة",
  title: "طريق جديد لحياة أكثر صحة",
  subtitle: "منتجات، معرفة ومرافقة شخصية… بالطريقة التي تناسبك.",
  text:
    "أساعدك على التعرّف إلى مجموعة منتجات وخدمات QNET، واختيار ما يناسب احتياجاتك فعلاً — بهدوء، بوضوح، وبدون أي ضغط.",
  ctaPrimary: "دردش معي على واتساب",
  ctaSecondary: "اكتشف عالم QNET",
  scroll: "مرّر للأسفل",
  chips: [
    { label: "رد شخصي عبر واتساب" },
    { label: "خبرة تزيد عن 15 سنة في الإرشاد" },
    { label: "بدون أي التزام" },
  ],
};

export const about = {
  eyebrow: "نعيم بلقائك",
  title: "يسعدني أن أتعرّف عليك",
  paragraphs: [
    "أنا نهيل سراي الدين، مندوبة QNET مستقلة. أرافق الأشخاص في التعرّف على منتجات وخدمات في مجالات الصحة، الـ Wellness، الجمال، المنزل والـ Lifestyle، وأساعدهم على إيجاد ما يناسبهم فعلاً.",
    "أؤمن بأن القرار الجيد يبدأ بمعلومة واضحة. لذلك، أنا هنا لأشرح، أجيب، وأرافقك بخطوات بسيطة — وأنت من يقرّر.",
  ],
  cta: "تحدّث معي",
  stats: [
    { value: "15+", label: "سنة خبرة في الإرشاد" },
    { value: "1:1", label: "مرافقة شخصية" },
    { value: "24h", label: "رد خلال يوم عمل" },
  ],
};

export type Category = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: LucideIcon;
};

export const world = {
  eyebrow: "QNET",
  title: "عالم كامل. في مكان واحد.",
  text:
    "QNET شركة Direct Selling عالمية تقدّم مجموعة واسعة من المنتجات والخدمات في مجالات الـ Wellness، الصحة، الجمال، الـ Lifestyle، المنزل، السفر، التعليم والمزيد.",
  categories: [
    { id: "wellness", title: "Wellness", subtitle: "صحة وجودة حياة", desc: "منتجات مصمَّمة لدعم نمط حياة متوازن ويومٍ أخفّ.", icon: HeartPulse },
    { id: "beauty", title: "Beauty", subtitle: "عناية وجمال", desc: "روتين عناية بالبشرة بلمسة راقية وبسيطة.", icon: Sparkles },
    { id: "home", title: "Home & Living", subtitle: "منتجات للمنزل والحياة", desc: "حلول عملية تجعل بيتك أهدأ وأنقى.", icon: Home },
    { id: "travel", title: "Travel", subtitle: "تجارب وسفر", desc: "عطلات وتجارب سفر بأسلوب مختلف.", icon: Plane },
    { id: "education", title: "Education", subtitle: "تعلّم وتطوّر", desc: "برامج ومحتوى للتطوير الشخصي والمهني.", icon: GraduationCap },
    { id: "lifestyle", title: "Lifestyle", subtitle: "منتجات وخدمات لأسلوب حياتك", desc: "ساعات، مجوهرات وقطع تعكس ذوقك.", icon: Gem },
  ] satisfies Category[],
};

export type Product = {
  id: string;
  name: string;
  category: string;
  short: string;
  long: string;
  highlights: string[];
  /** ضع هنا رابط/مسار صورة المنتج الحقيقية (مثلاً "/products/homepure.jpg") */
  image: string;
  imageAlt: string;
  /** true = صورة مؤقتة يجب استبدالها */
  isPlaceholderImage: boolean;
};

export const products = {
  eyebrow: "المنتجات",
  title: "المنتجات التي يحبّ الناس التعرّف عليها",
  text: "نماذج من المنتجات الأكثر طلبًا. اضغط على أي منتج للاطلاع على التفاصيل أو اسألني مباشرة.",
  more: "تفاصيل أكثر",
  modalCta: "اسألني عن هذا المنتج",
  modalNote: "المعلومات هنا للتعريف العام فقط. للتفاصيل الكاملة والأسعار المحدّثة، تواصل معي مباشرة.",
  items: [
    {
      id: "homepure",
      name: "HomePure",
      category: "Home & Living",
      short: "نظام فلترة مياه للمنزل بتصميم أنيق.",
      long: "نظام لتنقية مياه الشرب في المنزل، يجمع بين التصميم العملي وسهولة الاستخدام اليومي. مناسب للعائلات التي تبحث عن حل بسيط ومرتّب لمياه الشرب.",
      highlights: ["تصميم أنيق للمطبخ", "سهل التركيب والصيانة", "للاستخدام اليومي للعائلة"],
      image: "/products/homepure.svg",
      imageAlt: "HomePure – نظام فلترة مياه",
      isPlaceholderImage: true,
    },
    {
      id: "nutriplus",
      name: "Nutriplus",
      category: "Wellness",
      short: "مجموعة مكملات غذائية تدعم نمط حياة متوازن.",
      long: "مجموعة من المكملات الغذائية المصمّمة لتكون جزءًا من روتين يومي متوازن. أساعدك على فهم الخيارات واختيار ما يناسب أسلوب حياتك.",
      highlights: ["خيارات متنوّعة", "سهلة الدمج في اليوم", "مرافقة في الاختيار"],
      image: "/products/nutriplus.svg",
      imageAlt: "Nutriplus – مكملات غذائية",
      isPlaceholderImage: true,
    },
    {
      id: "physio-radiance",
      name: "Physio Radiance",
      category: "Beauty",
      short: "روتين عناية بالبشرة بلمسة فاخرة.",
      long: "مجموعة عناية بالبشرة بتركيبات راقية وروتين بسيط للصباح والمساء. مناسبة لمن يبحث عن عناية يومية أنيقة دون تعقيد.",
      highlights: ["روتين صباح ومساء", "ملمس خفيف", "تغليف راقٍ"],
      image: "/products/physio-radiance.svg",
      imageAlt: "Physio Radiance – عناية بالبشرة",
      isPlaceholderImage: true,
    },
    {
      id: "amezcua",
      name: "Amezcua",
      category: "Wellness",
      short: "منتجات Wellness بتصميم مميّز لليوم.",
      long: "خط منتجات Wellness معروف ضمن عالم QNET، بتصميم أنيق وسهل الحمل. أشرح لك كل التفاصيل وكيف يستخدمه الناس في يومهم.",
      highlights: ["تصميم مميّز", "سهل الحمل", "شرح كامل قبل القرار"],
      image: "/products/amezcua.svg",
      imageAlt: "Amezcua – منتجات Wellness",
      isPlaceholderImage: true,
    },
    {
      id: "bhm",
      name: "Bernhard H. Mayer",
      category: "Lifestyle",
      short: "ساعات ومجوهرات بتصميم كلاسيكي راقٍ.",
      long: "قطع ساعات ومجوهرات بطابع كلاسيكي، مناسبة للاقتناء الشخصي أو كهدية مميّزة. أعرض لك الموديلات المتاحة وأساعدك في الاختيار.",
      highlights: ["تصميم كلاسيكي", "خيار هدية مميّز", "موديلات متنوّعة"],
      image: "/products/bhm.svg",
      imageAlt: "Bernhard H. Mayer – ساعات ومجوهرات",
      isPlaceholderImage: true,
    },
    {
      id: "qvi-club",
      name: "QVI Club",
      category: "Travel",
      short: "عطلات وتجارب سفر بأسلوب مختلف.",
      long: "برامج عطلات وسفر تتيح لك اكتشاف وجهات جديدة بطريقة مرنة. أشرح لك كيف تعمل البرامج وما الذي يناسب خططك.",
      highlights: ["وجهات متنوّعة", "مرونة في التخطيط", "شرح واضح للخيارات"],
      image: "/products/qvi-club.svg",
      imageAlt: "QVI Club – عطلات وسفر",
      isPlaceholderImage: true,
    },
  ] satisfies Product[],
};

export const why = {
  eyebrow: "لماذا أنا؟",
  title: "لماذا تتحدّث معي؟",
  text: "لأن الفرق بين قرار جيد وقرار متسرّع… هو شخص يشرح لك بصدق.",
  items: [
    { title: "مرافقة شخصية", desc: "أرافقك خطوة بخطوة، من أول سؤال حتى الاختيار.", icon: Handshake },
    { title: "مساعدة في اختيار المنتج", desc: "أفهم احتياجك أولًا، ثم أقترح ما يناسبك فعلًا.", icon: Compass },
    { title: "إجابة على كل سؤال", desc: "لا يوجد سؤال صغير. اسأل كل ما يخطر ببالك.", icon: MessageCircleQuestion },
    { title: "خدمة شخصية عبر واتساب", desc: "تواصل مباشر وسريع، بلغتك وبالوقت الذي يناسبك.", icon: MessageSquareHeart },
  ],
};

export const how = {
  eyebrow: "كيف نبدأ",
  title: "الأمر أبسط مما تتخيّل",
  steps: [
    { n: "01", title: "تكتب لي", desc: "أرسل رسالة قصيرة عبر واتساب. هذا كل شيء." },
    { n: "02", title: "تخبرني ماذا تبحث عنه", desc: "أساعدك على فهم الخيارات التي قد تناسبك." },
    { n: "03", title: "نتقدّم معًا", desc: "تحصل على المعلومات والرابط المناسب للمتابعة." },
  ],
  cta: "ابدأ الآن عبر واتساب",
};

export const opportunity = {
  eyebrow: "فرصة العمل",
  /** الجزء الأوسط رقم – يُعرض بـ dir="ltr" حتى لا يقلبه الـ bidi */
  titleParts: ["هل تودّ إدارة عملك الخاص أو تطويره باستثمار ", "3–4", " ساعات يوميًا؟"] as const,
  subtitle: "عمل مرن يمكنك بناؤه بوقتك، ويفتح لك بابًا لمصدر دخل إضافي — بخطوات واضحة وبدون وعود فارغة.",
  text:
    "QNET تتيح للـ Independent Distributors تسويق منتجات وخدمات عبر نموذج Direct Selling. إذا كنت ترغب في فهم كيف يعمل النموذج فعليًا — ما هو مطلوب، وكيف تبدو البداية — يمكنك التحدّث معي وسأشرح لك بوضوح وشفافية.",
  points: [
    "تشرح لي وقتك وأهدافك، وأشرح لك النموذج كما هو",
    "لا التزام ولا ضغط — القرار لك بالكامل",
    "مرافقة شخصية في الخطوات الأولى",
  ],
  cta: "أريد أن أسمع المزيد",
  disclaimer:
    "النتائج تختلف من شخص لآخر وتعتمد على الجهد، الوقت والمبيعات الفعلية. لا يوجد أي ضمان للدخل أو للنجاح.",
};

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  /** PLACEHOLDER – استبدل بشهادة حقيقية بموافقة صاحبها */
  isPlaceholder: true;
};

export const testimonials = {
  eyebrow: "آراء",
  title: "ماذا يقول من تحدّثوا معي",
  placeholderBadge: "نموذج – يُستبدل",
  items: [
    { name: "اسم العميل/ة", role: "عميل/ة – المدينة", text: "«هنا يوضع رأي حقيقي من عميل/ة بعد الحصول على موافقته/ها. مثال: كيف كانت تجربة التواصل، وهل كان الشرح واضحًا.»", isPlaceholder: true },
    { name: "اسم العميل/ة", role: "عميل/ة – المدينة", text: "«شهادة حقيقية ثانية تُضاف هنا. يُفضّل أن تكون قصيرة، صادقة، وتصف التجربة الشخصية دون أي وعود.»", isPlaceholder: true },
    { name: "اسم العميل/ة", role: "عميل/ة – المدينة", text: "«شهادة حقيقية ثالثة تُضاف هنا. تجنّب أي ادعاءات طبية أو مالية — فقط تجربة الخدمة والمرافقة.»", isPlaceholder: true },
  ] satisfies Testimonial[],
};

export const faq = {
  eyebrow: "أسئلة",
  title: "أسئلة شائعة",
  items: [
    { q: "ما هي QNET؟", a: "QNET شركة Direct Selling عالمية تقدّم منتجات وخدمات في مجالات الـ Wellness، الصحة، الجمال، الـ Lifestyle، المنزل، السفر والتعليم. هذه الصفحة تُدار بشكل مستقل من قِبل مندوبة، وليست الموقع الرسمي للشركة." },
    { q: "ما هي المنتجات التي يمكن إيجادها؟", a: "مجموعة واسعة: أنظمة فلترة مياه للمنزل، مكملات غذائية، عناية بالبشرة، ساعات ومجوهرات، برامج سفر وعطلات، وبرامج تعليمية. أعرض لك ما يناسب احتياجك تحديدًا." },
    { q: "كيف تتم عملية الشراء؟", a: "بعد أن نتحدّث ونحدّد المنتج المناسب، أرسل لك المعلومات والرابط الملائم لإتمام الطلب بشكل رسمي وآمن عبر منصّة QNET." },
    { q: "هل يمكن التحدّث مع مندوب قبل الشراء؟", a: "بالتأكيد — هذا هو الهدف. تواصل معي عبر واتساب، اسأل كل ما تريد، ولا يوجد أي التزام." },
    { q: "ما هي فرصة الـ Direct Selling؟", a: "نموذج يتيح لأشخاص مستقلين تسويق المنتجات والخدمات مباشرة. إن كنت مهتمًا بفهم كيف يعمل، أشرح لك بوضوح وشفافية، دون أي وعود أو ضمانات." },
    { q: "كيف نتواصل؟", a: "الأسرع عبر واتساب — اضغط على أي زر في الصفحة وستصلك رسالة جاهزة، أو استخدم الزر العائم في أسفل الشاشة." },
  ],
};

export const finalCta = {
  title: ["لديك سؤال؟", "لنتحدّث."],
  text: "أنا هنا لأساعدك على التعرّف، السؤال والفهم.",
  cta: "أرسل لي واتساب",
  note: "رد شخصي • معلومات واضحة • بدون أي التزام",
};

export const footer = {
  tagline: "منتجات، معرفة ومرافقة شخصية.",
  contactTitle: "تواصل",
  linksTitle: "روابط",
  whatsapp: "واتساب",
  instagram: "إنستغرام",
  facebook: "فيسبوك",
  officialSite: "الموقع الرسمي لـ QNET",
  disclaimer: "هذا الموقع يُدار بشكل مستقل من قِبل مندوبة QNET مستقلة، وليس الموقع الرسمي لشركة QNET. لا يقدّم هذا الموقع أي وعود بالدخل أو ادعاءات طبية.",
  rights: "جميع الحقوق محفوظة.",
  backToTop: "العودة للأعلى",
};

export const floating = {
  label: "تواصل عبر واتساب",
  tooltip: "دردش معي",
};

export const a11y = {
  skip: "تخطّي إلى المحتوى",
  closeModal: "إغلاق النافذة",
  openWhatsapp: "فتح محادثة واتساب مع نهيل",
};
