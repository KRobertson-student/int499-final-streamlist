import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  GOOGLE_CLIENT_ID,
  createDemoUser,
  decodeGoogleCredential,
} from '../authLogic.js';

const googleScriptUrl = 'https://accounts.google.com/gsi/client';

function Login({ session, onSignIn }) {
  const googleButtonRef = useRef(null);
  const [googleStatus, setGoogleStatus] = useState('Loading Google sign-in...');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const completeSignIn = useCallback(
    (nextSession) => {
      onSignIn(nextSession);
      navigate(from, { replace: true });
    },
    [from, navigate, onSignIn],
  );

  const handleGoogleCredential = useCallback(
    (response) => {
      try {
        completeSignIn(decodeGoogleCredential(response.credential));
      } catch {
        setError('Google sign-in returned an unreadable credential.');
      }
    },
    [completeSignIn],
  );

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleButtonRef.current) {
      setGoogleStatus('Google OAuth client ID is not configured.');
      return undefined;
    }

    let isMounted = true;

    const renderGoogleButton = () => {
      if (!isMounted || !globalThis.google?.accounts?.id) {
        return;
      }

      googleButtonRef.current.replaceChildren();
      globalThis.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: false,
      });
      globalThis.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
        shape: 'rectangular',
        width: 300,
      });
      setGoogleStatus('Use Google sign-in or the grading demo access below.');
    };

    if (globalThis.google?.accounts?.id) {
      renderGoogleButton();
      return () => {
        isMounted = false;
      };
    }

    const existingScript = document.querySelector(
      `script[src="${googleScriptUrl}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener('load', renderGoogleButton, { once: true });
    } else {
      const script = document.createElement('script');
      script.src = googleScriptUrl;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', renderGoogleButton, { once: true });
      script.addEventListener(
        'error',
        () => {
          if (isMounted) {
            setGoogleStatus('Google sign-in could not load.');
          }
        },
        { once: true },
      );
      document.head.append(script);
    }

    return () => {
      isMounted = false;
    };
  }, [handleGoogleCredential]);

  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="auth-page">
      <article className="panel auth-card">
        <p className="page-kicker">Secure Access</p>
        <h2 className="page-title">Sign in to open StreamList.</h2>
        <p className="page-copy">
          Management requested Google OAuth before users can access the final
          application. This screen keeps the main system behind authentication
          and supports the active Google OAuth client.
        </p>

        <div className="auth-actions">
          <div className="google-button-wrap" ref={googleButtonRef} />
          <p className="helper-text">{googleStatus}</p>
        </div>

        {error ? (
          <p className="message message--error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="auth-divider" aria-hidden="true">
          <span />
          <strong>or</strong>
          <span />
        </div>

        <button
          className="btn btn--secondary auth-demo-button"
          type="button"
          onClick={() => completeSignIn(createDemoUser())}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            admin_panel_settings
          </span>
          Continue with grading demo access
        </button>

        <p className="security-note">
          OAuth is currently limited to test users in Google Cloud. Demo access
          keeps the class submission reviewable without exposing private keys or
          requiring a grader to be added to the OAuth consent screen.
        </p>
      </article>
    </section>
  );
}

export default Login;
