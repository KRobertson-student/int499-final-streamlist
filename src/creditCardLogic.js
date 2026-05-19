export const CARD_STORAGE_KEY = 'streamlist_credit_cards';

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

function isSavedCard(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    typeof value.cardholder === 'string' &&
    value.cardholder.trim().length > 0 &&
    typeof value.maskedNumber === 'string' &&
    /^\*{4} \*{4} \*{4} \d{4}$/.test(value.maskedNumber) &&
    typeof value.lastFour === 'string' &&
    /^\d{4}$/.test(value.lastFour) &&
    typeof value.expiration === 'string' &&
    /^\d{2}\/\d{2}$/.test(value.expiration) &&
    typeof value.nickname === 'string' &&
    typeof value.createdAt === 'string'
  );
}

function createCardId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `card-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function formatCardNumber(value) {
  const digits = onlyDigits(value).slice(0, 16);
  const groups = digits.match(/.{1,4}/g);

  return groups ? groups.join(' ') : '';
}

export function maskCardNumber(value) {
  const digits = onlyDigits(value);
  const lastFour = digits.slice(-4).padStart(4, '0');

  return `**** **** **** ${lastFour}`;
}

export function validateCreditCardForm(form) {
  const errors = {};
  const digits = onlyDigits(form.cardNumber);
  const expiration = String(form.expiration || '').trim();

  if (!String(form.cardholder || '').trim()) {
    errors.cardholder = 'Enter the cardholder name.';
  }

  if (digits.length !== 16) {
    errors.cardNumber = 'Enter a 16 digit card number.';
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiration)) {
    errors.expiration = 'Use MM/YY for the expiration date.';
  }

  return errors;
}

export function createCreditCard(form, id = createCardId(), date = new Date()) {
  const digits = onlyDigits(form.cardNumber).slice(0, 16);
  const lastFour = digits.slice(-4);
  const nickname = String(form.nickname || '').trim();

  return {
    id,
    cardholder: String(form.cardholder || '').trim(),
    maskedNumber: maskCardNumber(digits),
    lastFour,
    expiration: String(form.expiration || '').trim(),
    nickname: nickname || 'Saved card',
    createdAt: date.toISOString(),
  };
}

export function loadCreditCards(storage, fallbackCards = []) {
  if (!storage) {
    return fallbackCards;
  }

  try {
    const storedCards = storage.getItem(CARD_STORAGE_KEY);

    if (!storedCards) {
      return fallbackCards;
    }

    const parsedCards = JSON.parse(storedCards);

    if (!Array.isArray(parsedCards) || !parsedCards.every(isSavedCard)) {
      return fallbackCards;
    }

    return parsedCards;
  } catch {
    return fallbackCards;
  }
}

export function saveCreditCards(storage, cards) {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(CARD_STORAGE_KEY, JSON.stringify(cards));
    return true;
  } catch {
    return false;
  }
}

export function removeCreditCard(cards, cardId) {
  return cards.filter((card) => card.id !== cardId);
}
