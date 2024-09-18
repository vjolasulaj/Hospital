
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');
  const location = useLocation();

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
