import { FlexBox } from 'cjbsDSTM/atoms/box/FlexBox';
import { FlexGrid } from 'cjbsDSTM/atoms/grid/FlexGrid';
import { Box, Divider, Grid, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';

export interface NameValue {
  name: string;
  value: string | number | null;
}
interface SubjectInfoProps {
  data: NameValue[];
}

const SubjectInfo: FunctionComponent<SubjectInfoProps> = ({ data }) => {
  return (
    <Box
      display={'flex'}
      height={'96px'}
      width={'100%'}
      sx={{ border: '1px solid #CED4DA' }}
    >
      {data.map((item, index) => (
        <Box
          width={'100%'}
          height={'100%'}
          key={index}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{
            borderRight: index + 1 !== data.length ? '1px solid #CED4DA' : null,
          }}
        >
          <Typography mb={'2px'} variant="subtitle2">
            {item.name}
          </Typography>
          <Typography variant="body2">{item.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SubjectInfo;
