import { Box, Checkbox } from '@mui/material';
import { StudyData } from './types';

export const studyColoumns = [
  {
    width: '44%',
    name: '질환군 / 질환명 / 연구명',
    cell: (row: StudyData) => {
      console.log('row > ', row);

      return (
        <Box
          sx={{
            paddingLeft: row.level === 1 ? '0px' : row.level === 2 ? '20px' : '40px',
          }}
        >
          {row.title}
        </Box>
      );
    },
    sortable: true,
  },
  {
    name: '연구 수(건)',
    selector: (row: StudyData) => (row.studyCount === 0 ? '' : row.studyCount.toLocaleString()),
    sortable: true,
  },
  {
    name: '대상자 수(명)',
    selector: (row: StudyData) => row.subjectCount.toLocaleString(),
    sortable: true,
  },
  {
    name: '샘플 종류',
    selector: (row: StudyData) => row.sampleType,
    sortable: true,
  },
  {
    name: '연구자',
    selector: (row: StudyData) => row.investigator,
    sortable: true,
  },
  {
    name: '기관명',
    selector: (row: StudyData) => row.institute,
    sortable: true,
  },
  {
    name: '연구코드',
    selector: (row: StudyData) => row.studyCode,
    sortable: true,
  },
];

export const studyColoumnsNoSort = [
  {
    width: '40%',
    name: '질환군 / 질환명 / 연구명',
    cell: (row: StudyData) => {
      return (
        <Box
          sx={{
            paddingLeft: row.level === 1 ? '0px' : row.level === 2 ? '20px' : '40px',
          }}
        >
          {row.title}
        </Box>
      );
    },
    sortable: false,
  },
  {
    name: '연구 수(건)',
    selector: (row: StudyData) => (row.studyCount === 0 ? '' : row.studyCount.toLocaleString()),
    sortable: false,
  },
  {
    name: '대상자 수(명)',
    selector: (row: StudyData) => row.subjectCount.toLocaleString(),
    sortable: false,
  },
  {
    name: '샘플 종류',
    selector: (row: StudyData) => row.sampleType,
    sortable: false,
  },
  {
    name: '연구자',
    selector: (row: StudyData) => row.investigator,
    sortable: false,
  },
  {
    name: '기관명',
    selector: (row: StudyData) => row.institute,
    sortable: false,
  },
  {
    name: '연구코드',
    selector: (row: StudyData) => row.studyCode,
    sortable: false,
  },
];
export const conditionalRowStyles = [
  {
    when: (row: StudyData) => row.level === 1,
    style: {
      fontWeight: '600',
      backgroundColor: '#E6F0FA',
    },
  },
  {
    when: (row: StudyData) => row.level === 2,
    style: {
      backgroundColor: '#F8F9FA',
    },
  },
];
