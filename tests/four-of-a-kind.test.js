import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - four of a kind', () => {
  it('recognizes four of a kind', () => {
    const result = evaluateFiveCards(['AC', 'AD', 'AH', 'AS', '9C']);

    expect(result.category).toBe('Four of a kind');
    expect(result.chosen5).toEqual(['AC', 'AD', 'AH', 'AS', '9C']);
    expect(result.tiebreak).toEqual([14, 9]);
  });

  it('puts the four cards first, then the kicker', () => {
    const result = evaluateFiveCards(['9C', 'AS', 'AH', 'AD', 'AC']);

    expect(result.category).toBe('Four of a kind');
    expect(result.chosen5).toEqual(['AS', 'AH', 'AD', 'AC', '9C']);
    expect(result.tiebreak).toEqual([14, 9]);
  });
});