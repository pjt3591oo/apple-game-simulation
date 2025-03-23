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
  

let userActionCount = 1;
function userAction (gameBoard: number[][], positions: number[][], ) {
  console.log(` =================== ${userActionCount++} try ===================`);
  const sim = checkArray(gameBoard, positions);
  gameBoard = sim.newMap;
  showMap(gameBoard);
  console.log(`isMatch: ${sim.isMatch}, score: ${sim.score}`);
  return sim.newMap
}


gameBoard = userAction(gameBoard, [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
gameBoard = userAction(gameBoard, [[0, 3], [0, 4]]);
gameBoard = userAction(gameBoard, [[0, 2], [0, 3]]);
gameBoard = userAction(gameBoard, [[0, 2], [0, 3]]);
gameBoard = userAction(gameBoard, [[0, 2], [0, 3], ]);