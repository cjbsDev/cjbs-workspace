import { atom } from 'recoil';

export const searchState = atom<string[]>({
  key: 'searchState', // unique ID (with respect to other atoms/selectors)
  default: [],
});
