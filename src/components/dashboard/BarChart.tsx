import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, Point } from "chart.js";

type BarChartProps = {
  data: ChartData<"bar", (number | Point | null)[], unknown> | null;
  title: string;
  indexAxis?: "x" | "y";
  stacked?: boolean;
};

const BarChart = ({
  data,
  title,
  indexAxis = "x",
  stacked = false,
}: BarChartProps) => {
  if (!data) {
    return <p className="text-center text-white mt-10">No data available</p>;
  }

  return (
    <Bar
      data={data}
      options={{
        indexAxis,
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
          x: {
            stacked,
            ticks: {
              color: "#FFFFFF",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
          y: {
            stacked,
            beginAtZero: true,
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

export default BarChart;
