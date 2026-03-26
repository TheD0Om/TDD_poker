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

function getStraightInfo(cards) {
  const values = cards.map((card) => card.value);
  const uniqueValues = [...new Set(values)].sort((a, b) => b - a);

  if (uniqueValues.length !== 5) {
    return null;
  }

  const isRegularStraight = uniqueValues.every((value, index) => {
    if (index === uniqueValues.length - 1) {
      return true;
    }
    return value - uniqueValues[index + 1] === 1;
  });

  if (isRegularStraight) {
    return {
      highCard: uniqueValues[0],
      orderedValues: uniqueValues,
    };
  }

  const isWheel =
    uniqueValues[0] === 14 &&
    uniqueValues[1] === 5 &&
    uniqueValues[2] === 4 &&
    uniqueValues[3] === 3 &&
    uniqueValues[4] === 2;

  if (isWheel) {
    return {
      highCard: 5,
      orderedValues: [5, 4, 3, 2, 14],
    };
  }

  return null;
}

function orderCardsBySpecificValues(cards, orderedValues) {
  const usedIndexes = new Set();
  const orderedCards = [];

  for (const value of orderedValues) {
    const cardIndex = cards.findIndex(
      (card, index) => card.value === value && !usedIndexes.has(index)
    );

    usedIndexes.add(cardIndex);
    orderedCards.push(cards[cardIndex]);
  }

  return orderedCards;
}

export function evaluateFiveCards(cardCodes) {
  if (!Array.isArray(cardCodes) || cardCodes.length !== 5) {
    throw new Error('evaluateFiveCards expects exactly 5 cards');
  }

  const parsedCards = cardCodes.map(parseCard);
  const sortedCards = sortCardsByValueDesc(parsedCards);
  const groups = groupCardsByValue(sortedCards);

  const entries = [...groups.entries()];

  const threeOfAKindValues = entries
    .filter(([, cards]) => cards.length === 3)
    .map(([value]) => value)
    .sort((a, b) => b - a);

  const pairValues = entries
    .filter(([, cards]) => cards.length === 2)
    .map(([value]) => value)
    .sort((a, b) => b - a);

  const straightInfo = getStraightInfo(sortedCards);

  if (straightInfo) {
    const orderedStraightCards = orderCardsBySpecificValues(
      sortedCards,
      straightInfo.orderedValues
    );

    return {
      category: 'Straight',
      chosen5: orderedStraightCards.map((card) => card.code),
      tiebreak: [straightInfo.highCard],
    };
  }

  if (threeOfAKindValues.length === 1) {
    const tripValue = threeOfAKindValues[0];
    const tripCards = groups.get(tripValue);
    const kickers = sortedCards.filter((card) => card.value !== tripValue);

    return {
      category: 'Three of a kind',
      chosen5: [...tripCards, ...kickers].map((card) => card.code),
      tiebreak: [tripValue, ...kickers.map((card) => card.value)],
    };
  }

  if (pairValues.length === 2) {
    const highPairValue = pairValues[0];
    const lowPairValue = pairValues[1];

    const highPairCards = groups.get(highPairValue);
    const lowPairCards = groups.get(lowPairValue);
    const kicker = sortedCards.find(
      (card) => card.value !== highPairValue && card.value !== lowPairValue
    );

    return {
      category: 'Two pair',
      chosen5: [...highPairCards, ...lowPairCards, kicker].map((card) => card.code),
      tiebreak: [highPairValue, lowPairValue, kicker.value],
    };
  }

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