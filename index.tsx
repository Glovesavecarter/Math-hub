import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

console.log("Kernel Init: STABLE_V11");

const mount = () => {
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
    
    // Auto-dismiss the loader after a short delay to allow React to paint the first frame
    setTimeout(() => {
        if (typeof window['dismissLoader'] === 'function') {
            window['dismissLoader']();
        }
    }, 500);
  } catch (err) {
    console.error("Critical Kernel Error during mount:", err);
    // If mount fails, we don't clear the loader automatically to prevent showing a broken UI
    // but the manual Force Launch button in index.html is still available.
  }
};

// Handle boot sequence
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mount();
} else {
  document.addEventListener('DOMContentLoaded', mount);
}