import { createContext, useContext, useState } from "react";
import api from "../services/api";
import { clearStoredAuth, getStoredAuth, saveStoredAuth } from "../stores/authStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getStoredAuth().user);

  const setUser = (nextUser) => {
    setUserState(nextUser);

    if (nextUser) {
      saveStoredAuth(nextUser);
      return;
    }

    clearStoredAuth();
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Local auth state is still the source of truth for the assignment flow.
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading: false,
    isAuthenticated: Boolean(user),
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
