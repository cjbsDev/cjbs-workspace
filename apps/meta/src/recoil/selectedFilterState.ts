import { atom } from 'recoil';

export const selectedFilterState = atom<string[]>({
  key: 'selectedFilterState', // unique ID (with respect to other atoms/selectors)
  default: [],
});
