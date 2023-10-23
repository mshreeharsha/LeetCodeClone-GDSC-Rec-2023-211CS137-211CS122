import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { UserCodeContextProvider } from './context/UserCodeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <UserCodeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </UserCodeContextProvider>
  </AuthContextProvider>
);

