'use client'

import React from 'react';
import {Box, Typography} from '@mui/material';

interface DataCountResiltInfoProps {
  totalCount: number;
  selectedCount: number;
}

export const DataCountResultInfo = (props: DataCountResiltInfoProps) => {
  const {totalCount, selectedCount} = props;
  return (
    <Box component='dl' sx={{display: 'flex', alignItems: 'center', m: 0, p: 0}}>
      <Box component='dt' sx={{m: 0, mr: 2, p: 0, pt: 0.5}}><Typography variant='subtitle2'><b>결과 검색</b></Typography></Box>
      <Box component='dd' sx={{
        m: 0,
        p: 0,
        pr: '10px',
        mr: '6px',
        position: 'relative',
        '::after': {
          content: '"/"',
          position: 'absolute',
          top: '3px',
          right: 0
        }
      }}><Typography variant='body2'>총 <Box component='b' sx={{fontSize: 18}}>{totalCount}</Box> 건</Typography></Box>
      <Box component='dd' sx={{m: 0, p: 0}}><Typography variant='body2'>선택 <Box component='b' sx={{fontSize: 18}}>{selectedCount}</Box> 건</Typography></Box>
    </Box>
  );
};
