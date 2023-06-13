import { atom } from 'recoil';

export const subjectSearchInputState = atom<string>({
  key: 'subjectSearchInputState', // unique ID (with respect to other atoms/selectors)
  default: '',
});

export const subjectTotalElements = atom<number | null>({
  key: 'subjectTotalElements', // unique ID (with respect to other atoms/selectors)
  default: null,
});
