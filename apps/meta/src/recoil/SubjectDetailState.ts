import { atom } from 'recoil';
import { SubjectDetailResponse } from 'src/app/clinical/(subjectlayout)/subject/[code]/types';

export interface SubjectDetailStateType extends SubjectDetailResponse {
  type: 'categories' | 'timePoints';
  active: string;
  parents: string;
}

export const SubjectDetailState = atom<SubjectDetailStateType>({
  key: 'sampleSearchInputState', // unique ID (with respect to other atoms/selectors)
  default: {
    categories: [],
    timePoints: [],
    group: null,
    age: null,
    sex: null,
    height: null,
    weight: null,
    sampleTypeList: null,
    date: null,
    label: null,
    type: 'categories',
    active: 'All',
    code: null,
    parents: '',
  },
});
