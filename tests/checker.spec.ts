import { expect, test } from 'vitest';
import { checkArray, isSquare } from '../src/checker';

/*
  * 좌표가 사각형인지 검사  
  * 합이 10이 될 때 0인 숫자만 카운팅한다.
*/

test('isSquare empty', () => {

  const pos = []

  const result = isSquare(pos)
  expect(result).toEqual(false)
})

test('isSquare: square', () => {

  const pos = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
  ]

  const result = isSquare(pos)
  expect(result).toEqual(true)
})

test('isSquare not square: not sequence & same count', () => {
  const pos = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], 
                    [3, 2],
  ]

  const result = isSquare(pos)
  expect(result).toEqual(false)
})

test('isSquare not square: not sequnce & not same count ', () => {
  const pos = [
    [0, 0], [0, 1], [0, 2], /* [0, 3], */ [0, 4],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], 
  ]

  const result = isSquare(pos)
  expect(result).toEqual(false)
})

test('isSquare not square: not sequnce & same count', () => {
  const pos = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], /* [2, 2], */ [2, 3]
  ]

  const result = isSquare(pos)
  expect(result).toEqual(false)
})


test('checkArray between zero', () => {
  const m = [
    [0, 0, 0, 1, 1, ], 
    [0, 0, 0, 1, 1, ], 
    [0, 1, 0, 1, 1, ], 
    [0, 2, 0, 2, 2, ], 
    [0, 0, 0, 3, 3, ], 
    [0, 3, 0, 4, 4, ], 
    [0, 4, 0, 5, 4, ], 
    [0, 5, 0, 5, 4, ], 
    [0, 5, 0, 5, 4, ], 
  ];

  const pos = [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
  ]

  const sim = checkArray(m, pos, )
  expect(sim.isMatch).toEqual(true);
  expect(sim.score).toEqual(4);
}) 

test('checkArray: update map', () => {
  const m = [
    [0, 0, 0, 1, 1, ], 
    [0, 0, 0, 1, 1, ], 
    [0, 1, 0, 1, 1, ], 
    [0, 2, 0, 2, 2, ], 
    [0, 3, 0, 3, 3, ], 
    [0, 4, 0, 4, 4, ], 
    [0, 0, 0, 5, 4, ], 
    [0, 5, 0, 5, 4, ], 
    [0, 5, 0, 5, 4, ], 
  ];

  const pos = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
    [3, 0], [3, 1], [3, 2],
    [4, 0], [4, 1], [4, 2],
    [5, 0], [5, 1], [5, 2],
    [6, 0], [6, 1], [6, 2],
  ]

  const result = checkArray(m, pos, )
  
  expect(result).toEqual({
    newMap: [
      [0, 0, 0, 1, 1, ], 
      [0, 0, 0, 1, 1, ], 
      [0, 0, 0, 1, 1, ], 
      [0, 0, 0, 2, 2, ], 
      [0, 0, 0, 3, 3, ], 
      [0, 0, 0, 4, 4, ], 
      [0, 0, 0, 5, 4, ], 
      [0, 5, 0, 5, 4, ], 
      [0, 5, 0, 5, 4, ], 
    ],
    isMatch: true,
    score: 4
  })
}) 
