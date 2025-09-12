import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logoutReason } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    if (logoutReason === "manual") {
      return <Navigate to="/" replace />;
    }
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  // Allow both styles: with children OR with nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
