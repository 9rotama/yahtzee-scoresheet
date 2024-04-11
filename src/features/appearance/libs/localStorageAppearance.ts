export function getLocalStorageAppearance() {
  return localStorage.getItem("appearance");
}

export function setLocalStorageAppearance(newValue: Appearance) {
  localStorage.setItem("appearance", newValue);
}
