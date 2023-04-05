import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/EditPage";
import Credits from "./pages/CreditsPage";
import AuthGuard from "./components/AuthGuard";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
import { Routes, Route } from "react-router-dom";
import * as Sentry from "@sentry/react";

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <p>Authentication Error</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:filter" element={<Dashboard />} />
        <Route path="/edit/:roomId" element={<Edit />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Sentry.withProfiler(App);
