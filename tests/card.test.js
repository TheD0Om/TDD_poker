import { describe, it, expect } from 'vitest';
import { parseCard, getCardValue } from '../src/card.js';

describe('parseCard', () => {
  it('parses an ace of clubs', () => {
    expect(parseCard('AC')).toEqual({
      code: 'AC',
      rank: 'A',
      suit: 'C',
      value: 14,
    });
  });

  it('parses a ten of diamonds', () => {
    expect(parseCard('TD')).toEqual({
      code: 'TD',
      rank: 'T',
      suit: 'D',
      value: 10,
    });
  });

  it('throws on invalid format', () => {
    expect(() => parseCard('10D')).toThrow('Invalid card format');
  });

  it('throws on invalid rank', () => {
    expect(() => parseCard('XD')).toThrow('Invalid card rank');
  });

  it('throws on invalid suit', () => {
    expect(() => parseCard('AX')).toThrow('Invalid card suit');
  });
});

describe('getCardValue', () => {
  it('returns the numeric value of a card rank', () => {
    expect(getCardValue('2C')).toBe(2);
    expect(getCardValue('TD')).toBe(10);
    expect(getCardValue('AH')).toBe(14);
  });
});