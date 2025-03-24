
function groupPositionsByRow(positions: number[][]): number[][][] {
  // 빈 배열이면 빈 결과 반환
  if (positions.length === 0) {
    return [];
  }
  
  // 그룹핑을 위해 행 번호를 키로 사용
  const grouped: { [key: number]: number[][] } = {};
  
  // 각 위치를 행 번호에 따라 그룹화
  for (const pos of positions) {
    const row = pos[0];
    if (!grouped[row]) {
      grouped[row] = [];
    }
    grouped[row].push(pos);
  }
  
  // 객체를 배열로 변환
  return Object.values(grouped);
}

export function top(m: number[][], positions: number[][]): number[][] {
  const groupedPositions = groupPositionsByRow(positions);

  for (let i = 0; i < groupedPositions.length; ++i) {
    let isLineFullZero = true;
    for (let j = 0; j < groupedPositions[0].length; ++j) {

      if (m[groupedPositions[i][j][0]][groupedPositions[i][j][1]] !== 0) {
        isLineFullZero = false;
        break;
      }
    }

    if (isLineFullZero) {
      positions = positions.filter(([x, y]) => x !== groupedPositions[i][0][0]);
    } else {
      return positions;
    }
  }

  return positions;
}

export function bottom(m: number[][], positions: number[][]): number[][] {
  const groupedPositions = groupPositionsByRow(positions);

  for (let i = groupedPositions.length - 1; i >= 0; --i) {
    let isLineFullZero = true;
    for (let j = groupedPositions[0].length - 1; j >= 0 ; --j) {

      if (m[groupedPositions[i][j][0]][groupedPositions[i][j][1]] !== 0) {
        isLineFullZero = false;
        break;
      }
    }

    if (isLineFullZero) {
      positions = positions.filter(([x, y]) => x !== groupedPositions[i][0][0]);
    } else {
      return positions;
    }
  }

  return positions;
}


export function left(m: number[][], positions: number[][]): number[][] {
  const groupedPositions = groupPositionsByRow(positions);
  
  for (let j = 0; j < groupedPositions[0].length ; ++j) {
    let isLineFullZero = true;
    let line = 0;
    for (let i = 0; i < groupedPositions.length ; ++i) {
      if (m[groupedPositions[i][j][0]][groupedPositions[i][j][1]] !== 0) {
        isLineFullZero = false;
        break;
      }
      line = groupedPositions[i][j][1]
    }
    
    if (isLineFullZero) {
      positions = positions.filter(([x, y]) => y !== line);
    } else {
      return positions;
    }
  }

  return positions;
}

export function right(m: number[][], positions: number[][]): number[][] {
  const groupedPositions = groupPositionsByRow(positions);
  
  for (let j = groupedPositions[0].length - 1; j >= 0 ; --j) {
    let isLineFullZero = true;
    let line = 0;

    for (let i = groupedPositions.length - 1; i >= 0 ; --i) {
      if (m[groupedPositions[i][j][0]][groupedPositions[i][j][1]] !== 0) {
        isLineFullZero = false;
        break;
      }
      line = groupedPositions[i][j][1]
    }
    
    if (isLineFullZero) {
      positions = positions.filter(([x, y]) => y !== line);
    } else {
      return positions;
    }
  }

  return positions;
}

export function removeFullZero(arr: number[][], positions: number[][]): number[][] {
  
  positions = top(arr, positions);
  positions = bottom(arr, positions);
  positions = left(arr, positions);
  positions = right(arr, positions);

  return positions;
}