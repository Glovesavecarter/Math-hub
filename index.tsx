import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

console.log("Kernel: Initializing Tactical Engine V13 (Strict Mode)...");

const start = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("FATAL: Root element missing from DOM.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      html`
        <${React.StrictMode}>
          <${App} />
        <//>
      `
    );
    
    // Auto-dismiss the loader after React has had a chance to mount
    // Using a slightly longer delay to ensure the DOM is ready for interaction
    setTimeout(() => {
        if (typeof (window as any).dismissLoader === 'function') {
            (window as any).dismissLoader();
        }
    }, 600);
  } catch (err) {
    console.error("KERNEL_PANIC: React mounting failed", err);
    // If we crash here, the user can still use the "Force Launch" button
  }
};

// Fire boot sequence when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}