import { describe, it, expect } from 'vitest';
import { evaluateBestHand } from '../src/evaluate-7.js';

describe('evaluateBestHand', () => {
  it('finds the best 5-card hand from 7 cards', () => {
    const result = evaluateBestHand(['AC', 'AD'], ['AH', '9S', '9C', '2D', '3H']);

    expect(result.category).toBe('Full house');
    expect(result.chosen5).toEqual(['AC', 'AD', 'AH', '9S', '9C']);
    expect(result.tiebreak).toEqual([14, 9]);
  });

  it('supports board plays', () => {
    const result = evaluateBestHand(['AC', 'KD'], ['5C', '6D', '7H', '8S', '9D']);

    expect(result.category).toBe('Straight');
    expect(result.chosen5).toEqual(['9D', '8S', '7H', '6D', '5C']);
    expect(result.tiebreak).toEqual([9]);
  });

  it('can use only one hole card', () => {
    const result = evaluateBestHand(['AH', '2C'], ['KH', 'QH', 'JH', 'TH', '3D']);

    expect(result.category).toBe('Straight flush');
    expect(result.chosen5).toEqual(['AH', 'KH', 'QH', 'JH', 'TH']);
    expect(result.tiebreak).toEqual([14]);
  });

  it('can use both hole cards', () => {
    const result = evaluateBestHand(['AC', 'KC'], ['QC', 'JC', 'TC', '2D', '3H']);

    expect(result.category).toBe('Straight flush');
    expect(result.chosen5).toEqual(['AC', 'KC', 'QC', 'JC', 'TC']);
    expect(result.tiebreak).toEqual([14]);
  });
});