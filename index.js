import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import MathHubApp from './App.js';

const html = htm.bind(React.createElement);

const mount = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) return;

    const root = ReactDOM.createRoot(rootElement);
    root.render(html`
      <${React.StrictMode}>
        <${MathHubApp} />
      <//>
    `);
    console.log("Math Hub Bootstrapped Successfully.");
  } catch (err) {
    console.error("Critical mounting error:", err);
  }
};

mount();