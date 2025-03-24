import { expect, test} from 'vitest';
import { removeFullZero, left, right, top, bottom } from '../utils/remove';

test('util.remove', () => {
  const m = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,1,0,9,0,0],
    [0,0,0,0,0,0,0],
  ]

  const pos = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
  ]
  
  const convertPosition = removeFullZero(m, pos);

  expect(convertPosition).toEqual([
    [2, 2], [2, 3], [2, 4]
  ])
})

test('util.remove: left 0', () => {
  const m = [
    [1, 2, 3, 0, 4],
    [4, 3, 2, 0, 1],
    [0, 0, 1, 0, 9],
    [3, 3, 4, 0, 1],
  ]

  const pos = [ 
    [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ]
  ]
  
  const convertPosition = left(m, pos);

  expect(convertPosition).toEqual([
    [ 2, 2 ], [ 2, 3 ], [ 2, 4 ]
  ])
})
test('util.remove: left 1', () => {
  const m = [
    [1, 2, 3, 0, 4],
    [4, 3, 2, 0, 1],
    [0, 0, 1, 0, 9],
    [3, 3, 4, 0, 1],
  ]

  const pos = [ 
    [2, 0], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ]
  ]
  
  const convertPosition = left(m, pos);

  expect(convertPosition).toEqual([
    [ 2, 2 ], [ 2, 3 ], [ 2, 4 ]
  ])
})

test('util.remove: right 0', () => {
  const m = [
    [1, 0, 2, 3, 4],
    [4, 0, 3, 2, 1],
    [1, 0, 9, 0, 0],
    [3, 0, 3, 4, 1],
  ]

  const pos = [ 
    [2, 0], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ]
  ]
  
  const convertPosition = right(m, pos);

  expect(convertPosition).toEqual([
    [ 2, 0 ], [ 2, 1 ], [2, 2]
  ])
})

test('util.remove: right 1', () => {
  const m = [
    [1, 0, 2, 3, 4],
    [4, 0, 3, 2, 1],
    [1, 0, 9, 0, 0],
    [3, 0, 3, 4, 1],
  ]

  const pos = [ 
    [2, 0], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4]
  ]
  
  const convertPosition = right(m, pos);

  expect(convertPosition).toEqual([
    [ 2, 0 ], [ 2, 1 ], [2, 2]
  ])
})

test('util.remove: top 0', () => {
  const m = [
    [1, 0, 2, 3, 4],
    [0, 0, 0, 0, 0],
    [1, 0, 9, 0, 0],
    [3, 0, 3, 4, 1],
  ]

  const pos = [ 
    [ 1, 0 ], [ 1, 1 ], [ 1, 2 ],
    [ 2, 0 ], [ 2, 1 ], [ 2, 2 ],
  ]
  
  const convertPosition = top(m, pos);

  expect(convertPosition).toEqual([
    [ 2, 0 ], [ 2, 1 ], [ 2, 2 ]
  ])
})

test('util.remove: top 1', () => {
  const m = [
    [1, 0, 2, 3, 4],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 0, 9, 0, 0],
    [3, 0, 3, 4, 1],
  ]

  const pos = [ 
    [ 1, 0 ], [ 1, 1 ], [ 1, 2 ],
    [ 2, 0 ], [ 2, 1 ], [ 2, 2 ],
    [ 3, 0 ], [ 3, 1 ], [ 3, 2 ],
  ]
  
  const convertPosition = top(m, pos);

  expect(convertPosition).toEqual([
    [ 3, 0 ], [ 3, 1 ], [ 3, 2 ]
  ])
})

test('util.remove: bottom 0 ', () => {
  const m = [
    [1, 0, 2, 3, 4],
    [1, 0, 9, 0, 0],
    [0, 0, 0, 0, 0],
    [3, 0, 3, 4, 1],
  ]

  const pos = [ 
    [ 1, 0 ], [ 1, 1 ], [ 1, 2 ],
    [ 2, 0 ], [ 2, 1 ], [ 2, 2 ]
  ]
  
  const convertPosition = bottom(m, pos);

  expect(convertPosition).toEqual([
    [ 1, 0 ], [ 1, 1 ], [ 1, 2 ]
  ])
})

test('util.remove: bottom 1', () => {
  const m = [
    [1, 0, 9, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [3, 0, 3, 4, 1],
  ]

  const pos = [ 
    [ 0, 0 ], [ 0, 1 ], [ 0, 2 ],
    [ 1, 0 ], [ 1, 1 ], [ 1, 2 ],
    [ 2, 0 ], [ 2, 1 ], [ 2, 2 ]
  ]
  
  const convertPosition = bottom(m, pos);

  expect(convertPosition).toEqual([
    [ 0, 0 ], [ 0, 1 ], [ 0, 2 ]
  ])
})

test('util.remove: bottom 2', () => {
  const m = [
    [1, 0, 9, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [3, 0, 3, 4, 1],
  ]

  const pos = [ 
    [ 0, 0 ], [ 0, 1 ], [ 0, 2 ],
    [ 1, 0 ], [ 1, 1 ], [ 1, 2 ],
    [ 2, 0 ], [ 2, 1 ], [ 2, 2 ]
  ]
  
  const convertPosition = bottom(m, pos);

  expect(convertPosition).toEqual([
    [ 0, 0 ], [ 0, 1 ], [ 0, 2 ]
  ])
})


test('util.remove: all', () => {  
  const m = [
    [1, 2, 3, 4],
    [0, 0, 0, 1],
    [0, 0, 0, 9],
    [3, 3, 4, 1],
  ]

  const pos = [
    [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], 
    [ 2, 0 ], [ 2, 1 ], [ 2, 2 ],
    [ 3, 0 ], [ 3, 1 ], [ 3, 2 ]
  ]

  const convertPosition = top(m, pos);
  console.log(convertPosition)
})