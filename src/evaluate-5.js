import { parseCard } from './card.js';

function sortCardsByValueDesc(cards) {
  return [...cards].sort((a, b) => b.value - a.value);
}

function groupCardsByValue(cards) {
  const groups = new Map();

  for (const card of cards) {
    if (!groups.has(card.value)) {
      groups.set(card.value, []);
    }
    groups.get(card.value).push(card);
  }

  return groups;
}

export function evaluateFiveCards(cardCodes) {
  if (!Array.isArray(cardCodes) || cardCodes.length !== 5) {
    throw new Error('evaluateFiveCards expects exactly 5 cards');
  }

  const parsedCards = cardCodes.map(parseCard);
  const sortedCards = sortCardsByValueDesc(parsedCards);
  const groups = groupCardsByValue(sortedCards);

  const pairValues = [...groups.entries()]
    .filter(([, cards]) => cards.length === 2)
    .map(([value]) => value)
    .sort((a, b) => b - a);

  if (pairValues.length === 1) {
    const pairValue = pairValues[0];
    const pairCards = groups.get(pairValue);
    const kickers = sortedCards.filter((card) => card.value !== pairValue);

    return {
      category: 'One pair',
      chosen5: [...pairCards, ...kickers].map((card) => card.code),
      tiebreak: [pairValue, ...kickers.map((card) => card.value)],
    };
  }

  return {
    category: 'High card',
    chosen5: sortedCards.map((card) => card.code),
    tiebreak: sortedCards.map((card) => card.value),
  };
}