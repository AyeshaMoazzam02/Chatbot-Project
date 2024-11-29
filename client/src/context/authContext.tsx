import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

// Default implementation to avoid null
const defaultContextValue: AuthContextType = {
  user: null,
  setUser: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userProfile");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
