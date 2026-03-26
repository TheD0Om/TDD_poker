import { describe, it, expect } from 'vitest';
import { evaluateFiveCards } from '../src/evaluate-5.js';

describe('evaluateFiveCards - straight', () => {
  it('recognizes a straight', () => {
    const result = evaluateFiveCards(['TC', 'JD', 'QH', 'KS', 'AC']);

    expect(result.category).toBe('Straight');
    expect(result.chosen5).toEqual(['AC', 'KS', 'QH', 'JD', 'TC']);
    expect(result.tiebreak).toEqual([14]);
  });

  it('sorts the straight from highest to lowest', () => {
    const result = evaluateFiveCards(['QH', 'TC', 'AC', 'JD', 'KS']);

    expect(result.category).toBe('Straight');
    expect(result.chosen5).toEqual(['AC', 'KS', 'QH', 'JD', 'TC']);
    expect(result.tiebreak).toEqual([14]);
  });
});