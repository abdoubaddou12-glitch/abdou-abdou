
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Critical Render Error:", err);
    // محاولة إنقاذ أخيرة في حال فشل StrictMode
    const root = createRoot(rootElement);
    root.render(<App />);
  }
}
