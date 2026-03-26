import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - ace low straight', () => {
  it('recognizes A-2-3-4-5 as a straight', () => {
    const result = evaluateFiveCards(['AC', '2D', '3H', '4S', '5C']);

    expect(result.category).toBe('Straight');
    expect(result.chosen5).toEqual(['5C', '4S', '3H', '2D', 'AC']);
    expect(result.tiebreak).toEqual([5]);
  });

  it('orders the wheel straight as 5-4-3-2-A', () => {
    const result = evaluateFiveCards(['3H', 'AC', '5C', '2D', '4S']);

    expect(result.category).toBe('Straight');
    expect(result.chosen5).toEqual(['5C', '4S', '3H', '2D', 'AC']);
    expect(result.tiebreak).toEqual([5]);
  });
});