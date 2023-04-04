import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const root = ReactDOM.createRoot(document.getElementById("root"));

Sentry.init({
  dsn: "https://782bfb72d6064a268f8e49e61108d5a0@o4504925006594048.ingest.sentry.io/4504957411983360",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri : window.location.origin + "/dashboard"
      }}
    >
      <App />
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
  );

