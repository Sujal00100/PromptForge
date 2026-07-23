"use client";

import { useState, useEffect } from "react";
import { HistoryList } from "@/components/history/HistoryList";
import { HistoryDetail } from "@/components/history/HistoryDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { History as HistoryIcon } from "lucide-react";
import { getHistoryEntries, deleteHistoryEntry } from "@/lib/storage";
import type { HistoryEntry } from "@/types";

export default function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<HistoryEntry | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistoryEntries();
      setEntries(data);
    } catch (error) {
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHistoryEntry(id);
      setEntries((prev) => prev.filter((e) => e._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success("Entry deleted");
    } catch (error) {
      toast.error("Failed to delete entry");
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid-bg" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
              <HistoryIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">History</h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">View and manage your past prompt optimizations</p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-24 bg-white/[0.04] rounded-2xl" />
            ))}
          </div>
        ) : selected ? (
          <HistoryDetail entry={selected} onBack={() => setSelected(null)} />
        ) : (
          <HistoryList
            entries={entries}
            onSelect={setSelected}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
