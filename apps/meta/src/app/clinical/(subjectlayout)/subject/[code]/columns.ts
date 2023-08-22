import { SubjectData } from 'src/app/clinical/(mainlayout)/subject/types';

export const subjectColoumns = [
  {
    name: '대상자',
    selector: (row: SubjectData) => row.screeningCode,
    sortable: true,
  },
  {
    name: '질환군',
    selector: (row: SubjectData) => row.diseasePart,
    sortable: true,
  },
  {
    name: '질환명',
    selector: (row: SubjectData) => row.disease,
    sortable: true,
  },
  {
    name: '성별',
    selector: (row: SubjectData) => row.sex,
    sortable: true,
  },
  {
    name: '나이',
    selector: (row: SubjectData) => row.age,
    sortable: true,
  },
  {
    name: '연구코드',
    selector: (row: SubjectData) => row.studyCode,
    sortable: true,
  },
];
