import { MOCK_BANNERS, MOCK_SETTINGS, HeroBanner } from "@/data/mockData";

const BANNERS_STORAGE_KEY = "nomorecraft_stored_banners";
const HERO_TEXT_STORAGE_KEY = "nomorecraft_stored_hero_text";

export interface HeroTextSettings {
  title: string;
  subtitle: string;
}

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
    // 1. Save to Local Storage + Trigger Event
    localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(banners));
    window.dispatchEvent(new Event("nomorecraft_banners_updated"));
  } catch (err) {
    console.error("Failed to save banners to localStorage:", err);
  }
}

export function getStoredHeroText(): HeroTextSettings {
  if (typeof window === "undefined") {
    return {
      title: MOCK_SETTINGS.heroTitle,
      subtitle: MOCK_SETTINGS.heroSubtitle,
    };
  }
  try {
    const raw = localStorage.getItem(HERO_TEXT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.title) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to parse stored hero text:", err);
  }
  return {
    title: MOCK_SETTINGS.heroTitle,
    subtitle: MOCK_SETTINGS.heroSubtitle,
  };
}

export function saveStoredHeroText(heroText: HeroTextSettings): void {
  if (typeof window === "undefined") return;
  try {
    // 1. Save to Local Storage + Trigger Event
    localStorage.setItem(HERO_TEXT_STORAGE_KEY, JSON.stringify(heroText));
    window.dispatchEvent(new Event("nomorecraft_hero_text_updated"));

    // 2. Persist to Database API (SQLite / Supabase)
    fetch("/api/cms/beranda", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "UPDATE_SETTINGS",
        data: {
          heroTitle: heroText.title,
          heroSubtitle: heroText.subtitle,
        },
      }),
    }).catch((err) => console.error("Failed to sync hero text to database:", err));
  } catch (err) {
    console.error("Failed to save hero text:", err);
  }
}
