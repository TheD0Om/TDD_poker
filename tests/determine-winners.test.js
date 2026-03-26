import { describe, it, expect } from 'vitest';
import { determineWinners } from '../src/determine-winners.js';

describe('determineWinners', () => {
  it('returns a single winner', () => {
    const result = determineWinners(
      ['5C', '6D', '7H', '8S', '9D'],
      [
        { name: 'Player 1', holeCards: ['AC', 'AD'] },
        { name: 'Player 2', holeCards: ['KC', 'QD'] },
      ]
    );

    expect(result.winners).toEqual(['Player 1']);
    expect(result.players[0].bestHand.category).toBe('Straight');
    expect(result.players[0].bestHand.chosen5).toEqual(['9D', '8S', '7H', '6D', '5C']);
    expect(result.players[1].bestHand.category).toBe('Straight');
    expect(result.players[1].bestHand.chosen5).toEqual(['9D', '8S', '7H', '6D', '5C']);
  });

  it('returns multiple winners on a tie', () => {
    const result = determineWinners(
      ['5C', '6D', '7H', '8S', '9D'],
      [
        { name: 'Player 1', holeCards: ['AC', 'KD'] },
        { name: 'Player 2', holeCards: ['QC', 'JD'] },
      ]
    );

    expect(result.winners).toEqual(['Player 1', 'Player 2']);
  });

  it('uses the kicker when quads are on the board', () => {
    const result = determineWinners(
      ['7C', '7D', '7H', '7S', '2D'],
      [
        { name: 'Player 1', holeCards: ['AC', 'KC'] },
        { name: 'Player 2', holeCards: ['QC', 'JC'] },
      ]
    );

    expect(result.winners).toEqual(['Player 1']);
    expect(result.players[0].bestHand.category).toBe('Four of a kind');
    expect(result.players[0].bestHand.tiebreak).toEqual([7, 14]);
    expect(result.players[1].bestHand.tiebreak).toEqual([7, 12]);
  });
});