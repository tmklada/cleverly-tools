# QNET Landing – نهيل سراي الدين

صفحة هبوط (Landing Page) مستقلة لمندوبة QNET، بالعربية و RTL بالكامل.
**ليست الموقع الرسمي لـ QNET.** لا وعود دخل، لا ادعاءات طبية.

## Stack
React 19 · Vite 7 · Tailwind CSS 4 · Framer Motion · Lucide Icons · TypeScript

## تشغيل
```bash
cd qnet-landing
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/
npm run preview
```

## أين تعدّل؟
| ماذا | أين |
|---|---|
| الاسم، رقم واتساب، الرسالة الجاهزة، روابط السوشيال | `src/config/site.ts` |
| كل نصوص الصفحة (Hero، الأقسام، FAQ…) | `src/content/ar.ts` |
| صورة المندوبة | استبدل `public/naheel.webp` (+ `naheel.jpg` للـ OG) بصورة عالية الدقة |
| صور المنتجات | ضع الصور في `public/products/` وعدّل `image` في `products.items` داخل `src/content/ar.ts`، ثم اجعل `isPlaceholderImage: false` |
| الشهادات (Testimonials) | `testimonials.items` – كلها **placeholder**؛ استبدلها بشهادات حقيقية بموافقة أصحابها |
| الدومين في SEO / OG | `index.html` – استبدل `https://naheel.example.com/` |

## النشر على Vercel
مشروع جديد → Root Directory = `qnet-landing` → Framework: Vite. لا يحتاج أي متغيرات بيئة.

## ملاحظات امتثال
- الصفحة تعرّف نفسها كصفحة مندوبة مستقلة (Independent Distributor) في الـ Hero، الفوتر، والـ Schema.
- قسم "فرصة العمل" لا يذكر مبالغ أو ضمانات، ويحتوي على Disclaimer.
