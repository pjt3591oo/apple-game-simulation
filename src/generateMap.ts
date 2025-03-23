
export function createRandomArray(rows: number, cols: number, min: number, max: number) {
  const result: number[][] = [];
  
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      // Generate random integer between min and max (inclusive)
      const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      row.push(randomValue);
    }
    result.push(row);
  }
  
  return result;
}

export function showMap(array: number[][]) {
  array.forEach(row => {
    console.log(row.join(' '));
  })
}
