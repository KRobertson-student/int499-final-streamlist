import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
} from './authLogic.js';
import { getBrowserStorage } from './browserStorage.js';
import Navbar from './components/Navbar.jsx';
import StreamList from './pages/StreamList.jsx';
import Movies from './pages/Movies.jsx';
import Cart from './pages/Cart.jsx';
import Cards from './pages/Cards.jsx';
import Login from './pages/Login.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

function ProtectedRoute({ session, children }) {
  const location = useLocation();

  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

function App() {
  const [authSession, setAuthSession] = useState(() =>
    loadAuthSession(getBrowserStorage()),
  );

  const handleSignIn = (session) => {
    saveAuthSession(getBrowserStorage(), session);
    setAuthSession(session);
  };

  const handleSignOut = () => {
    clearAuthSession(getBrowserStorage());
    setAuthSession(null);
  };

  return (
    <div className="app-shell">
      {authSession ? (
        <Navbar authSession={authSession} onSignOut={handleSignOut} />
      ) : null}

      <main className="page-shell">
        <Routes>
          <Route
            path="/login"
            element={<Login session={authSession} onSignIn={handleSignIn} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute session={authSession}>
                <StreamList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute session={authSession}>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute session={authSession}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cards"
            element={
              <ProtectedRoute session={authSession}>
                <Cards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute session={authSession}>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute session={authSession}>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
