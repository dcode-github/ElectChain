import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './components/Login/Login';
import './index.css'; 
const App = () => {
  const routes = [
    { path: "/", element: <Login /> },
    // Add other routes here
  ];

  return useRoutes(routes);
};

export default App;
