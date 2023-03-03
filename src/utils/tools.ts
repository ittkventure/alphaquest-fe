export const capitalized = (str?: string) => {
  if (!str) return "";
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
};
