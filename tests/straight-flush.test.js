import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - straight flush', () => {
  it('recognizes a straight flush', () => {
    const result = evaluateFiveCards(['TH', 'JH', 'QH', 'KH', 'AH']);

    expect(result.category).toBe('Straight flush');
    expect(result.chosen5).toEqual(['AH', 'KH', 'QH', 'JH', 'TH']);
    expect(result.tiebreak).toEqual([14]);
  });

  it('orders the straight flush from highest to lowest', () => {
    const result = evaluateFiveCards(['QH', 'TH', 'AH', 'JH', 'KH']);

    expect(result.category).toBe('Straight flush');
    expect(result.chosen5).toEqual(['AH', 'KH', 'QH', 'JH', 'TH']);
    expect(result.tiebreak).toEqual([14]);
  });
});