import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';
import PrivateRoute from './privateRoute';
import Dashboard from '../page/dashboard';
import Notification from '../page/notification';
import Splash from '../page/splash';
import Login from '../page/login';
import Signup from '../page/signup';
import User from '../page/user';
import Home from '../page/home';
import CourseSelection from '../page/courseSelection';
import Onboarding from '../page/onboarding';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/course-selection" element={<PrivateRoute><CourseSelection /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/notification" element={<PrivateRoute><Notification /></PrivateRoute>} />
          <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;