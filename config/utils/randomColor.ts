export const randomColor = (): string => {
  const hexDigits = '0123456789ABCDEF';
  const color = Array.from({ length: 6 }, () => hexDigits[Math.floor(Math.random() * hexDigits.length)]).join('');
  return `#${color}`;
};
