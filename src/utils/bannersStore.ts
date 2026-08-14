import { MOCK_BANNERS, MOCK_SETTINGS, HeroBanner } from "@/data/mockData";

export interface HeroTextSettings {
  title: string;
  subtitle: string;
}

/**
 * Legacy fallback helpers. All production data reflects directly from Supabase API.
 */
export function getStoredBanners(): HeroBanner[] {
  return MOCK_BANNERS;
}

export function saveStoredBanners(banners: HeroBanner[]): void {
  // No-op: Data is synced 100% directly with Supabase via API routes.
}

export function getStoredHeroText(): HeroTextSettings {
  return {
    title: MOCK_SETTINGS.heroTitle,
    subtitle: MOCK_SETTINGS.heroSubtitle,
  };
}

export function saveStoredHeroText(heroText: HeroTextSettings): void {
  // No-op: Data is synced 100% directly with Supabase via API routes.
}
