"use client";

import { Badge } from "@/components/ui/badge";
import { GitCompare, Trophy, ChevronRight } from "lucide-react";
import type { ComparisonResult } from "@/types";

interface CompareViewProps {
  comparison: ComparisonResult;
}

export function CompareView({ comparison }: CompareViewProps) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111427] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 sm:px-6 border-b border-white/[0.06] bg-gradient-to-r from-cyan-500/[0.04] to-transparent flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/15">
          <GitCompare className="h-4 w-4 text-cyan-400" />
        </div>
        <h3 className="text-sm font-semibold text-white">Comparison Results</h3>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Prompt outputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comparison.prompts.map((p, i) => {
            const isWinner = p.label === comparison.winner;
            return (
              <div
                key={i}
                className={`stagger-item rounded-2xl border p-5 transition-all duration-300 ${
                  isWinner
                    ? "border-emerald-500/20 bg-emerald-500/[0.03] shadow-lg shadow-emerald-500/[0.05] ring-1 ring-emerald-500/10"
                    : "border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.08] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white text-sm">{p.label}</h4>
                  {isWinner && (
                    <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-[10px] gap-1.5 rounded-md uppercase tracking-wider font-bold">
                      <Trophy className="h-3 w-3" />
                      Winner
                    </Badge>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Prompt
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-mono">{p.prompt}</p>
                  </div>
                  <div className="pt-3 border-t border-white/[0.04]">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Expected Output
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">{p.output}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Analysis */}
        <div className="rounded-xl border border-cyan-500/10 bg-cyan-500/[0.03] p-5">
          <p className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-wider mb-2.5">
            Analysis
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">{comparison.analysis}</p>
        </div>
      </div>
    </div>
  );
}
