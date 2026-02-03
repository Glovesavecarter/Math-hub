import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

const startEngine = () => {
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
    
    // Auto-dismiss the loader once React kicks in
    setTimeout(() => {
      if (typeof (window as any).dismissLoader === 'function') {
        (window as any).dismissLoader();
      }
    }, 500);
  } catch (err) {
    console.error("Critical Engine Failure:", err);
  }
};

// Handle both direct and deferred load
if (document.readyState === 'complete') {
  startEngine();
} else {
  window.addEventListener('load', startEngine);
}