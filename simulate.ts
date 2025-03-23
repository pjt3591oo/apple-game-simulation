import { showMap } from './src/generateMap';
import { checkArray } from './src/checker';

let gameBoard = [
  /*[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]  */
    [ 3, 4, 7, 3, 2, 7, 4, 3, 4, 5, 6, 1, 1, 9, 1, 3, 5 ], // 0
    [ 5, 5, 7, 2, 5, 6, 5, 1, 1, 2, 5, 2, 3, 2, 5, 3, 9 ], // 1
    [ 9, 4, 5, 7, 5, 2, 2, 4, 3, 8, 8, 1, 7, 6, 8, 1, 2 ], // 2
    [ 3, 5, 5, 4, 8, 6, 5, 8, 6, 1, 3, 8, 4, 6, 3, 7, 3 ], // 3
    [ 9, 8, 7, 6, 9, 7, 4, 9, 1, 3, 6, 4, 2, 7, 6, 4, 6 ], // 4
    [ 8, 5, 1, 7, 3, 9, 4, 1, 8, 9, 1, 5, 9, 9, 1, 7, 1 ], // 5
    [ 5, 7, 9, 4, 6, 9, 2, 6, 9, 5, 9, 3, 4, 2, 4, 7, 6 ], // 6
    [ 7, 9, 6, 2, 6, 9, 5, 7, 9, 1, 6, 5, 7, 6, 8, 7, 8 ], // 7
    [ 1, 4, 4, 6, 7, 5, 9, 9, 1, 4, 3, 4, 6, 4, 3, 5, 2 ], // 8
    [ 6, 3, 1, 7, 1, 7, 6, 8, 1, 6, 1, 2, 1, 8, 4, 3, 8 ], // 9
  ];
// let gameBoard = [
//   /*[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]  */
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 2 ], // 0
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 8 ], // 1
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 2 ], // 2
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 8 ], // 3
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 2 ], // 4
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 8 ], // 5
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 2 ], // 6
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 8 ], // 7
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 2 ], // 8
//     [ 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 8 ], // 9
//   ];


function userAction(gameBoard: number[][], positions: number[][]) {
  const boardCopy = deepCopyBoard(gameBoard);
  const sim = checkArray(boardCopy, positions);
  return sim;
}

function calculateRectangleSum(array: number[][], startRow: number, startCol: number, height: number, width: number) {
  let sum = 0;
  for (let i = startRow; i < startRow + height; ++i) {
    for (let j = startCol; j < startCol + width; ++j) {
      sum += array[i][j];
    }
  }
  return sum;
}

function getRectangleValues(array: number[][], startRow: number, startCol: number, height: number, width: number): number[][] {
  const values: number[][] = [];
  for (let i = startRow; i < startRow + height; ++i) {
    const row: number[] = [];
    for (let j = startCol; j < startCol + width; ++j) {
      row.push(array[i][j]);
    }
    values.push(row);
  }
  return values;
}

type Position = {
  startRow: number, 
  startCol: number, 
  endRow: number,
  endCol: number,
  height: number,
  width: number,
  values: number[][]
}

function findRectanglesWithSum10(array: number[][]) {
  const rows = array.length;
  const cols = array[0].length;
  
  const results: Position[] = [];
  
  for (let height = 1; height <= rows; height++) {
    for (let width = 1; width <= cols; width++) {
      for (let i = 0; i <= rows - height; ++i) {
        for (let j = 0; j <= cols - width; ++j) {
          const sum = calculateRectangleSum(deepCopyBoard(array), i, j, height, width);
          if (sum === 10) {
            results.push({
              startRow: i,
              startCol: j,
              endRow: i + height - 1,
              endCol: j + width - 1,
              height: height,
              width: width,
              values: getRectangleValues(deepCopyBoard(array), i, j, height, width)
            });
          }
        }
      }
    }
  }

  return results
}

function deepCopyBoard(board: number[][]): number[][] {
  return board.map(row => [...row]);
}

function boardToString(board: number[][]): string {
  return board.map(row => row.join(',')).join('|');
}

function adjustTopZeroPosition(arr: number[][], positions: number[][]): number[][] {
  const height = arr.length;
  const width = arr[0].length;

  for (let i = 0; i < height; ++i) {
    let isFullZero = true;
    for (let j = 0; j < width; ++j) {
      if (arr[i][j] !== 0) {
        isFullZero = false;
      }
    }
    
    if (!isFullZero) {
      break;
    }

    if (isFullZero) {
      positions = positions.slice(width * (i + 1));
    }
  }
  return positions;
}

function adjustLeftZeroPosition(arr: number[][], positions: number[][]): number[][] {
  const height = arr.length;
  const width = arr[0].length;

  for (let i = 0; i < width; ++i) {
    let isFullZero = true;
    for (let j = 0; j < height; ++j) {
      if (arr[j][i] !== 0) {
        isFullZero = false;
      }
    }

    if (!isFullZero) {
      break;
    }
    
    if (isFullZero) {
      positions = positions.filter(pos => pos[1] !== i);
    }
  }
  return positions;
}

function adjustRightZeroPosition(arr: number[][], positions: number[][]): number[][] {
  const height = arr.length;
  const width = arr[0].length;
  const lastCol = arr[0].length - 1;

  for (let i = 0; i < width; ++i) {
    let isFullZero = true;
    for (let j = 0; j < height; ++j) {
      if (arr[j][lastCol - i] !== 0) {
        isFullZero = false;
      }
    }
    
    if (!isFullZero) {
      break;
    }

    if (isFullZero) {
      positions = positions.filter(pos => pos[1] !== lastCol - i);
    }
  }

  return positions;
}

