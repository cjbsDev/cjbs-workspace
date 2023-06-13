import { SubjectData } from './types';

export const subjectColoumns = [
  {
    name: '',
    selector: (row: SubjectData) => row.id,
  },
  {
    name: '대상자',
    selector: (row: SubjectData) => row.screeningCode,
  },
  {
    name: '질환군',
    selector: (row: SubjectData) => row.diseasePart,
  },
  {
    name: '질환명',
    selector: (row: SubjectData) => row.disease,
  },
  {
    name: '성별',
    selector: (row: SubjectData) => row.sex,
  },
  {
    name: '나이',
    selector: (row: SubjectData) => row.age,
  },
  {
    name: '연구코드',
    selector: (row: SubjectData) => row.studyCode,
  },
];
