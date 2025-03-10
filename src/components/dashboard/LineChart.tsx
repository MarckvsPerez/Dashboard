import React from "react";
import { Line } from "react-chartjs-2";
import { ChartData, Point } from "chart.js";

type LineChartProps = {
  data: ChartData<"line", (number | Point | null)[], unknown> | null;
  title: string;
};

const LineChart = ({ data, title }: LineChartProps) => {
  if (!data) {
    return <p className="text-center text-white mt-10">No data available</p>;
  }

  const cleanDatasets = () => {
    if (!data.datasets) return [];

    return data.datasets.map((dataset) => {
      const cleanData = Array.isArray(dataset.data)
        ? dataset.data.map((point) => {
            if (point === undefined) return null;
            return point;
          })
        : [];

      return {
        ...dataset,
        data: cleanData,
        tension: 0,
        spanGaps: true,
        cubicInterpolationMode: "monotone" as const,
        borderJoinStyle: "round" as const,
      };
    });
  };

  const safeData: ChartData<"line", (number | Point | null)[], unknown> = {
    labels: data.labels || [],
    datasets: cleanDatasets(),
  };

  return (
    <Line
      data={safeData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#FFFFFF",
            },
          },
          title: {
            display: true,
            text: title,
            color: "#FFFFFF",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#FFFFFF",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
          x: {
            ticks: {
              color: "#FFFFFF",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
      }}
    />
  );
};

export default LineChart;
