import { Link, NavLink } from "react-router";
import Logo from "./logo";
import { useAuth } from "../context/authContext";
function Navbar() {
  const { user } = useAuth();
  return (
    <nav
      className="navbar navbar-expand-md bg-danger"
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <Link className="Navbar-brand text-white" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarExample04"
          aria-controls="navbarExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/">
                Home
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            {user ? (
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/sign-out">
                  Sign out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/register">
                    register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/sign-in">
                    Sign in
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
