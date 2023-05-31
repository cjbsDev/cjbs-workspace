'use client';
import React from 'react';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainMenuData from './mainMenu.json';
import SubMenuData from './subMenu.json';
import BoardTempleate from '../templeate/layout/layoutTempleate';
import DashboardSideMenu from '../organisms/clinical/dashboard/sidemenu/dashboardSideMenu';
import Button from '@mui/material/Button';
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const BottomBox = styled(Box)`
  width: 100%;
  height: 88px;
  position: absolute;
  border-top: 1px solid #ced4da;
  bottom: 50px;
`;

const SideMenuBox = styled(Box)`
  width: 100%;
  height: 100%;
  padding: 16px 25px 0px 25px;
`;

const MainLayout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <BoardTempleate>
      <Box sx={{ width: '100%' }}>
        <MenuBox
          sx={{
            display: 'flex',
          }}
        >
          <BoardTempleate.Menu
            sx={{ background: '#343A40' }}
            fontColor="white"
            data={MainMenuData}
            onLogo={true}
          />
        </MenuBox>
      </Box>
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <BoardTempleate.Side>
          <SideMenuBox>
            <DashboardSideMenu />
          </SideMenuBox>
          <BottomBox>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <Button
                sx={{ width: '238px', height: '40px' }}
                size="large"
                variant="contained"
              >
                Search
              </Button>
            </Box>
          </BottomBox>
        </BoardTempleate.Side>
        <Box width={'100%'}>
          <MenuBox
            sx={{
              width: '100%',
              height: '55px',
            }}
          >
            <BoardTempleate.Menu centered={true} data={SubMenuData} />
          </MenuBox>
          <BoardTempleate.Contents>
            {title && (
              <Box sx={{ mb: '21px' }}>
                <Typography variant="title1">{title}</Typography>
              </Box>
            )}
            {children}
          </BoardTempleate.Contents>
        </Box>
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
