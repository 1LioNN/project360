import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
        <div className="bg-indigo-900 ease-in-out duration-75 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800">
          <button onClick={() => logout()}>
            Sign Out
          </button>
        </div>
        )
    )
}

export default LogoutButton