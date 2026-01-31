import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import MathHubApp from './App.tsx';

const html = htm.bind(React.createElement);

let root: ReactDOM.Root | null = null;

const mount = () => {
  const rootElement = document.getElementById('root');
  if (rootElement && !root) {
    root = ReactDOM.createRoot(rootElement);
    root.render(
      html`
        <${React.StrictMode}>
          <${MathHubApp} />
        <//>
      `
    );
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}