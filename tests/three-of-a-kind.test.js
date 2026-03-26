import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - three of a kind', () => {
  it('recognizes three of a kind', () => {
    const result = evaluateFiveCards(['AC', 'AD', 'AH', '9S', '3C']);

    expect(result.category).toBe('Three of a kind');
    expect(result.chosen5).toEqual(['AC', 'AD', 'AH', '9S', '3C']);
    expect(result.tiebreak).toEqual([14, 9, 3]);
  });

  it('puts the triplet first, then kickers in descending order', () => {
    const result = evaluateFiveCards(['3C', 'AH', '9S', 'AD', 'AC']);

    expect(result.category).toBe('Three of a kind');
    expect(result.chosen5).toEqual(['AH', 'AD', 'AC', '9S', '3C']);
    expect(result.tiebreak).toEqual([14, 9, 3]);
  });
});