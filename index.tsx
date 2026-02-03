import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

const start = () => {
  console.log("Kernel: Initializing Hub...");
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical Error: Root element not found.");
    return;
  }

  // Define dismiss function for safety
  const dismissLoader = () => {
    const loader = document.getElementById('emergency-loader');
    if (loader) {
      loader.style.display = 'none';
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  };

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      html`
        <${React.StrictMode}>
          <${App} />
        <//>
      `
    );
    
    // Handshake: Dismiss overlay after a short delay to allow first paint
    setTimeout(dismissLoader, 200);
    
  } catch (error) {
    console.error("Critical Mount Error:", error);
    // If React fails to render, we still want the user to see the page state
    dismissLoader();
  }
};

// Start boot sequence when ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    start();
} else {
    window.addEventListener('DOMContentLoaded', start);
}