import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

// CRITICAL: Initialize process.env polyfill BEFORE any other execution
if (typeof window['process'] === 'undefined') {
  window['process'] = { 
    env: { 
      API_KEY: window['_env_']?.API_KEY || '' 
    } 
  };
}

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
    
    // Dismiss the loading overlay after the initial render is queued
    if (window['dismissLoader']) {
      setTimeout(() => window['dismissLoader'](), 300);
    }
  } catch (err) {
    console.error("Critical System Failure during Mount:", err);
    // Even if it fails, try to show whatever rendered or at least hide the loader
    if (window['dismissLoader']) window['dismissLoader']();
  }
};

// Execute boot protocol
mount();