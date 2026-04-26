type Lang = 'uk' | 'en';

const STORAGE_KEY = 'ayco-lang';

export function initLanguage(): void {
  const current: Lang = document.documentElement.lang === 'en' ? 'en' : 'uk';
  try {
    localStorage.setItem(STORAGE_KEY, current);
  } catch {
    /* ignore */
  }
}
