import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import ProtectedRoute from "./ProtectedRoute";

/**
 * Central map of every URL in the app.
 * Public routes (login, register) are open to anyone.
 * Private routes (dashboard, project details) are wrapped in ProtectedRoute,
 * which redirects to /login if there is no authenticated user.
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetailsPage />
          </ProtectedRoute>
        }
      />

      {/* Default redirect: any unknown path goes to the dashboard,
          which itself redirects to /login if the user isn't authenticated */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
