/**
 * Storage abstraction layer.
 *
 * Previously used localStorage — now delegates to the Express backend
 * via the centralized API service. Function signatures are preserved
 * so existing consumers continue to work with minimal changes.
 */

import type { HistoryEntry } from "@/types";
import {
  getPrompts,
  createPrompt,
  deletePrompt,
} from "@/services/api";

/**
 * Fetch all history entries from the backend.
 * (Was: read from localStorage)
 */
export async function getHistoryEntries(): Promise<HistoryEntry[]> {
  return getPrompts();
}

/**
 * Save a new history entry to the backend.
 * (Was: write to localStorage)
 */
export async function saveHistoryEntry(
  entryData: Omit<HistoryEntry, "_id" | "createdAt">
): Promise<HistoryEntry> {
  return createPrompt(entryData);
}

/**
 * Delete a history entry from the backend.
 * (Was: remove from localStorage)
 */
export async function deleteHistoryEntry(id: string): Promise<void> {
  return deletePrompt(id);
}
