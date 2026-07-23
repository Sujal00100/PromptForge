"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Search, Trash2, ChevronRight, FileText, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { HistoryEntry } from "@/types";

interface HistoryListProps {
  entries: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
}

export function HistoryList({ entries, onSelect, onDelete }: HistoryListProps) {
  const [search, setSearch] = useState("");

  const filtered = entries.filter(
    (e) =>
      e.task.toLowerCase().includes(search.toLowerCase()) ||
      e.originalPrompt.toLowerCase().includes(search.toLowerCase())
  );

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/15";
    if (score >= 60) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/15";
    if (score >= 40) return "bg-amber-500/10 text-amber-400 border-amber-500/15";
    return "bg-red-500/10 text-red-400 border-red-500/15";
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-12 rounded-xl bg-[#111427] border-white/[0.06] text-white placeholder:text-gray-600 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20 focus-ring"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-white/[0.04] border-dashed rounded-2xl bg-white/[0.01]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] mb-4">
              <FileText className="h-7 w-7 text-gray-600" />
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">No history entries found</p>
            <p className="text-gray-600 text-xs">Start optimizing prompts to see them here</p>
          </div>
        ) : (
          filtered.map((entry) => (
            <div
              key={entry._id}
              onClick={() => onSelect(entry)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(entry); } }}
              className="stagger-item group flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-white/[0.04] bg-[#111427]/80 hover:bg-[#161a2e] cursor-pointer hover:border-white/[0.08] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 focus-ring"
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="font-medium text-white truncate text-sm sm:text-base">
                    {entry.task || "Untitled Task"}
                  </h3>
                  {entry.score?.overall && (
                    <Badge variant="outline" className={`${getScoreBadge(entry.score.overall)} rounded-md text-xs font-bold tabular-nums border shrink-0`}>
                      {entry.score.overall}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate mb-1.5">
                  {entry.originalPrompt}
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg h-8 w-8 focus-ring"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (entry._id) onDelete(entry._id);
                  }}
                  aria-label={`Delete ${entry.task || "entry"}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
