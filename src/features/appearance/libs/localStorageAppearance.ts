export function getLocalStorageAppearance() {
  return localStorage.getItem("appearance") ?? "light";
}

export function setLocalStorageAppearance(newValue: Appearance) {
  localStorage.setItem("appearance", newValue);
}
