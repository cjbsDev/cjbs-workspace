import { atom } from 'recoil';
import { Age, CheckType } from 'src/app/clinical/search/types';

export const selectedFilterState = atom<CheckType[]>({
  key: 'selectedFilterState', // unique ID (with respect to other atoms/selectors)
  default: [],
});

export const searchInputState = atom<string>({
  key: 'searchInputState', // unique ID (with respect to other atoms/selectors)
  default: '',
});

export const ageState = atom<Age>({
  key: 'ageState', // unique ID (with respect to other atoms/selectors)
  default: {
    subjectMinAge: null,
    subjectMaxAge: null,
  },
});
