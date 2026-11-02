"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface UsageChartProps {
  data: { date: string; original: number; optimized: number }[];
}

export function UsageChart({ data }: UsageChartProps) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Original Score",
        data: data.map((d) => d.original),
        borderColor: "rgba(239, 68, 68, 0.8)",
        backgroundColor: "rgba(239, 68, 68, 0.08)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgba(239, 68, 68, 1)",
      },
      {
        label: "Optimized Score",
        data: data.map((d) => d.optimized),
        borderColor: "rgba(16, 185, 129, 0.8)",
        backgroundColor: "rgba(16, 185, 129, 0.08)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#94a3b8", usePointStyle: true, pointStyle: "circle" as const },
      },
      tooltip: {
        backgroundColor: "rgba(11, 13, 23, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "#94a3b8",
        padding: 12,
        cornerRadius: 12,
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b" },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 100,
        ticks: { color: "#64748b", stepSize: 20 },
        grid: { color: "rgba(255,255,255,0.04)" },
        border: { display: false },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111427] p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-white mb-4">Score Trends</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