function adjustBottomZeroPosition(arr: number[][], positions: number[][]): number[][] {
  const height = arr.length;
  const width = arr[0].length;
  const lastRow = arr.length - 1;

  for (let i = 0; i < height; ++i) {
    let isFullZero = true;
    for (let j = 0; j < width; ++j) {
      if (arr[lastRow - i][j] !== 0) {
        isFullZero = false;
      }
    }
    
    if (!isFullZero) {
      break;
    }

    if (isFullZero) {
      positions = positions.filter(pos => pos[0] !== lastRow - i);
    }
  }
  return positions;
}

function adjustPositionForZeroEdges(arr: number[][], positions: number[][]): number[][] {;
  positions = adjustTopZeroPosition(arr, positions);
  positions = adjustLeftZeroPosition(arr, positions);
  positions = adjustRightZeroPosition(arr, positions);
  positions = adjustBottomZeroPosition(arr, positions);
  
  return positions;
}

type TreeNode = {
  score: number,
  board: number[][],
  parent: TreeNode | null,
  position: number[][],
  childrens: TreeNode[],
}

let tree: TreeNode = {
  score: 0,
  board: deepCopyBoard(gameBoard),
  parent: null,
  position: [],
  childrens: [],
};

let bestNode: TreeNode = {
  score: 0,
  board: deepCopyBoard(gameBoard),
  parent: null,
  position: [],
  childrens: [],
};


function autoPlay(currentNode: TreeNode, visitedStates = new Set<string>(), removeDuplicatePositionsString = new Set<string>()) {
  
  const boardState = boardToString(currentNode.board);
  if (visitedStates.has(boardState)) {
    return;
  }
  
  visitedStates.add(boardState);
  
  let positions = findRectanglesWithSum10(deepCopyBoard(currentNode.board));
  const removeDuplicatePositions: Position[] = [];

  // duplicate remove
  for (const position of positions) {
    let pos: number[][] = [];
    for (let i = position.startRow ; i <= position.endRow ; ++i) {
      for (let j = position.startCol ; j <= position.endCol ; ++j) {
        pos.push([i, j]);
      }
    }
  
    if (!removeDuplicatePositionsString.has(pos.flat().join(','))) {
      removeDuplicatePositions.push(position);
    }
  }

  if (removeDuplicatePositions.length === 0) {
    return;
  }
  
  for (const position of removeDuplicatePositions) {
    let pos: number[][] = [];
    for (let i = position.startRow ; i <= position.endRow ; ++i) {
      for (let j = position.startCol ; j <= position.endCol ; ++j) {
        pos.push([i, j]);
      }
    }
    
    console.log('===========================')
    // 위치 재조정 (0으로 채워진 가장자리가 있는 경우)
    console.log(pos.flat().join(', '));    
    pos = adjustPositionForZeroEdges(currentNode.board, pos);
    
    // 재조정 후 위치가 비어있으면 이 위치는 건너뜀
    if (pos.length === 0) continue;
    
    const sim = userAction(deepCopyBoard(currentNode.board), pos);
    
    const tempNode = {
      score: currentNode.score + sim.score,
      board: deepCopyBoard(sim.newMap),
      parent: currentNode,
      childrens: [],
      position: pos,
    }
    
    currentNode.childrens.push(tempNode);
    
    if (bestNode.score <= tempNode.score) {
      bestNode = tempNode;
    }

    
    showMap(bestNode.board);
    console.log(`best score: ${bestNode.score}, position count: ${positions.length} / ${removeDuplicatePositions.length}`);
    console.log(position.values.flat().join(', '));    
    console.log(pos.flat().join(', '));    
    autoPlay(tempNode, visitedStates, removeDuplicatePositionsString);
  }
}

autoPlay(tree, new Set<string>());
const bestNodes: TreeNode[] = [];

console.log('========= end ==========');

while (bestNode.parent !== null) {
  bestNodes.push(bestNode);
  bestNode = bestNode.parent;
}

for (const bestNode of bestNodes.reverse()) {
  console.log(bestNode.position);
  showMap(bestNode.board);
  console.log(`best score: ${bestNode.score}`);
  console.log('===========================')
}

// adjustTopZeroPosition
// adjustLeftZeroPosition
// adjustRightZeroPosition
// adjustBottomZeroPosition
// const pos = adjustPositionForZeroEdges([
//   [3, 4, 0, 0, 0, 7, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
//   [0, 0, 7, 2, 0, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [9, 4, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 1, 2],
//   [3, 0, 0, 0, 0, 6, 5, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [9, 8, 7, 0, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 5, 9, 0, 0, 7, 0],
//   [5, 7, 9, 0, 0, 9, 2, 6, 9, 5, 9, 0, 0, 0, 0, 0, 0],
//   [7, 9, 6, 2, 6, 9, 5, 7, 0, 0, 6, 5, 7, 0, 8, 7, 8],
//   [1, 4, 0, 0, 7, 5, 9, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 7, 1, 7, 6, 8, 0, 0, 0, 0, 1, 8, 4, 3, 8],
// ], [
//   [2,16],[3,16],[4,16],[5,16],[6,16],[7,16],[8,16]
//   // [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
//   // [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
//   // [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
  
// ])

// console.log(pos)