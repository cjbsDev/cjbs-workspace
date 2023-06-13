import { Box, Typography } from '@mui/material';
import React from 'react';

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ mb: '21px' }}>
      <Typography variant="title1">{children}</Typography>
    </Box>
  );
};

export default Title;
