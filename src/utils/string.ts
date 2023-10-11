export function formatUrl(str: string) {
  if (!str) return "";
  return str.replaceAll(" ", "-");
}

export function formatUrlRevert(str: string) {
  if (!str) return "";
  return str.replaceAll("-", " ");
}

export function formatSelectOptions(str?: string) {
  if (!str) return "";
  if (str === "today-12-m") return "12m";
  if (str === "12m") return "today-12-m";
  if (str === "today-5-y") return "5y";
  if (str === "5y") return "today-5-y";

  return "";
}
