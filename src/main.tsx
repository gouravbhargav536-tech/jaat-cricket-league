// Workaround to prevent "TypeError: Cannot set property fetch of #<Window> which has only a getter"
try {
  const currentFetch = window.fetch;
  const patch = {
    get() {
      return currentFetch;
    },
    set(value: any) {
      (window as any)._customFetch = value;
    },
    configurable: true,
    enumerable: true,
  };
  try {
    Object.defineProperty(window, 'fetch', patch);
  } catch (e) {}
  try {
    Object.defineProperty(Window.prototype, 'fetch', patch);
  } catch (e) {}
} catch (e) {
  console.warn("Could not patch window.fetch:", e);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
