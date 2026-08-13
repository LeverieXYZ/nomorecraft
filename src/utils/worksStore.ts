import { Work, MOCK_WORKS } from "@/data/mockData";

const STORAGE_KEY = "nomorecraft_works_data";

export function getStoredWorks(): Work[] {
  if (typeof window === "undefined") return MOCK_WORKS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_WORKS));
      return MOCK_WORKS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading works from localStorage", error);
    return MOCK_WORKS;
  }
}

export function saveStoredWorks(works: Work[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
    // Dispatch custom event to notify other components/tabs
    window.dispatchEvent(new Event("nomorecraft_works_updated"));
  } catch (error) {
    console.error("Error saving works to localStorage", error);
  }
}
