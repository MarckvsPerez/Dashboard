import React from "react";

type LoadingErrorProps = {
  loading: boolean;
  error: string | null;
};

/**
 * Component to handle loading and error states
 * @param loading - Whether data is currently loading
 * @param error - Error message if any
 */
const LoadingError = ({ loading, error }: LoadingErrorProps) => {
  if (loading) {
    return (
      <div className="py-12 flex justify-center">
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
