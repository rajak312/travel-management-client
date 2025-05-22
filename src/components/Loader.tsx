import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center mb-6">
      <span className="animate-spin rounded-full h-6 w-6 border-2 border-t-2 border-indigo-500"></span>
      <span className="ml-2 text-indigo-500 text-sm">Loading...</span>
    </div>
  );
};

export default Loader;
