import { evaluateFiveCards } from './evaluate-5.js';
import { compareHands } from './compare-hands.js';

function getFiveCardCombinations(cards) {
  const combinations = [];

  for (let a = 0; a < cards.length - 4; a += 1) {
    for (let b = a + 1; b < cards.length - 3; b += 1) {
      for (let c = b + 1; c < cards.length - 2; c += 1) {
        for (let d = c + 1; d < cards.length - 1; d += 1) {
          for (let e = d + 1; e < cards.length; e += 1) {
            combinations.push([cards[a], cards[b], cards[c], cards[d], cards[e]]);
          }
        }
      }
    }
  }

  return combinations;
}

export function evaluateBestHand(holeCards, boardCards) {
  if (!Array.isArray(holeCards) || holeCards.length !== 2) {
    throw new Error('evaluateBestHand expects exactly 2 hole cards');
  }

  if (!Array.isArray(boardCards) || boardCards.length !== 5) {
    throw new Error('evaluateBestHand expects exactly 5 board cards');
  }

  const allCards = [...holeCards, ...boardCards];
  const combinations = getFiveCardCombinations(allCards);

  let bestHand = null;

  for (const combination of combinations) {
    const evaluatedHand = evaluateFiveCards(combination);

    if (!bestHand || compareHands(evaluatedHand, bestHand) === 1) {
      bestHand = evaluatedHand;
    }
  }

  return bestHand;
}