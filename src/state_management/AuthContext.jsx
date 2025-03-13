import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for user in localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(false);
    }
  }, []);

  // Function to handle login
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(false);
    toast.success("logout successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
