import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Your main App component
import './index.css'; // Import Tailwind CSS

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your app with BrowserRouter */}
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
