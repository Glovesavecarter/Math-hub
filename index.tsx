import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

console.log("Kernel: Initializing Tactical Engine V12...");

const start = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      html`
        <${React.StrictMode}>
          <${App} />
        <//>
      `
    );
    
    // Attempt to dismiss loader as soon as React has processed the tree
    // We use a small buffer to ensure the first paint of the UI is ready
    setTimeout(() => {
        if (typeof window['dismissLoader'] === 'function') {
            window['dismissLoader']();
        }
    }, 400);
  } catch (err) {
    console.error("KERNEL_PANIC: React mounting failed", err);
  }
};

// Fire boot sequence
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}