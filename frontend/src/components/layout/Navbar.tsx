import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "./Navbar.css";

/**
 * Top navigation bar shown on every protected page.
 * Shows the current user's name and lets them log out from anywhere.
 */
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar__brand">
        <span className="navbar__mark">⚡</span>
        Apollo Grid
      </Link>

      <div className="navbar__right">
        {user && <span className="navbar__user">{user.name}</span>}
        <button type="button" className="navbar__logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
