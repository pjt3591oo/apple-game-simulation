// posArrs: number[][]
// posArrs를 받으면 사각형인지 검사한다.

export function isSequence(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] !== 1) {
      return false;
    }
  }
  return true;
}


export function getSequence(arr: number[]): number[] {
  return [...new Set(arr)].sort((a, b) => a - b)
}

export function groupCoordinatesByX(positions: number[][]): number[][][] {
  const groupedByX: {[key: string]: number[][]} = {};
  
  for (const [x, y] of positions) {
    if (!groupedByX[x]) {
      groupedByX[x] = [];
    }
    groupedByX[x].push([x, y]);
  }
  
  const result: number[][][] = [];
  const sortedXValues = Object.keys(groupedByX).sort((a, b) => Number(a) - Number(b));
  
  for (const x of sortedXValues) {
    result.push(groupedByX[x]);
  }
  
  return result;
}


export function isSquare(positions: number[][]): boolean {
  
  if (positions.length < 2) {
    return false;
  }
  
  const rowSplitPositions = groupCoordinatesByX(positions);
  

  for (const row of rowSplitPositions) {
    
    const xValues = getSequence(row.map(([x, y]) => x));
    const yValues = getSequence(row.map(([x, y]) => y));
    
    if (!isSequence(xValues) || !isSequence(yValues)) {
      return false;
    }
  }

  const eachColumnCountByRow = rowSplitPositions.map(row => row.length);
  const firstColumnCountByRow = eachColumnCountByRow[0];

  if (!eachColumnCountByRow.every(count => count === firstColumnCountByRow)) {
    return false;
  }
  

  return true
}

export function checkArray(mapArr: number[][], positions: number[][]) {
  
  if (!isSquare(positions)) {
    return {
      newMap: mapArr,
      isMatch: false,
      score: 0,
    }
  }

  const tempMapArr = mapArr.map(row => [...row]);
  let sum = 0;

  for (const rowPos of positions) {
      sum += tempMapArr[rowPos[0]][rowPos[1]];
  }
  
  if (sum === 10) {
    for (const rowPos of positions) {
      tempMapArr[rowPos[0]][rowPos[1]] = 0; 
    }
  }
  
  return {
    newMap: tempMapArr,
    isMatch: sum === 10,
    score: sum === 10 ? positions.filter(pos => mapArr[pos[0]][pos[1]]).length : 0,
  }
}

