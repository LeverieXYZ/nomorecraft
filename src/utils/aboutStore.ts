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
    // 1. Save to Local Storage + Trigger Window Event
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event("nomorecraft_about_updated"));

    // 2. Persist to Database API (SQLite / Supabase)
    fetch("/api/tentang", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        aboutText: settings.aboutText,
        ownerName: settings.ownerName,
        whatsappNumber: settings.whatsappNumber,
      }),
    }).catch((err) => console.error("Failed to update database about settings:", err));
  } catch (err) {
    console.error("Failed to save stored about settings:", err);
  }
}
