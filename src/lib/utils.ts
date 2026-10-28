/** Smoothly scroll to an element by id */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id.replace('#', ''));
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Format a URL for safe display */
export function formatUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/** Check if speech synthesis is available */
export function hasSpeechSynthesis(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Copy text to clipboard, returns success */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

