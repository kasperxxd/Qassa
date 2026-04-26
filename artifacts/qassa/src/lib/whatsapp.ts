import type { BookingStatus } from "@workspace/api-client-react/src/generated/api.schemas";

function digitsOnly(phone: string): string {
  return phone.replace(/\D+/g, "");
}

const STATUS_MESSAGES: Record<BookingStatus, (name: string) => string> = {
  pending: (name) =>
    `مرحباً ${name}، تم استلام حجزك في صالون قصّة وأنت في قائمة الانتظار. سنخبرك فور حلول دورك.`,
  in_progress: (name) =>
    `مرحباً ${name}، حان دورك الآن في صالون قصّة. الحلاق في الطريق إليك.`,
  completed: (name) =>
    `شكراً ${name} لاختيارك صالون قصّة. نتشرّف بخدمتك مرة أخرى قريباً.`,
  cancelled: (name) =>
    `مرحباً ${name}، نأسف لإبلاغك بأن حجزك في صالون قصّة قد أُلغي. للاستفسار يرجى التواصل معنا.`,
};

export function buildWhatsAppUrl(
  phone: string,
  fullName: string,
  status: BookingStatus,
): string {
  const number = digitsOnly(phone);
  const message = STATUS_MESSAGES[status](fullName);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(
  phone: string,
  fullName: string,
  status: BookingStatus,
): void {
  const url = buildWhatsAppUrl(phone, fullName, status);
  window.open(url, "_blank", "noopener,noreferrer");
}
