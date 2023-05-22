'use client';
import React from 'react';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainMenuData from './mainMenu.json';
import SubMenuData from './subMenu.json';
import BoardTempleate from '../templeate/layout/layoutTempleate';
interface LayoutProps {
  children: React.ReactNode;
}
const MainLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <BoardTempleate>
      <BoardTempleate.Side onLogo={true}>
        <Typography>aa</Typography>
      </BoardTempleate.Side>
      <Box sx={{ width: '100%' }}>
        <MenuBox
          sx={{
            display: 'flex',
          }}
        >
          <BoardTempleate.Menu data={MainMenuData} />
        </MenuBox>
        <MenuBox
          sx={{
            width: '100%',
            height: '55px',
          }}
        >
          <BoardTempleate.Menu centered={true} data={SubMenuData} />
        </MenuBox>
        <BoardTempleate.Contents>{children}</BoardTempleate.Contents>
      </Box>
    </BoardTempleate>
  );
};

const MenuBox = styled(Box)`
  height: 55px;
  width: 100%;
  border-bottom: 1px solid #ced4da;
`;

export default MainLayout;
