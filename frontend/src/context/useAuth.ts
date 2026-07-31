import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Custom hook that gives any component access to the current user and
 * the login/register/logout actions. Throws a clear error if a component
 * tries to use it outside of <AuthProvider>, instead of failing silently.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
