import { useMemo } from "react";

function useArraysContainSameElements(arr1: string[], arr2: string[]) {
  return useMemo(() => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  }, [arr1, arr2]);
}

export default useArraysContainSameElements;
