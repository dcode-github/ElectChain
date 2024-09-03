import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './components/Login/Login';
import UserDashboard from './components/UserDashboard/UserDashboard';
import './index.css'; 
const App = () => {
  const routes = [
    { path: "/", element: <Login /> },
    { path: "/user-dashboard", element: <UserDashboard/>},
  ];

  return useRoutes(routes);
};

export default App;
