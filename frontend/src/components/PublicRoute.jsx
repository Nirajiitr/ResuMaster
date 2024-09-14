import React from 'react';
import useUser from '../hooks/useUser';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const PublicRoute = ({ children }) => {
  const { data, isLoading } = useUser();
  if(isLoading) return <Spinner />

  if (data) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
