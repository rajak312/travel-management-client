import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("TRAVEL_USER");
    const storedToken = localStorage.getItem("TRAVEL_ACCESS_TOKEN");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else {
      const publicRoutes = ["/login", "/signup", "/oauth-success", "/"];
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate]);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("TRAVEL_USER", JSON.stringify(user));
    localStorage.setItem("TRAVEL_ACCESS_TOKEN", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("TRAVEL_USER");
    localStorage.removeItem("TRAVEL_ACCESS_TOKEN");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
