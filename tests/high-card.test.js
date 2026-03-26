import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - high card', () => {
  it('recognizes a high card hand', () => {
    const result = evaluateFiveCards(['AC', 'KD', '9H', '5S', '3C']);

    expect(result.category).toBe('High card');
    expect(result.chosen5).toEqual(['AC', 'KD', '9H', '5S', '3C']);
    expect(result.tiebreak).toEqual([14, 13, 9, 5, 3]);
  });

  it('sorts chosen5 from highest to lowest', () => {
    const result = evaluateFiveCards(['3C', 'KD', '5S', 'AC', '9H']);

    expect(result.category).toBe('High card');
    expect(result.chosen5).toEqual(['AC', 'KD', '9H', '5S', '3C']);
    expect(result.tiebreak).toEqual([14, 13, 9, 5, 3]);
  });
});