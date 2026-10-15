import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against external extension message timeouts
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const msg = String(reason?.message || reason || '');
  if (msg.includes('chrome: call method') || msg.includes('timed out') || String(reason?.stack || '').includes('chrome-extension://')) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(<App />);

