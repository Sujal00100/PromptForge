"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Sparkles, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import type { PromptVersion } from "@/types";

interface VersionsPanelProps {
  versions: PromptVersion[];
}

export function VersionsPanel({ versions }: VersionsPanelProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    if (score >= 40) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-red-400 bg-red-500/10 border-red-500/20";
  };

  const styleGradients: Record<string, string> = {
    creative: "from-pink-500/20 to-violet-500/20",
    technical: "from-cyan-500/20 to-blue-500/20",
    concise: "from-emerald-500/20 to-teal-500/20",
    detailed: "from-amber-500/20 to-orange-500/20",
    "few-shot": "from-indigo-500/20 to-purple-500/20",
    "chain-of-thought": "from-rose-500/20 to-red-500/20",
  };

  if (!versions || versions.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Generated Versions</h3>
        </div>
        <Badge variant="outline" className="bg-white/[0.04] text-gray-400 border-white/[0.06] rounded-lg text-xs tabular-nums">
          {versions.length} versions
        </Badge>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {versions.map((version, i) => {
          const isExpanded = expandedId === version.id;
          const isCopied = copiedId === version.id;
          const gradient = styleGradients[version.style?.toLowerCase()] || "from-violet-500/20 to-cyan-500/20";

          return (
            <div
              key={version.id}
              className={`stagger-item group rounded-2xl border bg-[#111427] overflow-hidden flex flex-col transition-all duration-300 ${
                isExpanded
                  ? "border-violet-500/20 shadow-lg shadow-violet-500/[0.06] ring-1 ring-violet-500/10"
                  : "border-white/[0.06] hover:border-white/[0.10] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
              }`}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${gradient} p-4 border-b border-white/[0.06]`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-white">
                      Version {i + 1}
                    </span>
                    {version.style && (
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase tracking-wider font-semibold bg-white/10 text-white/80 border-white/10 rounded-md px-2 py-0.5"
                      >
                        {version.style}
                      </Badge>
                    )}
                  </div>
                  {version.score > 0 && (
                    <Badge
                      variant="outline"
                      className={`${getScoreColor(version.score)} rounded-lg text-xs font-bold tabular-nums border`}
                    >
                      {version.score}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-4 sm:p-5">
                {/* Prompt text with max-height and fade */}
                <div className="relative">
                  <div
                    className={`text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed overflow-hidden transition-all duration-400 ease-in-out ${
                      isExpanded ? "max-h-[2000px]" : "max-h-[140px]"
                    }`}
                  >
                    {version.prompt}
                  </div>
                  {/* Gradient fade overlay when collapsed */}
                  {!isExpanded && version.prompt.length > 200 && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111427] to-transparent pointer-events-none" />
                  )}
                </div>

                {/* Rationale (shown when expanded) */}
                {isExpanded && version.rationale && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06] animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-violet-400" />
                      <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Rationale</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {version.rationale}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="border-t border-white/[0.06] px-4 py-3 flex items-center gap-2 bg-white/[0.01]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedId(isExpanded ? null : version.id)}
                  className="text-xs text-gray-400 hover:text-white hover:bg-white/[0.06] gap-1.5 rounded-lg h-8 px-3 flex-1 justify-center"
                >
                  {isExpanded ? (
                    <><ChevronUp className="h-3.5 w-3.5" /> Collapse</>
                  ) : (
                    <><ChevronDown className="h-3.5 w-3.5" /> Expand</>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(version.prompt, version.id)}
                  className="text-xs text-gray-400 hover:text-white hover:bg-white/[0.06] gap-1.5 rounded-lg h-8 px-3 flex-1 justify-center"
                  aria-label={`Copy version ${i + 1}`}
                >
                  {isCopied ? (
                    <><Check className="h-3.5 w-3.5 text-emerald-400" /> Copied!</>
                  ) : (
                    <><Copy className="h-3.5 w-3.5" /> Copy</>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
