"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PromptInput } from "@/components/prompt/PromptInput";
import { ScoreGauge } from "@/components/prompt/ScoreGauge";
import { AnalysisCard } from "@/components/prompt/AnalysisCard";
import { RewriteCard } from "@/components/prompt/RewriteCard";
import { ImprovementsCard } from "@/components/prompt/ImprovementsCard";
import { VersionsPanel } from "@/components/prompt/VersionsPanel";
import { CompareView } from "@/components/prompt/CompareView";
import { toast } from "sonner";
import {
  BarChart3,
  FileText,
  Layers,
  GitCompare,
  Save,
  Loader2,
  Sparkles,
} from "lucide-react";
import { saveHistoryEntry } from "@/lib/storage";
import type {
  OptimizationResult,
  PromptVersion,
  ComparisonResult,
} from "@/types";

export default function OptimizePage() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isGeneratingVersions, setIsGeneratingVersions] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [versions, setVersions] = useState<PromptVersion[]>([]);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);

  const [currentTask, setCurrentTask] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleOptimize = async (task: string, prompt: string) => {
    setCurrentTask(task);
    setCurrentPrompt(prompt);
    setIsOptimizing(true);
    setResult(null);
    setVersions([]);
    setComparison(null);

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, prompt }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Optimization failed");
      }

      const data: OptimizationResult = await res.json();
      setResult(data);
      toast.success("Prompt optimized successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Optimization failed");
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleGenerateVersions = async () => {
    if (!currentTask || !currentPrompt) return;
    setIsGeneratingVersions(true);

    try {
      const res = await fetch("/api/versions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: currentTask, prompt: currentPrompt }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Version generation failed");
      }

      const data: PromptVersion[] = await res.json();
      setVersions(data);
      toast.success(`Generated ${data.length} prompt versions!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Version generation failed");
    } finally {
      setIsGeneratingVersions(false);
    }
  };

  const handleCompare = async () => {
    if (!result || versions.length === 0) return;
    setIsComparing(true);

    try {
      const promptsToCompare = [
        result.originalPrompt,
        result.rewrittenPrompt,
        ...(versions.length > 0 ? [versions[0].prompt] : []),
      ];

      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: currentTask,
          prompts: promptsToCompare,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Comparison failed");
      }

      const data: ComparisonResult = await res.json();
      setComparison(data);
      toast.success("Comparison complete!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Comparison failed");
    } finally {
      setIsComparing(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setIsSaving(true);

    try {
      await saveHistoryEntry({
        task: currentTask,
        originalPrompt: result.originalPrompt,
        rewrittenPrompt: result.rewrittenPrompt,
        score: result.score,
        improvements: result.improvements,
        versions: versions,
      });

      toast.success("Saved to history!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid-bg" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Optimize Your Prompt</h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Enter your task and prompt below. Our AI will analyze, score, and rewrite it for maximum effectiveness.
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8 sm:mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <PromptInput onSubmit={handleOptimize} isLoading={isOptimizing} />
        </div>

        {/* Loading skeleton */}
        {isOptimizing && (
          <div className="animate-fade-in space-y-6">
            {/* Score + Analysis skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              <Skeleton className="h-[380px] bg-white/[0.03] rounded-2xl border border-white/[0.04]" />
              <div className="lg:col-span-3 space-y-4">
                <Skeleton className="h-40 bg-white/[0.03] rounded-2xl border border-white/[0.04]" />
                <Skeleton className="h-40 bg-white/[0.03] rounded-2xl border border-white/[0.04]" />
              </div>
            </div>
            {/* Rewrite skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Skeleton className="h-56 bg-white/[0.03] rounded-2xl border border-white/[0.04]" />
              <Skeleton className="h-56 bg-white/[0.03] rounded-2xl border border-white/[0.04]" />
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && !isOptimizing && (
          <div className="space-y-6 animate-fade-in">
            {/* Toolbar: Tabs + Actions side by side */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:ml-auto sm:order-2">
                <Button
                  id="generate-versions-btn"
                  onClick={handleGenerateVersions}
                  disabled={isGeneratingVersions}
                  size="sm"
                  className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white gap-2 rounded-lg shadow-sm shadow-violet-500/15 hover:shadow-violet-500/25 active:scale-[0.97] text-xs font-medium disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isGeneratingVersions ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Layers className="h-3.5 w-3.5" />}
                  Versions
                </Button>
                <Button
                  id="compare-btn"
                  onClick={handleCompare}
                  disabled={isComparing || versions.length === 0}
                  size="sm"
                  className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white gap-2 rounded-lg shadow-sm shadow-cyan-500/15 hover:shadow-cyan-500/25 active:scale-[0.97] text-xs font-medium disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isComparing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <GitCompare className="h-3.5 w-3.5" />}
                  Compare
                </Button>
                <Button
                  id="save-btn"
                  onClick={handleSave}
                  disabled={isSaving}
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white gap-2 rounded-lg shadow-sm shadow-emerald-500/15 hover:shadow-emerald-500/25 active:scale-[0.97] text-xs font-medium disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  Save
                </Button>
              </div>
            </div>

            {/* ── Analysis Section: Score gauge + Strengths/Weaknesses/Suggestions ── */}
            <section>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-violet-400" />
                Analysis
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div className="lg:col-span-1">
                  <ScoreGauge score={result.score} />
                </div>
                <div className="lg:col-span-3">
                  <AnalysisCard analysis={result.score} />
                </div>
              </div>
            </section>

            {/* ── Rewrite Section: Optimized Prompt + Improvements side by side ── */}
            <section>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                Rewrite
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <RewriteCard
                  originalPrompt={result.originalPrompt}
                  rewrittenPrompt={result.rewrittenPrompt}
                />
                {result.improvements.length > 0 && (
                  <ImprovementsCard improvements={result.improvements} />
                )}
              </div>
            </section>

            {/* ── Versions Section ── */}
            {versions.length > 0 && (
              <section>
                <VersionsPanel versions={versions} />
              </section>
            )}

            {/* ── Compare Section ── */}
            {comparison && (
              <section>
                <CompareView comparison={comparison} />
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
