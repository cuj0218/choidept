export function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

export function nextPersonaIndex(current, key, length) {
  if (key === 'Home') return 0;
  if (key === 'End') return length - 1;
  if (key === 'ArrowRight' || key === 'ArrowDown') return wrapIndex(current + 1, length);
  if (key === 'ArrowLeft' || key === 'ArrowUp') return wrapIndex(current - 1, length);
  return current;
}

export function languageFromLocation(search, storedLanguage = 'ko') {
  const queryLanguage = new URLSearchParams(search).get('lang');
  return ['ko', 'en'].includes(queryLanguage)
    ? queryLanguage
    : (['ko', 'en'].includes(storedLanguage) ? storedLanguage : 'ko');
}

export function nextLanguage(language) {
  return language === 'en' ? 'ko' : (language === 'ko' ? 'en' : 'ko');
}
