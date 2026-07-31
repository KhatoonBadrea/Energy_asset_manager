import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Wraps any page that requires authentication.
 * While AuthContext is still checking localStorage on first load, we show
 * nothing yet (to avoid a flash of the login page for an already-logged-in user).
 * Once loading is done, we either render the page or redirect to /login.
 */
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
