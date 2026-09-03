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
