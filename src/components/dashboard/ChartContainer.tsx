import React from "react";

type ChartContainerProps = {
  title: string;
  children: React.ReactNode;
  height?: string;
};

const ChartContainer = ({
  title,
  children,
  height = "h-80",
}: ChartContainerProps) => {
  return (
    <div className="rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className={height}>{children}</div>
    </div>
  );
};

export default ChartContainer;
