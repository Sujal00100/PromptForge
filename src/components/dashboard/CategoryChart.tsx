"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  data: { name: string; count: number }[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  const colors = [
    { bg: "rgba(139, 92, 246, 0.7)", border: "rgba(139, 92, 246, 1)" },
    { bg: "rgba(6, 182, 212, 0.7)", border: "rgba(6, 182, 212, 1)" },
    { bg: "rgba(16, 185, 129, 0.7)", border: "rgba(16, 185, 129, 1)" },
    { bg: "rgba(245, 158, 11, 0.7)", border: "rgba(245, 158, 11, 1)" },
    { bg: "rgba(239, 68, 68, 0.7)", border: "rgba(239, 68, 68, 1)" },
    { bg: "rgba(236, 72, 153, 0.7)", border: "rgba(236, 72, 153, 1)" },
    { bg: "rgba(99, 102, 241, 0.7)", border: "rgba(99, 102, 241, 1)" },
    { bg: "rgba(168, 85, 247, 0.7)", border: "rgba(168, 85, 247, 1)" },
  ];

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: data.map((_, i) => colors[i % colors.length].bg),
        borderColor: data.map((_, i) => colors[i % colors.length].border),
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#94a3b8",
          usePointStyle: true,
          pointStyle: "circle" as const,
          padding: 16,
          font: { size: 11 },
        },
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
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111427] p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-white mb-4">Improvement Categories</h3>
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
