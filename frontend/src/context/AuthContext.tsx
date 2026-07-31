import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User, LoginPayload, RegisterPayload } from "../types/auth.types";
import * as authService from "../services/auth/authService";

// This describes everything the AuthContext exposes to the rest of the app:
// the current user, whether we're still checking auth on startup, and the
// three actions any component can trigger (login, register, logout).
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

// The context itself starts as `undefined` - this forces every component
// that uses it to go through the useAuth hook (built in the next file),
// which throws a clear error if used outside the provider instead of a silent bug.
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Wraps the entire app and makes authentication state available everywhere.
 * On first load, it checks localStorage for a previously saved user,
 * so refreshing the page doesn't log the user out.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Runs once when the app first mounts.
  // We don't have a "get current user" endpoint yet, so for now we simply
  // restore the user object we saved in localStorage during the last login.
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  /**
   * Log in an existing user: call the API, then persist both the token
   * (used by the Axios interceptor) and the user object (used to restore
   * the session after a page refresh).
   */
  async function login(payload: LoginPayload) {
    const response = await authService.login(payload);

    localStorage.setItem("auth_token", response.token);
    localStorage.setItem("auth_user", JSON.stringify(response.user));
    setUser(response.user);
  }

  /**
   * Register a new user. The backend already logs the user in by returning
   * a token, so we reuse the exact same persistence logic as login.
   */
  async function register(payload: RegisterPayload) {
    const response = await authService.register(payload);

    localStorage.setItem("auth_token", response.token);
    localStorage.setItem("auth_user", JSON.stringify(response.user));
    setUser(response.user);
  }

  /**
   * Log out: tell the backend to revoke the token, then always clear local
   * state regardless of whether the API call succeeded (e.g. token already expired).
   */
  async function logout() {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      setUser(null);
    }
  }

  const value: AuthContextType = { user, isLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
