import { parseCard } from './card.js';

function sortCardsByValueDesc(cards) {
  return [...cards].sort((a, b) => b.value - a.value);
}

export function evaluateFiveCards(cardCodes) {
  if (!Array.isArray(cardCodes) || cardCodes.length !== 5) {
    throw new Error('evaluateFiveCards expects exactly 5 cards');
  }

  const parsedCards = cardCodes.map(parseCard);
  const sortedCards = sortCardsByValueDesc(parsedCards);

  return {
    category: 'High card',
    chosen5: sortedCards.map((card) => card.code),
    tiebreak: sortedCards.map((card) => card.value),
  };
}