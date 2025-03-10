import React from "react";
import { Radar } from "react-chartjs-2";
import { ChartData, Point } from "chart.js";

type RadarChartProps = {
  data: ChartData<"radar", (number | Point | null)[], unknown> | null;
  title: string;
};

const RadarChart = ({ data, title }: RadarChartProps) => {
  if (!data) {
    return <p className="text-center text-white mt-10">No data available</p>;
  }

  return (
    <Radar
      data={data}
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
          r: {
            angleLines: {
              display: true,
              color: "rgba(255, 255, 255, 0.2)",
            },
            suggestedMin: 0,
            grid: {
              color: "rgba(255, 255, 255, 0.2)",
            },
            ticks: {
              color: "#FFFFFF",
              backdropColor: "transparent",
            },
            pointLabels: {
              color: "#FFFFFF",
            },
          },
        },
      }}
    />
  );
};

export default RadarChart;
