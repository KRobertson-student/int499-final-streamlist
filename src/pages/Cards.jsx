import { useEffect, useState } from 'react';
import { getBrowserStorage } from '../browserStorage.js';
import {
  createCreditCard,
  formatCardNumber,
  loadCreditCards,
  removeCreditCard,
  saveCreditCards,
  validateCreditCardForm,
} from '../creditCardLogic.js';

const emptyForm = {
  cardholder: '',
  cardNumber: '',
  expiration: '',
  nickname: '',
};

function Cards() {
  const [cards, setCards] = useState(() => loadCreditCards(getBrowserStorage()));
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  useEffect(() => {
    saveCreditCards(getBrowserStorage(), cards);
  }, [cards]);

  const updateField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: field === 'cardNumber' ? formatCardNumber(value) : value,
    }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: '' }));
    setNotice('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateCreditCardForm(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setNotice('');
      return;
    }

    const card = createCreditCard(form);

    setCards((currentCards) => [card, ...currentCards]);
    setForm(emptyForm);
    setErrors({});
    setNotice(`${card.nickname} ending in ${card.lastFour} saved.`);
  };

  const handleRemoveCard = (cardId) => {
    setCards((currentCards) => removeCreditCard(currentCards, cardId));
    setNotice('Saved card removed.');
  };

  return (
    <section className="cards-page">
      <article className="panel cards-hero">
        <p className="page-kicker">Security System</p>
        <h2 className="page-title">Manage checkout cards.</h2>
        <p className="page-copy">
          Add a card reference for the EZTechMovie checkout flow. The demo
          validates the required 16 digit format, masks saved card numbers, and
          keeps card records in browser localStorage for this class project.
        </p>
      </article>

      <div className="card-layout">
        <article className="panel card-form-panel">
          <div>
            <p className="page-kicker">Card Entry</p>
            <h3 className="section-title">Add a payment card</h3>
          </div>

          <form className="card-form" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="cardholder">
              Cardholder name
            </label>
            <input
              className="text-input"
              id="cardholder"
              name="cardholder"
              value={form.cardholder}
              onChange={(event) => updateField('cardholder', event.target.value)}
              autoComplete="cc-name"
            />
            {errors.cardholder ? (
              <p className="form-error" role="alert">
                {errors.cardholder}
              </p>
            ) : null}

            <label className="form-label" htmlFor="cardNumber">
              Card number
            </label>
            <input
              className="text-input"
              id="cardNumber"
              name="cardNumber"
              value={form.cardNumber}
              onChange={(event) => updateField('cardNumber', event.target.value)}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
            {errors.cardNumber ? (
              <p className="form-error" role="alert">
                {errors.cardNumber}
              </p>
            ) : null}

            <div className="field-grid">
              <div>
                <label className="form-label" htmlFor="expiration">
                  Expiration
                </label>
                <input
                  className="text-input"
                  id="expiration"
                  name="expiration"
                  value={form.expiration}
                  onChange={(event) =>
                    updateField('expiration', event.target.value)
                  }
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expiration ? (
                  <p className="form-error" role="alert">
                    {errors.expiration}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="form-label" htmlFor="nickname">
                  Card nickname
                </label>
                <input
                  className="text-input"
                  id="nickname"
                  name="nickname"
                  value={form.nickname}
                  onChange={(event) => updateField('nickname', event.target.value)}
                  placeholder="Project card"
                />
              </div>
            </div>

            <button className="btn btn--primary" type="submit">
              <span className="material-symbols-rounded" aria-hidden="true">
                credit_card
              </span>
              Save card
            </button>
          </form>

          {notice ? (
            <p className="message message--success" role="status">
              {notice}
            </p>
          ) : null}
        </article>

        <article className="panel saved-cards-panel">
          <div>
            <p className="page-kicker">LocalStorage</p>
            <h3 className="section-title">Saved card references</h3>
          </div>

          {cards.length ? (
            <div className="saved-card-grid">
              {cards.map((card) => (
                <article className="saved-card" key={card.id}>
                  <div>
                    <span className="category-label">{card.nickname}</span>
                    <h4>{card.cardholder}</h4>
                    <p className="saved-card__number">{card.maskedNumber}</p>
                    <p>Expires {card.expiration}</p>
                  </div>

                  <button
                    className="icon-btn icon-btn--danger"
                    type="button"
                    aria-label={`Remove ${card.nickname}`}
                    title={`Remove ${card.nickname}`}
                    onClick={() => handleRemoveCard(card.id)}
                  >
                    <span className="material-symbols-rounded" aria-hidden="true">
                      delete
                    </span>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-state">
              No card references saved yet. Add a demo card to complete checkout
              setup.
            </p>
          )}

          <p className="security-note">
            For a real payment system, card data should be handled by a PCI
            compliant payment provider. This class project stores masked demo
            references locally to demonstrate state management.
          </p>
        </article>
      </div>
    </section>
  );
}

export default Cards;
