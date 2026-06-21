import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../state_management/AuthContext";
import Loader from "../components/commonComponents/Loader";

function PublicRoute() {
  const { user } = useAuth();

  if (user === null) {
    return <Loader />;
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;
