import { createRandomArray, showMap } from './src/generateMap';
import { checkArray } from './src/checker';
import board from './data/board';
import { removeFullZero } from './utils/remove';

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
  // childrens: TreeNode[],
}


// let gameBoard = createRandomArray(10, 17, 1, 9);

let gameBoard = board['9']

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

function shuffle(array: Position[]) {
  return array.sort(() => Math.random() - 0.5);
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

  return results.sort((a, b) => a.values.length - b.values.length);
}

function deepCopyBoard(board: number[][]): number[][] {
  return board.map(row => [...row]);
}

function boardToString(board: number[][]): string {
  return board.map(row => row.join(',')).join('|');
}

function autoPlay(currentNode: TreeNode, visitedStates = new Set<string>(), removeDuplicatePositionsString = new Set<string>(), daps: number = 0, maxDaps: number = 55) {
  
  if (daps > maxDaps) {
    return;
  }

  const boardState = boardToString(currentNode.board);
  if (visitedStates.has(boardState)) {
    return;
  }
  
  visitedStates.add(boardState);
  
  let positions = findRectanglesWithSum10(deepCopyBoard(currentNode.board));
  const removeDuplicatePositions: Position[] = [];
  
  for (const position of positions) {
    let pos: number[][] = [];
    for (let i = position.startRow ; i <= position.endRow ; ++i) {
      for (let j = position.startCol ; j <= position.endCol ; ++j) {
        pos.push([i, j]);
      }
    }
    
    pos = removeFullZero(currentNode.board, pos);
    
    if (pos.length === 0) return;
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
    const changedPos = removeFullZero(currentNode.board, pos);
    const sim = userAction(deepCopyBoard(currentNode.board), pos);
    
    const tempNode = {
      score: currentNode.score + sim.score,
      board: deepCopyBoard(sim.newMap),
      parent: currentNode,
      position: pos,
    }
    
    // currentNode.childrens.push(tempNode);
    
    if (bestNode.score <= tempNode.score) {
      bestNode = tempNode;
    }
    
    console.log(pos)
    console.log(changedPos)
    showMap(tempNode.parent?.board || []);
    console.log()
    showMap(tempNode.board);
    console.log(`daps: ${daps}, add score: ${sim.score}, ${sim.isMatch} current score: ${currentNode.score}, best score: ${bestNode.score}, position count: ${positions.length} / ${removeDuplicatePositions.length}`);
    console.log('***')
    autoPlay(tempNode, visitedStates, new Set(Array.from(removeDuplicatePositionsString)), daps + 1, maxDaps);
  }
}

let tree: TreeNode = {
  score: 0,
  board: deepCopyBoard(gameBoard),
  parent: null,
  position: [],
  // childrens: [],
};

let bestNode: TreeNode = {
  score: 0,
  board: deepCopyBoard(gameBoard),
  parent: null,
  position: [],
  // childrens: [],
};

autoPlay(tree, new Set<string>(), new Set<string>(), 0, 10);
const bestNodes: TreeNode[] = [];

console.log('========= auto play end ==========');

console.log('============== game board =============')

showMap(gameBoard);

while (bestNode.parent !== null) {
  bestNodes.push(bestNode);
  bestNode = bestNode.parent;
}

for (const bestNode of bestNodes.reverse()) {
  console.log(bestNode.position);
  showMap(bestNode.board);
  console.log(`best score: ${bestNode.score}`);
}
console.log('============== simulate end =============')
