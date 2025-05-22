import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Unauthorized from "./Unauthorized";

const ProtectedRoute: React.FC<{ allowedRoles: string[] }> = ({
  allowedRoles,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Unauthorized />;
  }

  if (!user.role || !allowedRoles.includes(user.role)) {
    return <Unauthorized requiredRole={allowedRoles[0]} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
