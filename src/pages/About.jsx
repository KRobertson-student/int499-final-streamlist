const featureHighlights = [
  {
    icon: 'playlist_add_check',
    title: 'Personal StreamList',
    description:
      'Add, edit, complete, filter, and remove movies or shows with saved browser persistence.',
  },
  {
    icon: 'movie',
    title: 'TMDB Movie Research',
    description:
      'Search movie data, review poster-backed results, and keep recent searches available after refresh.',
  },
  {
    icon: 'shopping_cart',
    title: 'EZTechMovie Cart',
    description:
      'Compare subscription plans, add accessories, manage quantities, and review cart totals.',
  },
  {
    icon: 'shield_lock',
    title: 'OAuth Protected Access',
    description:
      'Routes users through Google-ready authentication before opening the main application.',
  },
  {
    icon: 'credit_card',
    title: 'Card Management',
    description:
      'Supports checkout card entry, validation, masked saved cards, deletion, and localStorage persistence.',
  },
  {
    icon: 'install_desktop',
    title: 'PWA Ready',
    description:
      'Includes a web app manifest and service worker so the final app can be installed and opened as a desktop experience.',
  },
];

const projectDetails = [
  'React Router separates the Login, StreamList, Movies, Cart, Cards, and About workflows.',
  'Protected routes redirect unauthenticated users to the login screen before the system interface opens.',
  'Local browser storage keeps StreamList entries, movie searches, cart items, auth sessions, and saved card references available between visits.',
  'Pure utility modules cover title cleanup, TMDB formatting, cart math, card validation, auth sessions, storage loading, and service-worker registration.',
  'The production build ships static PWA assets from the Vite public folder.',
];

function About() {
  return (
    <section className="about-page">
      <article className="panel about-hero">
        <p className="page-kicker">Final Project</p>
        <h2 className="page-title">StreamList is complete and PWA-ready.</h2>
        <p className="page-copy">
          This capstone combines the StreamList watchlist, TMDB movie search,
          EZTechMovie cart, OAuth-ready login, and credit card management into
          one installable React application. It is designed around user events,
          persistent state, routed workflows, protected access, and progressive
          web app support.
        </p>
      </article>

      <div className="about-grid">
        {featureHighlights.map((feature) => (
          <article className="about-card" key={feature.title}>
            <span className="about-card__icon" aria-hidden="true">
              <span className="material-symbols-rounded">{feature.icon}</span>
            </span>
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>

      <article className="panel about-details">
        <div>
          <p className="page-kicker">Application Design</p>
          <h3 className="section-title">What the final version includes</h3>
        </div>

        <ul className="detail-list">
          {projectDetails.map((detail) => (
            <li key={detail}>
              <span className="material-symbols-rounded" aria-hidden="true">
                check_circle
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="panel about-details">
        <div>
          <p className="page-kicker">Data and Privacy</p>
          <h3 className="section-title">Local-first project behavior</h3>
        </div>

        <p className="page-copy cart-section-copy">
          StreamList stores app data in the browser on the current device. TMDB
          search requests use the configured API key for movie results, while
          authentication sessions and masked card references stay in
          localStorage for the assignment demo. The cart and card manager do not
          process real payments.
        </p>
      </article>
    </section>
  );
}

export default About;
