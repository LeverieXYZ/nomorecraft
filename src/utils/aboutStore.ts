import { MOCK_SETTINGS, SiteSettings } from "@/data/mockData";

/**
 * Legacy fallback helpers. All production data reflects directly from Supabase API.
 */
export function getStoredAboutSettings(): SiteSettings {
  return MOCK_SETTINGS;
}

export function saveStoredAboutSettings(settings: SiteSettings): void {
  // No-op: Data is synced 100% directly with Supabase via API routes.
}
