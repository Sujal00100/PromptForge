"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ScoreChartProps {
  data: { range: string; count: number }[];
}

export function ScoreChart({ data }: ScoreChartProps) {
  const chartData = {
    labels: data.map((d) => d.range),
    datasets: [
      {
        label: "Prompts",
        data: data.map((d) => d.count),
        backgroundColor: [
          "rgba(239, 68, 68, 0.6)",
          "rgba(245, 158, 11, 0.6)",
          "rgba(6, 182, 212, 0.6)",
          "rgba(16, 185, 129, 0.6)",
          "rgba(139, 92, 246, 0.6)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(6, 182, 212, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
        ticks: { color: "#64748b", stepSize: 1 },
        grid: { color: "rgba(255,255,255,0.04)" },
        border: { display: false },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111427] p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-white mb-4">Score Distribution</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
