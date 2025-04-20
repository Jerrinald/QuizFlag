import { createContext, useContext, useState, useEffect } from "react";
import { decodeToken } from "react-jwt";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [role, setRole] = useState([]);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("bestScore");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("id");
    setUsername("");
    setRole([])
  };

  // Function to check if the token is expired
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      logout();
      return;
    }

    try {
      const decodedToken = decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
      if (decodedToken.exp < currentTime) {
        logout();
      } else {        
        setRole(decodedToken.roles || []);
      }
    } catch (error) {
      console.error("Invalid token", error);
      logout();
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    checkTokenExpiration(); // Check immediately
    const interval = setInterval(checkTokenExpiration, 50000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ username, setUsername, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
