# Final StreamList

Final StreamList is a routed React PWA that combines the StreamList watchlist, TMDB movie search, and EZTechMovie cart assignments into one capstone application.

## Final Features

- StreamList manager with add, edit, delete, complete, filter, draft saving, duplicate prevention, and localStorage persistence
- TMDB movie search with poster-backed results, selected movie details, recent searches, and saved search state
- EZTechMovie cart with subscription plans, accessories, quantity controls, item removal, totals, and a one-subscription cart rule
- Completed About page documenting the final application design, PWA support, and local-first data behavior
- Progressive web app support through `manifest.webmanifest`, app icon metadata, and a service worker
- Responsive custom CSS and React Router navigation
- Automated Node tests for StreamList helpers, TMDB formatting, cart logic, safe browser storage, and service-worker registration

## Application Routes

The app uses React Router's `HashRouter`, so browser URLs include `#/`:

- `/#/` - StreamList homepage for managing movies and shows
- `/#/movies` - TMDB movie search and result detail review
- `/#/cart` - EZTechMovie product catalog, cart controls, and total summary
- `/#/about` - Final project overview, PWA notes, and local-first data explanation

## Assignment Coverage

The final app covers each project phase:

- Week 1: React Router navigation, multiple components, custom styling, icons, and StreamList homepage
- Week 2: User events for adding, editing, deleting, completing, clearing input, and saving StreamList data
- Week 3: TMDB API integration on a separate Movies route with local saved search state
- Week 4: Cart functionality with add, remove, totals, quantity updates, subscription guard, and saved cart state
- Final phase: PWA manifest, service worker, install icons, and completed About page

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
  browserStorage.js
  cartLogic.js
  cartProducts.js
  registerServiceWorker.js
  streamListUtils.js
  streamListUtils.test.mjs
docs/
  final-assignment-coverage.md
```

## Run Locally

Install dependencies:

```bash
npm install
```

Create a local `.env` file with a TMDB API key before using the Movies search page:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Start the development server:

```bash
npm run dev
```

Open the app in a browser after the dev server starts:

[http://localhost:5173/](http://localhost:5173/)

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

This product uses the TMDB API but is not endorsed or certified by TMDB. StreamList and cart data stay in browser storage on the current device. The cart demonstrates local checkout behavior only and does not process payments.
