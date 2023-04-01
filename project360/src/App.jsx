import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/EditPage";
// import Test from "./pages/test_yjs.js";
import { Routes, Route } from "react-router-dom";

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <p>Authentication Error</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:roomId" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
