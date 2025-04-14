export const getLocalStorage = (key: string) => {
  if (typeof window === "undefined") return;
  const value = localStorage.getItem(key);
  if (value === null) return "[]";

  try {
    return JSON.parse(value);
  } catch (e) {
    // If parsing fails, return the raw value
    return value;
  }
};

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};
