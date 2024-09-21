
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole = 'admin' }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("ProtectedRoute: Checking user role", user?.role);

  if (!user || user.role !== requiredRole) {
    console.log("ProtectedRoute: Unauthorized access, redirecting to login");
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};


export default PrivateRoute;
