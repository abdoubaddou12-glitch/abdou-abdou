
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (err) {
    console.error("Critical rendering error:", err);
    rootElement.innerHTML = "<div style='color:white; text-align:center; padding-top:50px;'>فشل تحميل التطبيق. يرجى تحديث الصفحة.</div>";
  }
} else {
  console.error("Fatal: Root element not found.");
}
