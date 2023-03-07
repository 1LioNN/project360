import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/HomePage";
import logo from "./icons/360.png";

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <main className="App">
        <header className="AppHeader">
            <img src={logo} className="AppLogo" alt="logo" />
        </header>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          {/* <LoginButton />
          <LogoutButton /> */}
         {/* <Profile /> */}
          <Home />
        </>
      )}
    </main>
  );
}

export default App;

