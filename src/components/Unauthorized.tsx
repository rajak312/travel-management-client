// pages/Unauthorized.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const Unauthorized: React.FC<{ requiredRole?: string }> = ({
  requiredRole,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <div className="flex justify-center mb-4 text-red-500">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          You are not authorized to view this page.
          {requiredRole && (
            <span>
              {" "}
              Please log in with a{" "}
              <span className="font-semibold">{requiredRole}</span> account.
            </span>
          )}
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
