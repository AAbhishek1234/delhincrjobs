import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from "./context/AuthContext";
import { LoaderProvider } from "./pages/LoderContext"; // ✅ adjust path as needed

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </AuthProvider>
  </React.StrictMode>
);
