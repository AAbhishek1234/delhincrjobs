import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { LoaderProvider } from './pages/LoderContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <LoaderProvider>  <React.StrictMode>
    <App />
  </React.StrictMode></LoaderProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
