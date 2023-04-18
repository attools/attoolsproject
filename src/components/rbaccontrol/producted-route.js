import { Navigate } from "react-router";
import { useFetchCollection } from "../getfirebasedata";
import _ from "lodash";

function ProtectedRoute({ children }) {
  const { fbdbdata: Logindata } = useFetchCollection("loginDetails");
  console.log("producted routes",Logindata);
  const loggedIn = !_.isNil(Logindata) ? Logindata[0].loggedin: true;
  console.log("loggedIn",loggedIn);
  if (!loggedIn) {
    return <Navigate to="/" />;
  }
  if (loggedIn) {
    <Navigate to="/home" />;
    return children;
  }
}

export default ProtectedRoute;
