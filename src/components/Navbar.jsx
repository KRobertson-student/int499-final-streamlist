import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'StreamList', path: '/' },
  { label: 'Movies', path: '/movies' },
  { label: 'Cart', path: '/cart' },
  { label: 'Cards', path: '/cards' },
  { label: 'About', path: '/about' },
];

function Navbar({ authSession, onSignOut }) {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="brand">
          <h1 className="brand__title">StreamList</h1>
          <p className="brand__subtitle">Final StreamList capstone project</p>
        </div>

        <div className="navbar__actions">
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link--active' : 'nav-link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {authSession ? (
            <div className="auth-summary" aria-label="Signed in user">
              <span className="auth-user">
                <span className="material-symbols-rounded" aria-hidden="true">
                  account_circle
                </span>
                {authSession.name}
              </span>
              <button
                className="icon-btn auth-signout"
                type="button"
                aria-label="Sign out"
                title="Sign out"
                onClick={onSignOut}
              >
                <span className="material-symbols-rounded" aria-hidden="true">
                  logout
                </span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
