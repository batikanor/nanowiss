import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const redirectedPath = sessionStorage.getItem('nanowiss.redirect');
if (redirectedPath) {
  sessionStorage.removeItem('nanowiss.redirect');
  window.history.replaceState(null, '', redirectedPath);
} else {
  const redirectParam = new URLSearchParams(window.location.search).get('redirect');
  if (redirectParam && redirectParam.startsWith('/')) {
    window.history.replaceState(null, '', redirectParam);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
