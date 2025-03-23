import { showMap } from './src/generateMap';
import { checkArray } from './src/checker';

type Position = {
  startRow: number, 
  startCol: number, 
  endRow: number,
  endCol: number,
  height: number,
  width: number,
  values: number[][]
}

type TreeNode = {
  score: number,
  board: number[][],
  parent: TreeNode | null,
  position: number[][],
  childrens: TreeNode[],
}




// let gameBoard = [
//   /*[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]  */
//     [ 3, 4, 7, 3, 2, 7, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, ],
//     [ 5, 5, 7, 2, 5, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//     [ 9, 4, 5, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 0, 0, ],
//     [ 3, 5, 5, 4, 8, 6, 5, 8, 0, 0, 0, 8, 4, 6, 0, 0, 0, ],
//     [ 9, 8, 7, 6, 9, 7, 4, 9, 0, 0, 0, 4, 2, 7, 0, 0, 0, ],
//     [ 8, 5, 1, 7, 3, 9, 4, 1, 8, 0, 0, 5, 9, 9, 0, 7, 0, ],
//     [ 5, 7, 9, 4, 6, 9, 2, 6, 9, 0, 9, 0, 0, 0, 0, 7, 0, ],
//     [ 7, 9, 6, 2, 6, 9, 5, 7, 0, 0, 6, 0, 7, 6, 8, 7, 0, ],
//     [ 1, 4, 4, 6, 7, 5, 9, 0, 0, 0, 0, 0, 0, 4, 3, 5, 0, ],
//     [ 6, 3, 1, 7, 1, 7, 6, 8, 0, 0, 0, 0, 1, 8, 4, 3, 8, ], // 9
//   ];
// let gameBoard = [
//   /*[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]  */
//     [ 3, 4, 7, 3, 2, 7, 4, 3, 4, 5, 6, 1, 1, 9, 1, 3, 5 ], // 0
//     [ 5, 5, 7, 2, 5, 6, 5, 1, 1, 2, 5, 2, 3, 2, 5, 3, 9 ], // 1
//     [ 9, 4, 5, 7, 5, 2, 2, 4, 3, 8, 8, 1, 7, 6, 8, 1, 2 ], // 2
//     [ 3, 5, 5, 4, 8, 6, 5, 8, 6, 1, 3, 8, 4, 6, 3, 7, 3 ], // 3
//     [ 9, 8, 7, 6, 9, 7, 4, 9, 1, 3, 6, 4, 2, 7, 6, 4, 6 ], // 4
//     [ 8, 5, 1, 7, 3, 9, 4, 1, 8, 9, 1, 5, 9, 9, 1, 7, 1 ], // 5
//     [ 5, 7, 9, 4, 6, 9, 2, 6, 9, 5, 9, 3, 4, 2, 4, 7, 6 ], // 6
//     [ 7, 9, 6, 2, 6, 9, 5, 7, 9, 1, 6, 5, 7, 6, 8, 7, 8 ], // 7
//     [ 1, 4, 4, 6, 7, 5, 9, 9, 1, 4, 3, 4, 6, 4, 3, 5, 2 ], // 8
//     [ 6, 3, 1, 7, 1, 7, 6, 8, 1, 6, 1, 2, 1, 8, 4, 3, 8 ], // 9
//   ];
// let gameBoard = [
//   /*[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]  */
//     [ 3, 4, 7, 3, 2, 7, 4, 3, 4, 5, 6, 1, 1, 9, 1, 3, 5 ], // 0
//     [ 5, 5, 7, 2, 5, 6, 5, 1, 1, 2, 5, 2, 3, 2, 5, 3, 9 ], // 1
//     [ 9, 4, 5, 7, 5, 2, 2, 4, 3, 8, 8, 1, 7, 6, 8, 1, 2 ], // 2
//     [ 3, 5, 5, 4, 8, 6, 5, 8, 6, 1, 3, 8, 4, 6, 3, 7, 3 ], // 3
//     [ 9, 8, 7, 6, 9, 7, 4, 9, 1, 3, 6, 4, 2, 7, 6, 4, 6 ], // 4
//     [ 8, 5, 1, 7, 3, 9, 4, 1, 8, 9, 1, 5, 9, 9, 1, 7, 1 ], // 5
//     [ 5, 7, 9, 4, 6, 9, 2, 6, 9, 5, 9, 3, 4, 2, 4, 7, 6 ], // 6
//     [ 7, 9, 6, 2, 6, 9, 5, 7, 9, 1, 6, 5, 7, 6, 8, 7, 8 ], // 7
//     [ 1, 4, 4, 6, 7, 5, 9, 9, 1, 4, 3, 4, 6, 4, 3, 5, 2 ], // 8
//     [ 6, 3, 1, 7, 1, 7, 6, 8, 1, 6, 1, 2, 1, 8, 4, 3, 8 ], // 9
//   ];
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
// let gameBoard = [
//   /*[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]  */
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 0
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 1
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 2
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 3
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 4
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 5
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 6
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 7
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 8
//     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 9
//   ];

