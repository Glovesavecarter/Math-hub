import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

const start = () => {
  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = ReactDOM.createRoot(container);
    root.render(
      html`
        <${React.StrictMode}>
          <${App} />
        <//>
      `
    );
    
    // Attempt to dismiss loader once render is scheduled
    if (typeof (window as any).forceDismiss === 'function') {
      setTimeout((window as any).forceDismiss, 100);
    }
  } catch (err) {
    console.error("Mount Error:", err);
    if (typeof (window as any).forceDismiss === 'function') {
      (window as any).forceDismiss();
    }
  }
};

if (document.readyState === 'complete') {
  start();
} else {
  window.addEventListener('load', start);
}