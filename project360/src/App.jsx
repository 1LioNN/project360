import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/EditPage";
import NotFound from "./pages/NotFound";
// import Test from "./pages/test_yjs.js";
import { Routes, Route} from "react-router-dom";

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
            <Route path="/dashboard/:filter" element={<Dashboard />} />
            <Route path="/edit/:roomId" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

