import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { enablePush } from '../../services/pushService';
import './NavBar.css';

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    closeMenu();
    navigate('/');
  };

  const handleEnablePush = async () => {
    try { await enablePush(); } catch (e) {}
    closeMenu();
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brandRow">
          <img src="/Logo.jpeg" alt="Qurbatan Logo" className="app-logo" />
          <Link to="/" className="nav__brand" onClick={closeMenu}>
            Qurbatan Ella Allah
          </Link>

          <button
            className="nav__burger"
            aria-label="Toggle menu"
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          <Link to="/" onClick={closeMenu}>Vehicles</Link>
          {user && <Link to="/my-vehicles" onClick={closeMenu}>My Vehicles</Link>}
          {user && <Link to="/bookings/my" onClick={closeMenu}>My Bookings</Link>}
          {user && <Link to="/bookings/manage" onClick={closeMenu}>Manage</Link>}
          {user && <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>}

          <div className="nav__actions">
            {user ? (
              <>
                <button className="btn btn--success" onClick={handleEnablePush}>
                  Enable Notifications
                </button>
                <button className="btn btn--danger" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-in" onClick={closeMenu}>Sign In</Link>
                <Link to="/sign-up" onClick={closeMenu}>Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}