import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

// Ensure process.env is available for the Gemini SDK
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
    
    // Signal to hide the loading overlay
    if (window['dismissLoader']) {
      setTimeout(() => window['dismissLoader'](), 300);
    }
  } catch (err) {
    console.error("Critical: Render Failure", err);
    if (window['dismissLoader']) window['dismissLoader']();
  }
};

mount();