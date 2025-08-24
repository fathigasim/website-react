import { useEffect } from "react";
import { Navigate, useLocation,useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
export default function ProtectedRoute({ children }) {
  
  const location = useLocation();
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();
 



  if (!isAuthenticated) {
    // Redirect to the login page, but save the current location they were trying to go to
    // This allows us to redirect them back after they log in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
  }
  


