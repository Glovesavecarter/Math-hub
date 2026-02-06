import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

const startEngine = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  const reveal = () => {
    if (typeof (window as any).forceDismiss === 'function') {
      (window as any).forceDismiss();
    }
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
    
    // Tiny delay to allow React to mount its first frame before hiding loader
    requestAnimationFrame(() => {
      setTimeout(reveal, 150);
    });
    
  } catch (error) {
    console.error("Mount error:", error);
    reveal(); // Ensure loader is gone so user can see errors or attempt bypass
  }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startEngine);
} else {
    startEngine();
}