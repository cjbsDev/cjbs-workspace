import { Box, Chip, ListItem, Stack } from '@mui/material';
import { SampleData } from './types';

export const sampleColoumns = [
  {
    width: '50px',
    name: '',
    selector: (row: SampleData) => row.sampleId,
  },
  {
    name: '샘플명',
    selector: (row: SampleData) => row.sampleCode,
    sortable: true,
  },
  {
    name: '대상자',
    selector: (row: SampleData) => row.subjectCode,
    sortable: true,
  },
  {
    name: '질환분류',
    selector: (row: SampleData) => row.disease,
    sortable: true,
  },
  {
    name: '샘플 종류',
    selector: (row: SampleData) => row.sampleType,
    sortable: true,
  },
  {
    name: 'Timepoint',
    selector: (row: SampleData) => row.timePoint,
    sortable: true,
  },
  {
    name: '분석',
    cell: (row: SampleData) => {
      return (
        <Stack
          flexWrap={'wrap'}
          useFlexGap
          spacing={1}
          direction={'row'}
          justifyContent={'flex-start'}
        >
          {row.analysisList.map((item) => {
            return item.type ? (
              <Chip variant="outlined" size="small" label={item.type} />
            ) : (
              <></>
            );
          })}
        </Stack>
      );
    },
  },
  {
    name: '연구코드',
    selector: (row: SampleData) => row.studyCode,
    sortable: true,
  },
];
