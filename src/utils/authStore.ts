const ADMIN_PASSWORD_KEY = "nomorecraft_admin_password";
const DEFAULT_PASSWORD = "admin123";

export function getStoredAdminPassword(): string {
  if (typeof window === "undefined") {
    return DEFAULT_PASSWORD;
  }
  try {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  } catch (err) {
    console.error("Failed to read admin password:", err);
  }
  return DEFAULT_PASSWORD;
}

export function saveStoredAdminPassword(newPassword: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
  } catch (err) {
    console.error("Failed to save admin password:", err);
  }
}
