import { Work, MOCK_WORKS } from "@/data/mockData";

/**
 * Legacy fallback helper. All production data reflects directly from Supabase API.
 */
export function getStoredWorks(): Work[] {
  return MOCK_WORKS;
}

export function saveStoredWorks(works: Work[]): void {
  // No-op: Data is synced 100% directly with Supabase via API routes.
}
