"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import type { PromptAnalysis } from "@/types";

interface AnalysisCardProps {
  analysis: PromptAnalysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  return (
    <div className="space-y-5">
      {/* Strengths */}
      <div className="rounded-2xl border border-emerald-500/10 bg-[#111427] overflow-hidden stagger-item">
        <div className="px-5 py-3.5 sm:px-6 bg-emerald-500/[0.04] border-b border-emerald-500/10 flex items-center gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <h4 className="text-sm font-semibold text-emerald-400">Strengths</h4>
          <Badge variant="outline" className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/15 rounded-md">
            {analysis.strengths.length}
          </Badge>
        </div>
        <ul className="p-5 sm:p-6 space-y-3">
          {analysis.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 ring-2 ring-emerald-400/20" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="rounded-2xl border border-amber-500/10 bg-[#111427] overflow-hidden stagger-item">
        <div className="px-5 py-3.5 sm:px-6 bg-amber-500/[0.04] border-b border-amber-500/10 flex items-center gap-2.5">
          <AlertCircle className="h-4 w-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-amber-400">Weaknesses</h4>
          <Badge variant="outline" className="ml-auto text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/15 rounded-md">
            {analysis.weaknesses.length}
          </Badge>
        </div>
        <ul className="p-5 sm:p-6 space-y-3">
          {analysis.weaknesses.map((w, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 ring-2 ring-amber-400/20" />
              {w}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="rounded-2xl border border-cyan-500/10 bg-[#111427] overflow-hidden stagger-item">
        <div className="px-5 py-3.5 sm:px-6 bg-cyan-500/[0.04] border-b border-cyan-500/10 flex items-center gap-2.5">
          <Lightbulb className="h-4 w-4 text-cyan-400" />
          <h4 className="text-sm font-semibold text-cyan-400">Suggestions</h4>
          <Badge variant="outline" className="ml-auto text-[10px] bg-cyan-500/10 text-cyan-400 border-cyan-500/15 rounded-md">
            {analysis.suggestions.length}
          </Badge>
        </div>
        <div className="p-5 sm:p-6 flex flex-wrap gap-2">
          {analysis.suggestions.map((s, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="bg-cyan-500/[0.07] text-cyan-300 border border-cyan-500/15 text-xs py-1.5 px-3.5 rounded-lg hover:bg-cyan-500/[0.12] hover:border-cyan-500/25 cursor-default"
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
