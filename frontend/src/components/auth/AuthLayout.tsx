import type { ReactNode } from "react";
import "./AuthLayout.css";

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

/**
 * Shared visual shell for both the Login and Register pages.
 * Keeps the brand mark, signature waveform, and card styling in one place
 * so the two auth pages never drift out of sync visually.
 */
function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-brand__mark">⚡</span>
          <span className="auth-brand__name">Apollo Grid</span>
        </div>

        {/* Signature element: an animated waveform representing live energy monitoring */}
        <svg
          className="auth-wave"
          viewBox="0 0 320 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline
            className="auth-wave__line"
            points="0,20 40,20 55,6 70,34 85,20 130,20 145,10 160,30 175,20 320,20"
            fill="none"
          />
        </svg>

        <p className="auth-eyebrow">{eyebrow}</p>
        <h1 className="auth-title">{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>

        {children}

        <div className="auth-footer">{footer}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
