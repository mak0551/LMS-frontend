import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../state_management/AuthContext";
import Loader from "../components/commonComponents/Loader";

function PrivateRoute() {
  const { user } = useAuth();

  if (user === null) {
    return <Loader />;
  }

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
}

export default PrivateRoute;
