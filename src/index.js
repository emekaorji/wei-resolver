// src/content_scripts/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App.jsx';
import '../styles/global.scss'; // Automatically inject CSS

const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);
createRoot(mountPoint).render(<App />);
