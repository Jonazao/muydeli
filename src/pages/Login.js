import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { setAuth } from '../features/auth/authSlice';
import { HOME_URL } from '../config/configureRoutes';
import Button from '@mui/material/Button';

export default function Login() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  const dispatch = useDispatch();
  const handleOnLoginClick = () => {
    dispatch(setAuth({ isAuthenticated: true }));
  };

  if (isAuthenticated) {
    if (location.state) {
      return <Navigate to={location.state.from.pathname} />;
    } else {
      return <Navigate to={HOME_URL} />;
    }
  }

  return <Button onClick={handleOnLoginClick}>Login</Button>;
}
