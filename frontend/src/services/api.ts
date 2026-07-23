import type { HistoryEntry } from "@/types";

// ─── Configuration ────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * The prompts API routes are proxied through Next.js rewrites
 * to the Express backend (see next.config.ts).
 *
 * In development:  /api/prompts → http://localhost:5000/api/prompts
 * In production:   /api/prompts → <BACKEND_URL>/api/prompts
 */
const PROMPTS_URL = `${API_BASE}/api/prompts`;

// ─── Helpers ──────────────────────────────────────────────────────

interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  error: string;
  details?: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const json: ApiResponse<T> = await res.json();

  if (!res.ok || !json.success) {
    const errMsg =
      "error" in json
        ? json.error
        : `Request failed with status ${res.status}`;
    throw new Error(errMsg);
  }

  return (json as ApiSuccessResponse<T>).data;
}

// ─── Prompt History API ───────────────────────────────────────────

/**
 * Fetch all prompt history entries (newest first).
 */
export async function getPrompts(): Promise<HistoryEntry[]> {
  return request<HistoryEntry[]>(PROMPTS_URL);
}

/**
 * Fetch a single prompt by ID.
 */
export async function getPromptById(id: string): Promise<HistoryEntry> {
  return request<HistoryEntry>(`${PROMPTS_URL}/${id}`);
}

/**
 * Save a new optimized prompt to the backend.
 */
export async function createPrompt(
  data: Omit<HistoryEntry, "_id" | "createdAt">
): Promise<HistoryEntry> {
  return request<HistoryEntry>(PROMPTS_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Update an existing prompt.
 */
export async function updatePrompt(
  id: string,
  data: Partial<HistoryEntry>
): Promise<HistoryEntry> {
  return request<HistoryEntry>(`${PROMPTS_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Delete a single prompt by ID.
 */
export async function deletePrompt(id: string): Promise<void> {
  await request<void>(`${PROMPTS_URL}/${id}`, {
    method: "DELETE",
  });
}

/**
 * Clear all prompt history.
 */
export async function clearPrompts(): Promise<void> {
  await request<void>(PROMPTS_URL, {
    method: "DELETE",
  });
}
