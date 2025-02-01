import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);
createRoot(mountPoint).render(<App />);
