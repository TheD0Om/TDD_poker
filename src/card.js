const RANK_VALUES = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const VALID_SUITS = ['C', 'D', 'H', 'S'];

export function parseCard(card) {
  if (typeof card !== 'string' || card.length !== 2) {
    throw new Error(`Invalid card format: ${card}`);
  }

  const rank = card[0];
  const suit = card[1];

  if (!(rank in RANK_VALUES)) {
    throw new Error(`Invalid card rank: ${card}`);
  }

  if (!VALID_SUITS.includes(suit)) {
    throw new Error(`Invalid card suit: ${card}`);
  }

  return {
    code: card,
    rank,
    suit,
    value: RANK_VALUES[rank],
  };
}

export function getCardValue(card) {
  return parseCard(card).value;
}