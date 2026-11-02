import type { HistoryEntry } from "@/types";

const STORAGE_KEY = "promptforge_history";

export function getHistoryEntries(): HistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
    return [];
  }
}

export function saveHistoryEntry(
  entryData: Omit<HistoryEntry, "_id" | "createdAt">
): HistoryEntry {
  if (typeof window === "undefined") {
    throw new Error("Cannot save history on the server");
  }

  const entries = getHistoryEntries();
  
  const newEntry: HistoryEntry = {
    ...entryData,
    _id: crypto.randomUUID(), // Generate a unique ID using Web Crypto API
    createdAt: new Date().toISOString(),
  };

  // Prepend new entry to the array
  const updatedEntries = [newEntry, ...entries];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    return newEntry;
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
    // Specifically handle quota exceeded
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new Error("Local storage is full. Please delete some old entries.");
    }
    throw new Error("Failed to save history entry");
  }
}

export function deleteHistoryEntry(id: string): void {
  if (typeof window === "undefined") return;

  const entries = getHistoryEntries();
  const updatedEntries = entries.filter((entry) => entry._id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error("Failed to delete from localStorage", error);
    throw new Error("Failed to delete history entry");
  }
}
