import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - flush', () => {
  it('recognizes a flush', () => {
    const result = evaluateFiveCards(['AH', 'JH', '9H', '6H', '4H']);

    expect(result.category).toBe('Flush');
    expect(result.chosen5).toEqual(['AH', 'JH', '9H', '6H', '4H']);
    expect(result.tiebreak).toEqual([14, 11, 9, 6, 4]);
  });

  it('sorts flush cards from highest to lowest', () => {
    const result = evaluateFiveCards(['6H', 'AH', '4H', '9H', 'JH']);

    expect(result.category).toBe('Flush');
    expect(result.chosen5).toEqual(['AH', 'JH', '9H', '6H', '4H']);
    expect(result.tiebreak).toEqual([14, 11, 9, 6, 4]);
  });
});