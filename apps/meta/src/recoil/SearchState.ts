import { atom } from 'recoil';
import { AgeType, CheckType } from '../app/clinical/types';

export const selectedFilterState = atom<CheckType[]>({
  key: 'selectedFilterState', // unique ID (with respect to other atoms/selectors)
  default: [],
});

//사이드 바 검색
export const searchInputState = atom<string>({
  key: 'searchInputState', // unique ID (with respect to other atoms/selectors)
  default: '',
});
//Search 메뉴에 결과 재검색
export const resultSearchInputState = atom<string>({
  key: 'resultSearchInputState', // unique ID (with respect to other atoms/selectors)
  default: '',
});

export const ageState = atom<AgeType>({
  key: 'ageState', // unique ID (with respect to other atoms/selectors)
  default: {
    subjectMinAge: 0,
    subjectMaxAge: 0,
  },
});

export const pageSizeState = atom<number>({
  key: 'pageSize', // unique ID (with respect to other atoms/selectors)
  default: 0,
});

//Search 메뉴에서 키다운 이벤트
export const searchPageKeyDownState = atom<string>({
  key: 'searchPageKeyDownState',
  default: '',
});

//Search 메뉴에서 검색어
export const searchPageTextState = atom<string>({
  key: 'searchPageTextState',
  default: '',
});

//Search 메뉴에서 검색결과가 없을때
export const searchNoResultState = atom<boolean>({
  key: 'searchNoResultState',
  default: false,
});

//Search 메뉴에서 검색결과가 없을때
export const searchRenderTextState = atom<string>({
  key: 'searchRenderTextState',
  default: '',
});
