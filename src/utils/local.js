export function getLocal(key) {
  let value = sessionStorage.getItem(key) || "";
  if (value.startsWith("[") || value.includes("{")) {
    return JSON.parse(value);
  } else {
    return value;
  }
}
export function setLocal(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  sessionStorage.setItem(key, value);
}
