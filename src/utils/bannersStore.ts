import { MOCK_BANNERS, HeroBanner } from "@/data/mockData";

const BANNERS_STORAGE_KEY = "nomorecraft_stored_banners";

export function getStoredBanners(): HeroBanner[] {
  if (typeof window === "undefined") {
    return MOCK_BANNERS;
  }
  try {
    const raw = localStorage.getItem(BANNERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to parse stored banners:", err);
  }
  return MOCK_BANNERS;
}

export function saveStoredBanners(banners: HeroBanner[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(banners));
    window.dispatchEvent(new Event("nomorecraft_banners_updated"));
  } catch (err) {
    console.error("Failed to save banners:", err);
  }
}
