import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - two pair', () => {
  it('recognizes two pair', () => {
    const result = evaluateFiveCards(['AC', 'AD', '9H', '9S', '3C']);

    expect(result.category).toBe('Two pair');
    expect(result.chosen5).toEqual(['AC', 'AD', '9H', '9S', '3C']);
    expect(result.tiebreak).toEqual([14, 9, 3]);
  });

  it('puts higher pair first, then lower pair, then kicker', () => {
    const result = evaluateFiveCards(['3C', '9S', 'AD', '9H', 'AC']);

    expect(result.category).toBe('Two pair');
    expect(result.chosen5).toEqual(['AD', 'AC', '9S', '9H', '3C']);
    expect(result.tiebreak).toEqual([14, 9, 3]);
  });
});