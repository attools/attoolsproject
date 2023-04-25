import { Navigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../App";

function ProtectedRoute({ children }) {
  const { Logindata } = useContext(AppContext)
  const loggedIn = Logindata ? Logindata[0].loggedin: false;
  if (loggedIn === false) {
    return <Navigate to="/" />;
  }
  else if (loggedIn === true) {
    return children;
  }
}

export default ProtectedRoute;
