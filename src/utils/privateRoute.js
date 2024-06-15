import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../utils/auth';

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className='loading'>
        <h2>Loading...</h2>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;