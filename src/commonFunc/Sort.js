export const originQuickSort = (() => {
  const partition = (array, left, right) => {
    let pivot = array[(left + right) >>> 1];
    while (left <= right) {
      while (array[left].id < pivot.id) left++;
      while (array[right].id > pivot.id) right--;
      
      if (left <= right) {
        let temp = array[left];
        array[left++] = array[right];
        array[right--] = temp;
      }
    }
    return left;
  };
  const quicksort = (array, left, right) => {
    let mid = partition(array, left, right);
    if (left < mid - 1) quicksort(array, left, mid - 1);
    if (right > mid) quicksort(array, mid, right);
  };
  return (items) => {
    quicksort(items, 0, items.length - 1);
    return items;
  };
})();

export const ascQuickSort = (() => {
  const partition = (array, left, right) => {
    let pivot = array[(left + right) >>> 1];
    while (left <= right) {
      while (array[left].price < pivot.price) left++;
      while (array[right].price > pivot.price) right--;
      
      if (left <= right) {
        let temp = array[left];
        array[left++] = array[right];
        array[right--] = temp;
      }
    }
    return left;
  };
  const quicksort = (array, left, right) => {
    let mid = partition(array, left, right);
    if (left < mid - 1) quicksort(array, left, mid - 1);
    if (right > mid) quicksort(array, mid, right);
  };
  return (items) => {
    quicksort(items, 0, items.length - 1);
    return items;
  };
})();

export const descQuickSort = (() => {
  const partition = (array, left, right) => {
    let pivot = array[(left + right) >>> 1];
    while (left <= right) {
      while (array[left].price > pivot.price) left++;
      while (array[right].price < pivot.price) right--;
      
      if (left <= right) {
        let temp = array[left];
        array[left++] = array[right];
        array[right--] = temp;
      }
    }
    return left;
  };
  const quicksort = (array, left, right) => {
    let mid = partition(array, left, right);
    if (left < mid - 1) quicksort(array, left, mid - 1);
    if (right > mid) quicksort(array, mid, right);
  };
  return (items) => {
    quicksort(items, 0, items.length - 1);
    return items;
  };
})();