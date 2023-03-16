import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/EditPage";
import { Routes, Route } from "react-router-dom";

function App() {
  const { isLoading, error } = useAuth0();
  console.log("SLEEP")
  console.log(isLoading)
  console.log(error)
  return (
    <div className="App h-full">
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit/:roomId" element={<Edit />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

