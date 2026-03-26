const CATEGORY_STRENGTH = {
  'High card': 0,
  'One pair': 1,
  'Two pair': 2,
  'Three of a kind': 3,
  Straight: 4,
  Flush: 5,
  'Full house': 6,
  'Four of a kind': 7,
  'Straight flush': 8,
};

export function compareHands(left, right) {
  const leftStrength = CATEGORY_STRENGTH[left.category];
  const rightStrength = CATEGORY_STRENGTH[right.category];

  if (leftStrength > rightStrength) {
    return 1;
  }

  if (leftStrength < rightStrength) {
    return -1;
  }

  const maxLength = Math.max(left.tiebreak.length, right.tiebreak.length);

  for (let index = 0; index < maxLength; index += 1) {
    const leftValue = left.tiebreak[index] ?? 0;
    const rightValue = right.tiebreak[index] ?? 0;

    if (leftValue > rightValue) {
      return 1;
    }

    if (leftValue < rightValue) {
      return -1;
    }
  }

  return 0;
}