import { atom } from 'recoil';

export const sampleSearchInputState = atom<string>({
  key: 'sampleSearchInputState', // unique ID (with respect to other atoms/selectors)
  default: '',
});

export const sampleTotalElements = atom<number | null>({
  key: 'sampleTotalElements', // unique ID (with respect to other atoms/selectors)
  default: null,
});
