import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [logoutReason, setLogoutReason] = useState(null); // "manual" | "forced"

  useEffect(() => {
    setIsAuthenticated(!!token);
    if (token) {
      localStorage.setItem("token", token);
   
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
 const login = (newToken) => {
    setToken(newToken);
     setLogoutReason(null);
    setUser(jwtDecode( newToken));
  };
  // Unified logout function
 const logout = (reason = "manual") => {
    setToken(null);
    setIsAuthenticated(false);
    setLogoutReason(reason);
    localStorage.removeItem("token");
  };

  // Listen for logout events from other tabs/windows
  useEffect(() => {
    const handleLogoutEvent = (e) => {
      const forced = e.detail?.forced;
      logout({ forced });
    };

    window.addEventListener("logout", handleLogoutEvent);
    return () => window.removeEventListener("logout", handleLogoutEvent);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, setToken, setUser, logout, login,logoutReason  }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
