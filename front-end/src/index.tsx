import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrProvider } from './providers/ErrProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrProvider>
      <App />
    </ErrProvider>
  </React.StrictMode>
);
