import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthServer } from '../config/configureTemplate';
import { LOGIN_URL } from '../config/configureRoutes';

const ProtectedRouteWrap = ({ children }) => {
  if (!useAuthServer) {
    return children;
  }
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={LOGIN_URL} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRouteWrap;
