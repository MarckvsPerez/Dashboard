import React from "react";

type LoadingErrorProps = {
  loading: boolean;
  error: string | null;
};

const LoadingError = ({ loading, error }: LoadingErrorProps) => {
  if (loading) {
    return (
      <div className="py-12 flex justify-center h-screen">
        <p className="text-gray-600">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return null;
};

export default LoadingError;
