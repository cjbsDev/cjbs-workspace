import { atom } from 'recoil';
import { AgeType, CheckType } from 'src/app/clinical/search/types';

export const selectedFilterState = atom<CheckType[]>({
  key: 'selectedFilterState', // unique ID (with respect to other atoms/selectors)
  default: [],
});

export const searchInputState = atom<string>({
  key: 'searchInputState', // unique ID (with respect to other atoms/selectors)
  default: '',
});

export const ageState = atom<AgeType>({
  key: 'ageState', // unique ID (with respect to other atoms/selectors)
  default: {
    subjectMinAge: null,
    subjectMaxAge: null,
  },
});
