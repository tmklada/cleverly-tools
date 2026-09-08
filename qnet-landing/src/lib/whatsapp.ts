import { site } from "@/config/site";

/** يبني رابط واتساب مع رسالة جاهزة. كل أزرار الصفحة تمرّ من هنا. */
export function whatsappLink(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappLink(productName: string): string {
  return whatsappLink(site.whatsappProductMessage.replace("{product}", productName));
}

export function businessWhatsappLink(): string {
  return whatsappLink(site.whatsappBusinessMessage);
}
