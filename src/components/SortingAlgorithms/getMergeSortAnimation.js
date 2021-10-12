export const getMergeSortAnimation = (array) => {
  const duplicateArray = array.slice(0, array.length);
  const auxilaryArray = array.slice(0, array.length);
  const animations = [];
  mergerSort(
    duplicateArray,
    0,
    duplicateArray.length - 1,
    auxilaryArray,
    animations
  );
  return animations;
};

const mergerSort = (array, low, high, auxilaryArray, animations) => {
  if (low < high) {
    let mid = Math.floor((low + high) / 2);
    mergerSort(array, low, mid, auxilaryArray, animations);
    mergerSort(array, mid + 1, high, auxilaryArray, animations);
    merge(array, low, mid, high, auxilaryArray, animations);
  }
};

const merge = (array, low, mid, high, auxilaryArray, animations) => {
  let k = 0;
  let i = low,
    j = mid + 1;

  while (i <= mid && j <= high) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (array[i] <= array[j]) {
      animations.push([low + k, array[i]]);
      auxilaryArray[k++] = array[i++];
    } else {
      animations.push([low + k, array[j]]);
      auxilaryArray[k++] = array[j++];
    }
  }

  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([low + k, array[i]]);
    auxilaryArray[k++] = array[i++];
  }

  while (j <= high) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([low + k, array[j]]);
    auxilaryArray[k++] = array[j++];
  }
  //   console.log(auxilaryArray);
  for (let p = 0; p < k; p++) {
    array[low + p] = auxilaryArray[p];
  }
};
