# Final StreamList

Final StreamList combines the routed React StreamList application with the EZTechMovie cart assignment into one Vite React capstone project.

## Features

- StreamList watchlist manager with add, edit, delete, complete, filter, and localStorage behavior
- TMDB movie search page with recent searches, result details, poster display, and localStorage persistence
- EZTechMovie cart page with subscription plans, accessories, quantity controls, remove actions, totals, and localStorage persistence
- Subscription guard that allows only one subscription in the cart at a time
- Responsive custom CSS and React Router navigation
- Automated helper tests for StreamList, TMDB formatting, and cart logic

## Repositories Combined

- `int499-react-streamlist`
- `int499-eztechmovie-streamlist`

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

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

## Notes

This product uses the TMDB API but is not endorsed or certified by TMDB. The cart demonstrates local checkout behavior only and does not process payments.