// let gameBoard = [
//   [0, 0, 1, 9]
// ]

// let gameBoard = [
//   [3, 4, 0, 0, 0, 7, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 7, 2, 0, 6, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [9, 4, 5, 7, 0, 2, 2, 4, 3, 0, 8, 1, 7, 6, 8, 0, 0],
//   [3, 0, 0, 0, 0, 6, 5, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [9, 8, 7, 0, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 0],
//   [5, 7, 9, 0, 0, 9, 2, 6, 0, 0, 9, 0, 0, 0, 0, 0, 0],
//   [7, 9, 6, 2, 6, 9, 5, 7, 0, 0, 6, 0, 7, 0, 8, 0, 8],
//   [1, 4, 0, 0, 7, 5, 9, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 7, 1, 7, 6, 8, 0, 0, 0, 0, 0, 8, 4, 0, 8],
// ]

// let gameBoard = [
//   [3, 4, 0, 0, 0, 7, 4, 3, 4, 0, 6, 0, 0, 0, 0, 0, 0, ],
//   [0, 0, 7, 2, 0, 6, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//   [9, 4, 5, 7, 0, 2, 2, 4, 3, 0, 8, 1, 7, 6, 8, 0, 0, ],
//   [3, 0, 0, 0, 0, 6, 5, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//   [9, 8, 7, 0, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//   [8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 0, ],
//   [5, 7, 9, 0, 0, 9, 2, 6, 0, 0, 9, 0, 0, 0, 0, 0, 0, ],
//   [7, 9, 6, 2, 6, 9, 5, 7, 0, 0, 6, 0, 7, 0, 8, 0, 8, ],
//   [1, 4, 0, 0, 7, 5, 9, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, ],
//   [0, 0, 0, 7, 1, 7, 6, 8, 0, 0, 0, 0, 0, 8, 4, 0, 8, ],
// ]

let gameBoard = [
  [5, 5, 6, 1, 2, 1, 6, 1, 1, 9, 8, 6, 6, 4, 7, 3, 3, 4],
  [3, 2, 8, 5, 7, 1, 6, 1, 3, 3, 4, 4, 1, 3, 6, 7, 5, 3],
  [7, 4, 3, 3, 2, 2, 8, 8, 3, 1, 1, 2, 5, 1, 1, 3 ,3 ,1],
  [5, 5, 5, 5, 5, 7, 3, 2, 2, 4, 8, 9, 1, 2, 5, 7 ,1 ,2],
  [2, 8, 5, 5, 6, 5, 6, 5, 4, 4, 4, 1, 5, 4, 2, 7 ,7 ,7],
  [3, 1, 2, 1, 1, 6, 1, 5, 3, 6, 5, 8, 3, 5, 2, 2 ,1 ,1],
  [6, 4, 5, 2, 6, 2, 5, 7, 5, 6, 5, 2, 3, 5, 8, 5 ,4 ,2],
  [3, 7, 2, 8, 6, 4, 5, 3, 5, 4, 1, 9, 6, 4, 6, 2 ,2 ,9],
  [1, 2, 2, 1, 3, 3, 4, 1, 9, 7, 8, 6, 6, 9, 5, 3 ,7 ,6],
]

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

function isPositionBetweenNonZeroValues(arr: number[][], row: number, col: number): boolean {
  let leftNonZero = false;
  let rightNonZero = false;
  
  for (let j = col - 1; j >= 0; j--) {
    if (arr[row][j] !== 0) {
      leftNonZero = true;
      break;
    }
  }
  
  for (let j = col + 1; j < arr[0].length; j++) {
    if (arr[row][j] !== 0) {
      rightNonZero = true;
      break;
    }
  }
  
  let topNonZero = false;
  let bottomNonZero = false;
  
  for (let i = row - 1; i >= 0; i--) {
    if (arr[i][col] !== 0) {
      topNonZero = true;
      break;
    }
  }
  
  for (let i = row + 1; i < arr.length; i++) {
    if (arr[i][col] !== 0) {
      bottomNonZero = true;
      break;
    }
  }
  
  return (leftNonZero && rightNonZero) || (topNonZero && bottomNonZero);
}

