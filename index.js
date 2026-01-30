import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import MathHubApp from './App.js';

const html = htm.bind(React.createElement);

const mount = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(html`
      <${React.StrictMode}>
        <${MathHubApp} />
      <//>
    `);
    console.log("App mounted successfully");
  } catch (error) {
    console.error("Mounting error:", error);
    rootElement.innerHTML = `<div style="padding: 5rem; color: white; text-align: center; font-family: sans-serif;">
      <h1 style="font-size: 2rem; margin-bottom: 1rem;">SYSTEM INITIALIZATION FAILED</h1>
      <p style="opacity: 0.6;">Check browser console for detailed logs.</p>
    </div>`;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}