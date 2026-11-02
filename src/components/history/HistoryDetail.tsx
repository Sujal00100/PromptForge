"use client";

import { Button } from "@/components/ui/button";
import { ScoreGauge } from "@/components/prompt/ScoreGauge";
import { RewriteCard } from "@/components/prompt/RewriteCard";
import { ImprovementsCard } from "@/components/prompt/ImprovementsCard";
import { VersionsPanel } from "@/components/prompt/VersionsPanel";
import { ArrowLeft, Calendar } from "lucide-react";
import type { HistoryEntry } from "@/types";

interface HistoryDetailProps {
  entry: HistoryEntry;
  onBack: () => void;
}

export function HistoryDetail({ entry, onBack }: HistoryDetailProps) {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Back button + title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-white/[0.06] rounded-xl h-10 w-10 transition-all duration-200"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-lg font-bold text-white">{entry.task}</h2>
          <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
            <Calendar className="h-3 w-3" />
            {new Date(entry.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Score */}
        <div className="lg:col-span-1">
          {entry.score && <ScoreGauge score={entry.score} />}
        </div>

        {/* Rewrite + Improvements */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          {entry.rewrittenPrompt && (
            <RewriteCard
              originalPrompt={entry.originalPrompt}
              rewrittenPrompt={entry.rewrittenPrompt}
            />
          )}
          {entry.improvements && entry.improvements.length > 0 && (
            <ImprovementsCard improvements={entry.improvements} />
          )}
        </div>
      </div>

      {/* Versions */}
      {entry.versions && entry.versions.length > 0 && (
        <VersionsPanel versions={entry.versions} />
      )}
    </div>
  );
}
