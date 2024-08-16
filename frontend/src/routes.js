import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginRegisterForm from './components/Login/Login';
// Import other components/pages

const Routes = () => (
  <Router>
    <Routes>
      <Route path="/" component={Login} />
      {/* Add other routes here */}
    </Routes>
  </Router>
);

export default Routes;
