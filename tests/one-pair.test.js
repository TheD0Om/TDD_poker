import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - one pair', () => {
  it('recognizes a pair', () => {
    const result = evaluateFiveCards(['AC', 'AD', '9H', '5S', '3C']);

    expect(result.category).toBe('One pair');
    expect(result.chosen5).toEqual(['AC', 'AD', '9H', '5S', '3C']);
    expect(result.tiebreak).toEqual([14, 9, 5, 3]);
  });

  it('sorts the pair first, then kickers in descending order', () => {
    const result = evaluateFiveCards(['3C', 'AD', '5S', 'AC', '9H']);

    expect(result.category).toBe('One pair');
    expect(result.chosen5).toEqual(['AD', 'AC', '9H', '5S', '3C']);
    expect(result.tiebreak).toEqual([14, 9, 5, 3]);
  });
});