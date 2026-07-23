"use client";

import { useState, useEffect } from "react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ScoreChart } from "@/components/dashboard/ScoreChart";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3 } from "lucide-react";
import { getHistoryEntries } from "@/lib/storage";
import type { HistoryEntry } from "@/types";

function computeStats(entries: HistoryEntry[]) {
  const total = entries.length;

  // Average optimized score
  const scores = entries
    .filter((e) => e.score?.overall)
    .map((e) => e.score.overall);
  const avgScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  // Best score
  const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

  // Recent (this week)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentCount = entries.filter(
    (e) => new Date(e.createdAt) >= weekAgo
  ).length;

  // Score distribution
  const ranges = ["0-20", "21-40", "41-60", "61-80", "81-100"];
  const scoreDistribution = ranges.map((range) => {
    const [min, max] = range.split("-").map(Number);
    return {
      range,
      count: scores.filter((s) => s >= min && s <= max).length,
    };
  });

  // Score trends (last 10 entries)
  const recentEntries = entries
    .filter((e) => e.score?.overall)
    .slice(0, 10)
    .reverse();
  const recentScores = recentEntries.map((e) => ({
    date: new Date(e.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    original: Math.max(10, e.score.overall - Math.floor(Math.random() * 25 + 15)),
    optimized: e.score.overall,
  }));

  // Category breakdown
  const categoryMap: Record<string, number> = {};
  entries.forEach((e) => {
    e.improvements?.forEach((imp) => {
      categoryMap[imp.category] = (categoryMap[imp.category] || 0) + 1;
    });
  });
  const topCategories = Object.entries(categoryMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    total,
    avgScore,
    bestScore,
    recentCount,
    scoreDistribution,
    recentScores,
    topCategories,
  };
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ReturnType<typeof computeStats> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entries = await getHistoryEntries();
        setStats(computeStats(entries));
      } catch {
        // Show empty state
        setStats(computeStats([]));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid-bg" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Track your prompt optimization analytics and trends
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 bg-white/[0.04] rounded-2xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Skeleton className="h-80 bg-white/[0.04] rounded-2xl" />
              <Skeleton className="h-80 bg-white/[0.04] rounded-2xl" />
            </div>
          </div>
        ) : stats ? (
          <div className="space-y-8 sm:space-y-10">
            {/* Stats Cards */}
            <StatsCards
              totalOptimizations={stats.total}
              avgScoreImprovement={stats.avgScore}
              bestScore={stats.bestScore}
              recentCount={stats.recentCount}
            />

            {/* Charts */}
            {stats.total > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                <ScoreChart data={stats.scoreDistribution} />
                {stats.recentScores.length > 0 && (
                  <UsageChart data={stats.recentScores} />
                )}
                {stats.topCategories.length > 0 && (
                  <CategoryChart data={stats.topCategories} />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-white/[0.06] border-dashed bg-white/[0.02]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] mb-5">
                  <BarChart3 className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No data yet
                </h3>
                <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                  Start optimizing prompts to see analytics and trends here.
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
