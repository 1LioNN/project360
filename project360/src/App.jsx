import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/HomePage";
import EditPage from "./pages/EditPage";

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <div className="App h-full">
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <Home />
        </>
      )}
    </div>
  );
}

export default App;

