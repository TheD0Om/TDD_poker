import { describe, it, expect } from 'vitest';
import { compareHands } from '../src/compare-hands.js';

describe('compareHands', () => {
  it('makes a straight flush beat four of a kind', () => {
    const left = {
      category: 'Straight flush',
      tiebreak: [14],
    };

    const right = {
      category: 'Four of a kind',
      tiebreak: [14, 9],
    };

    expect(compareHands(left, right)).toBe(1);
  });

  it('compares two pairs by pair value first', () => {
    const left = {
      category: 'One pair',
      tiebreak: [14, 9, 5, 3],
    };

    const right = {
      category: 'One pair',
      tiebreak: [13, 12, 8, 4],
    };

    expect(compareHands(left, right)).toBe(1);
  });

  it('compares same category using kickers', () => {
    const left = {
      category: 'One pair',
      tiebreak: [14, 9, 5, 3],
    };

    const right = {
      category: 'One pair',
      tiebreak: [14, 9, 5, 2],
    };

    expect(compareHands(left, right)).toBe(1);
  });

  it('returns 0 for a tie', () => {
    const left = {
      category: 'Straight',
      tiebreak: [10],
    };

    const right = {
      category: 'Straight',
      tiebreak: [10],
    };

    expect(compareHands(left, right)).toBe(0);
  });

  it('returns -1 when the right hand is stronger', () => {
    const left = {
      category: 'High card',
      tiebreak: [14, 13, 9, 5, 3],
    };

    const right = {
      category: 'One pair',
      tiebreak: [2, 14, 13, 9],
    };

    expect(compareHands(left, right)).toBe(-1);
  });
});