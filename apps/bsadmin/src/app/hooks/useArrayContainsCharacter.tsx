// import { useMemo } from "react";
//
// function useArrayContainsCharacter(arr: string[], char: string) {
//   return useMemo(() => {
//     return arr.includes(char);
//   }, [arr, char]);
// }
//
// export default useArrayContainsCharacter;

// import { useMemo } from "react";
//
// function useArrayContainsCharacters(arr: string[], chars: string[]) {
//   return useMemo(() => {
//     return chars.every((char) => arr.includes(char));
//   }, [arr, chars]);
// }
//
// export default useArrayContainsCharacters;

// import { useMemo } from "react";
//
// function useArrayContainsCharacters(arr: string[], chars: string[]) {
//   return useMemo(() => {
//     return chars.map((char) => arr.includes(char));
//   }, [arr, chars]);
// }
//
// export default useArrayContainsCharacters;

import { useMemo } from "react";

function useArrayContainsCharacters(arr: string[], chars: string[]) {
  return useMemo(() => {
    return chars.some((char) => arr.includes(char));
  }, [arr, chars]);
}

export default useArrayContainsCharacters;
