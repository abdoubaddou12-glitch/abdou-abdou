
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React Render Error:", error);
    const overlay = document.getElementById('error-overlay');
    const msg = document.getElementById('error-message');
    if(overlay && msg) {
      overlay.style.display = 'block';
      msg.textContent = error instanceof Error ? error.stack : String(error);
    }
  }
}
