import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

const boot = () => {
  console.log("Kernel: Initializing Tactical Command Hub...");
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
    
    // Handshake: Let the loader know React has taken control
    const triggerDismissal = () => {
      if (typeof (window as any).dismissLoader === 'function') {
        (window as any).dismissLoader();
      }
    };

    // Fast reveal once mounting begins
    requestAnimationFrame(() => {
        setTimeout(triggerDismissal, 400);
    });
    
  } catch (err) {
    console.error("Mounting Failure:", err);
    // Even if React fails, we show the screen so the user sees the 404/Error UI
    if (typeof (window as any).dismissLoader === 'function') {
        (window as any).dismissLoader();
    }
  }
};

// Start as soon as possible
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}