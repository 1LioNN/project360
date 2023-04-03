import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Auth0ProviderWithNav from "./Auth0ProviderWithNav.jsx";
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNav>
        <App />
      </Auth0ProviderWithNav>
    </BrowserRouter>
  </React.StrictMode>
);
