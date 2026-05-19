# Final StreamList

Final StreamList is a routed React PWA that combines the StreamList watchlist, TMDB movie search, and EZTechMovie cart assignments into one capstone application.

The main application is protected by a Google-ready OAuth login screen. Because the OAuth consent screen is currently restricted to Google test users, a clearly labeled grading demo sign-in is also available so evaluators can open the finished system.

## Open the Application

[Open Final StreamList in your browser](https://krobertson-student.github.io/int499-final-streamlist/#/)

## Final Features

- StreamList manager with add, edit, delete, complete, filter, draft saving, duplicate prevention, and localStorage persistence
- TMDB movie search with poster-backed results, selected movie details, recent searches, and saved search state
- EZTechMovie cart with subscription plans, accessories, quantity controls, item removal, totals, and a one-subscription cart rule
- Google-ready login gate that redirects unauthenticated users to the login route before opening the main system
- Credit card management route with checkout access, card number formatting, masked saved card references, deletion, and localStorage persistence
- Completed About page documenting the final application design, PWA support, and local-first data behavior
- Progressive web app support through `manifest.webmanifest`, app icon metadata, and a service worker
- Responsive custom CSS and React Router navigation
- Automated Node tests for StreamList helpers, TMDB formatting, cart logic, safe browser storage, and service-worker registration

## Application Routes

The app uses React Router's `HashRouter`, so browser URLs include `#/`:

- `/#/` - StreamList homepage for managing movies and shows
- `/#/login` - Google-ready OAuth login and grading demo access
- `/#/movies` - TMDB movie search and result detail review
- `/#/cart` - EZTechMovie product catalog, cart controls, and total summary
- `/#/cards` - Credit card management for checkout card references
- `/#/about` - Final project overview, PWA notes, and local-first data explanation

## Assignment Coverage

The final app covers each project phase:

- Week 1: React Router navigation, multiple components, custom styling, icons, and StreamList homepage
- Week 2: User events for adding, editing, deleting, completing, clearing input, and saving StreamList data
- Week 3: TMDB API integration on a separate Movies route with local saved search state
- Week 4: Cart functionality with add, remove, totals, quantity updates, subscription guard, and saved cart state
- Final phase: Google-ready OAuth login, protected routes, credit card management, PWA manifest, service worker, install icons, and completed About page

See `docs/final-assignment-coverage.md` for the file-by-file coverage map.

## PWA Design

The app includes the files needed for a desktop-installable PWA:

- `public/manifest.webmanifest` defines app name, colors, display mode, start URL, scope, categories, and icons.
- `public/service-worker.js` caches the app shell, cleans old caches, serves navigation requests with an offline fallback, and caches same-origin static assets.
- `src/registerServiceWorker.js` safely registers the service worker only when the browser supports it.
- `docs/final-assignment-coverage.md` maps the final app features to each assignment part.

## Project Structure

```text
public/
  icons/
  manifest.webmanifest
  service-worker.js
src/
  components/
  pages/
  authLogic.js
  browserStorage.js
  cartLogic.js
  cartProducts.js
  creditCardLogic.js
  registerServiceWorker.js
  streamListUtils.js
  streamListUtils.test.mjs
docs/
  final-assignment-coverage.md
```

## Run Locally

Use Node.js `20.19+` or `22.12+` before installing dependencies.

Install dependencies:

```bash
npm install
```

Create a local `.env` file with a TMDB API key before using the Movies search page. The Google OAuth client ID is included in `.env.example` and can also be copied into `.env` for local testing:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_GOOGLE_CLIENT_ID=695772842505-9khkgj68cm5f0s81dkkedo29v0p10l1j.apps.googleusercontent.com
```

Start the development server:

```bash
npm run dev
```

Open the app in a browser after the dev server starts:

```text
http://localhost:5173/
```

If Vite shows a different local URL in the terminal, use that URL instead.

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Final Verification

Before submission, run:

```bash
npm test
npm run build
```

## Notes

This product uses the TMDB API but is not endorsed or certified by TMDB. StreamList, auth session, cart, and masked card reference data stay in browser storage on the current device. The cart and card manager demonstrate local checkout behavior only and do not process real payments.

Google OAuth is configured for a test-mode client. Only Google accounts listed as test users in Google Cloud can use the real Google sign-in button while the consent screen remains in testing mode.
