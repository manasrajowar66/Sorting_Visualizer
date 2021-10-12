export const getBubbleSortAnimation = (array) => {
  const duplicateArray = array.slice();
  const animations = [];
  const length = duplicateArray.length;

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      animations.push([j]);
      animations.push([j]);
      if (duplicateArray[j] > duplicateArray[j + 1]) {
        animations.push([
          {
            swaped: true,
            i: { ind: j, val: duplicateArray[j + 1] },
            j: { ind: j + 1, val: duplicateArray[j] },
          },
        ]);
        const temp = duplicateArray[j];
        duplicateArray[j] = duplicateArray[j + 1];
        duplicateArray[j + 1] = temp;
      } else {
        animations.push([
          {
            swaped: false,
            i: { ind: j, val: duplicateArray[j] },
            j: { ind: j + 1, val: duplicateArray[j + 1] },
          },
        ]);
      }
    }
  }
  return animations;
};
