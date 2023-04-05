import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import Auth0ProviderWithNav from "./Auth0ProviderWithNav.jsx";
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const root = ReactDOM.createRoot(document.getElementById("root"));

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNav>
        <App />
      </Auth0ProviderWithNav>
    </BrowserRouter>
  </React.StrictMode>
);
