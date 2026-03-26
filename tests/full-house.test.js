import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - full house', () => {
  it('recognizes a full house', () => {
    const result = evaluateFiveCards(['AC', 'AD', 'AH', '9S', '9C']);

    expect(result.category).toBe('Full house');
    expect(result.chosen5).toEqual(['AC', 'AD', 'AH', '9S', '9C']);
    expect(result.tiebreak).toEqual([14, 9]);
  });

  it('puts the triplet first, then the pair', () => {
    const result = evaluateFiveCards(['9C', 'AH', '9S', 'AD', 'AC']);

    expect(result.category).toBe('Full house');
    expect(result.chosen5).toEqual(['AH', 'AD', 'AC', '9C', '9S']);
    expect(result.tiebreak).toEqual([14, 9]);
  });
});