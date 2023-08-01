import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Box, SxProps, Typography } from '@mui/material';

interface Props {
  imgPath: StaticImageData;
  name: string;
  text: string;
}

const DashboardItem = ({ imgPath, name, text }: Props) => {
  return (
    <Box>
      <Box mb={'12px'}>
        <Image src={imgPath} width={35} height={50} alt="Disease" />
      </Box>
      <Box mb={'8px'}>
        <Typography variant="body2">{name}</Typography>
      </Box>
      <Box>
        <Typography variant="h4">{text}</Typography>
      </Box>
    </Box>
  );
};

export default DashboardItem;
