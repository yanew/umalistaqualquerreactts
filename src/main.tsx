import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/global.css';

import { AppRouter } from './pages/AppRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)

