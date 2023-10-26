import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "./Authentication";

function PrivateRoute() {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
