import { expect, test } from 'vitest';
import { createRandomArray } from '../src/generateMap';

test('generate map size', () => {
  const width = 17;
  const height = 10;
  const m = createRandomArray(height, width, 1, 9);
  
  expect(m.length).toBe(height)
  expect(m[0].length).toBe(width)
})
