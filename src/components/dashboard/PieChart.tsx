import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartData, Point } from "chart.js";

type PieChartProps = {
  data: ChartData<"pie", (number | Point | null)[], unknown> | null;
  title: string;
};

const PieChart = ({ data, title }: PieChartProps) => {
  if (!data) {
    return <p className="text-center text-white mt-10">No data available</p>;
  }

  return (
    <Pie
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
      }}
    />
  );
};

export default PieChart;
