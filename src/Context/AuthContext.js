import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {jwtDecode} from 'jwt-decode'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [setUser,user]=useState('');
  const navigate=useNavigate();
  // login → save token to state + localStorage
  const login = (newToken) => {
    
    setToken(newToken);
   
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
  //   const decoded = jwtDecode(newToken);
  //  setUser(decoded);
  };

  // logout → clear token from state + localStorage
  const logout = () => {
    setToken(null);
   // setUser(null)
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate('/login',{replace:true})
  };

  // Keep state in sync if localStorage changes (multi-tab support)
  useEffect(() => {
    const handleStorage = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      setIsAuthenticated(!!storedToken);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
