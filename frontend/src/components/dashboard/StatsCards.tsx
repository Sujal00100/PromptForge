"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Award, BarChart3, Activity } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  suffix?: string;
  gradient: string;
  glow: string;
}

function StatCard({ icon, label, value, suffix, gradient, glow }: StatCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const numValue = typeof value === "number" ? value : 0;

  useEffect(() => {
    if (typeof value !== "number") return;
    let start = 0;
    const duration = 1000;
    const step = Math.max(1, Math.ceil(numValue / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= numValue) {
        setAnimatedValue(numValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numValue, value]);

  return (
    <div className={`stagger-item rounded-2xl bg-gradient-to-br ${gradient} p-5 shadow-lg ${glow} hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-default`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2">
            {label}
          </p>
          <p className="text-3xl font-bold text-white tabular-nums">
            {typeof value === "number" ? animatedValue : value}
            {suffix && <span className="text-lg text-white/40 ml-1">{suffix}</span>}
          </p>
        </div>
        <div className="rounded-xl bg-white/10 p-2.5 backdrop-blur-sm border border-white/10">{icon}</div>
      </div>
    </div>
  );
}

interface StatsCardsProps {
  totalOptimizations: number;
  avgScoreImprovement: number;
  bestScore: number;
  recentCount: number;
}

export function StatsCards({
  totalOptimizations,
  avgScoreImprovement,
  bestScore,
  recentCount,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<BarChart3 className="h-5 w-5 text-white" />}
        label="Total Optimizations"
        value={totalOptimizations}
        gradient="from-violet-600 to-violet-800"
        glow="shadow-violet-500/15"
      />
      <StatCard
        icon={<TrendingUp className="h-5 w-5 text-white" />}
        label="Avg Score"
        value={avgScoreImprovement}
        suffix="/100"
        gradient="from-cyan-600 to-cyan-800"
        glow="shadow-cyan-500/15"
      />
      <StatCard
        icon={<Award className="h-5 w-5 text-white" />}
        label="Best Score"
        value={bestScore}
        suffix="/100"
        gradient="from-emerald-600 to-emerald-800"
        glow="shadow-emerald-500/15"
      />
      <StatCard
        icon={<Activity className="h-5 w-5 text-white" />}
        label="This Week"
        value={recentCount}
        gradient="from-pink-600 to-pink-800"
        glow="shadow-pink-500/15"
      />
    </div>
  );
}
