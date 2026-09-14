/* Número real, já em uso desde o fluxo de contato anterior. */
export const WHATSAPP_NUMBER = "5511937104630";

export const DIRECT_MESSAGE =
  "Olá! Vim pelo site da Mirai e quero saber mais sobre criação de site.";

export function whatsAppUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
