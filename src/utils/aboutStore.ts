import { MOCK_SETTINGS, SiteSettings } from "@/data/mockData";

const ABOUT_STORAGE_KEY = "nomorecraft_about_settings";

export function getStoredAboutSettings(): SiteSettings {
  if (typeof window === "undefined") {
    return MOCK_SETTINGS;
  }
  try {
    const data = localStorage.getItem(ABOUT_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read stored about settings:", err);
  }
  return MOCK_SETTINGS;
}

export function saveStoredAboutSettings(settings: SiteSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event("nomorecraft_about_updated"));
  } catch (err) {
    console.error("Failed to save stored about settings:", err);
  }
}
