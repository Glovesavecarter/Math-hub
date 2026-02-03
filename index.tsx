import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

console.log("System Initializing: Command V8 (React 18 Stable)");

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
    
    // Auto-dismiss the loader after React takes over
    setTimeout(() => {
        if (window['dismissLoader']) window['dismissLoader']();
    }, 500);
  } catch (err) {
    console.error("Critical Render Failure:", err);
    if (window['dismissLoader']) window['dismissLoader']();
  }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mount();
} else {
  document.addEventListener('DOMContentLoaded', mount);
}