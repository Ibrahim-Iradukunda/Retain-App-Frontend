import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "./api";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem("retain-user") ?? "null") as User | null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("retain-token"));

  const signIn = useCallback((nextToken: string, nextUser: User) => {
    localStorage.setItem("retain-token", nextToken);
    localStorage.setItem("retain-user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("retain-token");
    localStorage.removeItem("retain-user");
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    window.addEventListener("retain:unauthorized", signOut);
    return () => window.removeEventListener("retain:unauthorized", signOut);
  }, [signOut]);

  const value = useMemo(() => ({ user: token ? user : null, token, signIn, signOut }), [user, token, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider.");
  return context;
}
