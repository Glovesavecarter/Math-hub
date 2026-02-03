import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

const boot = () => {
  console.log("Kernel: Initializing Tactical UI...");
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
    
    // Handshake: Dismiss the loader once React has painted
    setTimeout(() => {
      if (typeof (window as any).dismissLoader === 'function') {
        (window as any).dismissLoader();
      }
    }, 500);
  } catch (err) {
    console.error("Kernel Panic during mount:", err);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}