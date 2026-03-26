import { evaluateBestHand } from './evaluate-7.js';
import { compareHands } from './compare-hands.js';

export function determineWinners(boardCards, players) {
  if (!Array.isArray(boardCards) || boardCards.length !== 5) {
    throw new Error('determineWinners expects exactly 5 board cards');
  }

  if (!Array.isArray(players) || players.length === 0) {
    throw new Error('determineWinners expects at least one player');
  }

  const evaluatedPlayers = players.map((player) => ({
    ...player,
    bestHand: evaluateBestHand(player.holeCards, boardCards),
  }));

  let bestHand = evaluatedPlayers[0].bestHand;

  for (let index = 1; index < evaluatedPlayers.length; index += 1) {
    const currentHand = evaluatedPlayers[index].bestHand;

    if (compareHands(currentHand, bestHand) === 1) {
      bestHand = currentHand;
    }
  }

  const winners = evaluatedPlayers
    .filter((player) => compareHands(player.bestHand, bestHand) === 0)
    .map((player) => player.name);

  return {
    board: boardCards,
    players: evaluatedPlayers,
    winners,
  };
}