// 전체가 0인 행과 열에 속하는 위치를 제거하되, 0이 아닌 값 사이에 있는 0은 유지
function adjustPositionForZeroEdges(arr: number[][], positions: number[][]): number[][] {
  return positions.filter(pos => {
    const row = pos[0];
    const col = pos[1];
    
    if (row < 0 || row >= arr.length || col < 0 || col >= arr[0].length) {
      return false;
    }
    
    if (arr[row][col] !== 0) {
      return true;
    }
    
    if (isPositionBetweenNonZeroValues(arr, row, col)) {
      return true;
    }
    
    return false;
  });
}



function autoPlay(currentNode: TreeNode, visitedStates = new Set<string>(), removeDuplicatePositionsString = new Set<string>()) {
  
  const boardState = boardToString(currentNode.board);
  if (visitedStates.has(boardState)) {
    return;
  }
  
  visitedStates.add(boardState);
  
  let positions = findRectanglesWithSum10(deepCopyBoard(currentNode.board));
  const removeDuplicatePositions: any[] = [];
  
  for (const position of positions) {
    let pos: number[][] = [];
    for (let i = position.startRow ; i <= position.endRow ; ++i) {
      for (let j = position.startCol ; j <= position.endCol ; ++j) {
        pos.push([i, j]);
      }
    }
    
    if (pos.length === 0) continue;
    
    pos = adjustPositionForZeroEdges(currentNode.board, pos);
    
    if (pos.length === 0) continue;
    if (removeDuplicatePositionsString.has(pos.flat().join(','))) continue;
    
    removeDuplicatePositionsString.add(pos.flat().join(','));
    removeDuplicatePositions.push(position);
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
    
    console.log(pos.flat().join(', '));    
    console.log(`best score: ${bestNode.score}, position count: ${positions.length} / ${removeDuplicatePositions.length}`);
    showMap(bestNode.board);
    autoPlay(tempNode, visitedStates, new Set(Array.from(removeDuplicatePositionsString)));
  }
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

autoPlay(tree, new Set<string>());
// const bestNodes: TreeNode[] = [];

// console.log('========= auto play end ==========');

// while (bestNode.parent !== null) {
//   bestNodes.push(bestNode);
//   bestNode = bestNode.parent;
// }

// for (const bestNode of bestNodes.reverse()) {
//   console.log(bestNode.position);
//   // showMap(bestNode.board);
//   console.log(`best score: ${bestNode.score}`);
// }
// console.log('============== simulate end =============')

// const newPos = adjustPositionForZeroEdges(
//   [
//     [3, 4, 0, 0, 0, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//     [3, 4, 0, 0, 0, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//     [3, 4, 0, 0, 0, 7, 4, 0, 4, 0, 6, 0, 0, 0, 0, 0, 0, ],
//     [0, 0, 7, 2, 0, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//     [0, 0, 7, 2, 0, 6, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//     [9, 4, 5, 7, 0, 2, 2, 4, 3, 0, 8, 1, 7, 6, 8, 0, 0, ],
//     [3, 0, 0, 0, 0, 6, 5, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//     [9, 8, 7, 0, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//     [8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 0, ],
//     [5, 7, 9, 0, 0, 9, 2, 6, 0, 0, 9, 0, 0, 0, 0, 0, 0, ],
//     [7, 9, 6, 2, 6, 9, 5, 7, 0, 0, 6, 0, 7, 0, 8, 0, 8, ],
//     [1, 4, 0, 0, 7, 5, 9, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, ],
//     [0, 0, 0, 7, 1, 7, 6, 8, 0, 0, 0, 0, 0, 8, 4, 0, 8, ],
//   ],
//   [
//     [0, 7], [0, 8], [0, 9], [0, 10], [0, 11],
//     [1, 7], [1, 8], [1, 9], [1, 11], [1, 11],
//     [1, 7], [2, 8], [2, 9], [2, 10], [2, 11],
//     [3, 7], [3, 8], [3, 9], [3, 10], [3, 11],
//   ]
// )

// console.log(newPos)