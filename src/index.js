import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Bar from './components/Bar';
import Chat from './components/chat/chat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

