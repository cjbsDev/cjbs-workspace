import { Box, Typography } from '@mui/material';
import React from 'react';
import { SxProps } from '@mui/material';

const Title = ({ children, sx }: { sx?: SxProps; children: React.ReactNode }) => {
  return (
    <Box sx={{ mb: '0px', ...sx }}>
      <Typography variant='title1'>{children}</Typography>
    </Box>
  );
};

export default Title;
