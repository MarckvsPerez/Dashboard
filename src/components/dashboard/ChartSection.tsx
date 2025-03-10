import React from "react";

type ChartSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const ChartSection = ({
  title,
  children,
  className = "grid grid-cols-1 md:grid-cols-2 gap-6",
}: ChartSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className={className}>{children}</div>
    </div>
  );
};

export default ChartSection;
