import { Box, Tooltip } from '@mui/material';
import { _Link } from 'cjbsDSTM/atoms/Link';
import { SubjectData } from './types';

export const subjectColoumns = [
  {
    name: '대상자',
    cell: (row: SubjectData) => {
      return (
        <_Link href={`/clinical/subject/${row.id}`}>{row.screeningCode}</_Link>
      );
    },
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
    cell: (row: SubjectData) => {
      return (
        <Tooltip title={row.studyTitle}>
          <Box>{row.studyCode}</Box>
        </Tooltip>
      );
    },
    sortable: true,
  },
];

export const subjectColoumnsNoSort = [
  {
    name: '대상자',
    cell: (row: SubjectData) => {
      return (
        <_Link href={`/clinical/subject/${row.id}`}>{row.screeningCode}</_Link>
      );
    },
    sortable: false,
  },
  {
    name: '질환군',
    selector: (row: SubjectData) => row.diseasePart,
    sortable: false,
  },
  {
    name: '질환명',
    selector: (row: SubjectData) => row.disease,
    sortable: false,
  },
  {
    name: '성별',
    selector: (row: SubjectData) => row.sex,
    sortable: false,
  },
  {
    name: '나이',
    selector: (row: SubjectData) => row.age,
    sortable: false,
  },
  {
    name: '연구코드',
    cell: (row: SubjectData) => {
      return (
        <Tooltip title={row.studyTitle}>
          <Box>{row.studyCode}</Box>
        </Tooltip>
      );
    },
    sortable: false,
  },
];
