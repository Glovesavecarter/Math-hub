import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

console.log("System Initializing: Command V5");

// Ensure process.env is polyfilled at the root level
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
    
    // Hide loader if React succeeds
    if (window['dismissLoader']) {
      setTimeout(() => window['dismissLoader'](), 500);
    }
  } catch (err) {
    console.error("Critical Render Failure:", err);
    rootElement.innerHTML = `
      <div style="padding: 100px; text-align: center; color: white; font-family: 'Orbitron', sans-serif;">
        <h1 style="color: #6366f1;">BOOT_ERROR</h1>
        <p style="opacity: 0.5; font-size: 12px; margin-top: 20px;">CRITICAL SYSTEM FAULT: CHECK CONSOLE</p>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 12px 24px; background: #6366f1; border: none; border-radius: 8px; color: white; cursor: pointer; font-family: 'Orbitron'; text-transform: uppercase;">REBOOT_SYSTEM</button>
      </div>
    `;
    if (window['dismissLoader']) window['dismissLoader']();
  }
};

// Fire when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}