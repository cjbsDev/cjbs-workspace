'use client';
import React from 'react';
import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainMenuData from './data/main_menu.json';
import SubMenuData from './data/sub_menu.json';
import SideSearchInput from '../molecules/sidemenu/SideSearchInput';
import LayoutTempleate from '../templeate/layout/layoutTempleate';
import SubjectSideMenu from '../organisms/menu/SubjectSideMenu';
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const SideMenuBox = styled(Box)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const SearchBox = styled(SideMenuBox)`
  height: 78px;
  padding: 16px 25px 0px 25px;
`;

const SubjectLayout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <LayoutTempleate>
      <MenuBox
        sx={{
          display: 'flex',
        }}
      >
        <LayoutTempleate.Menu
          sx={{ background: '#343A40' }}
          fontColor='white'
          data={MainMenuData}
          onLogo={true}
          type={'MAIN'}
        />
      </MenuBox>
      <Box display={'flex'} height={'100%'}>
        <LayoutTempleate.Side>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '0px',
            }}
          >
            <SideMenuBox>
              <SubjectSideMenu />
            </SideMenuBox>
          </Box>
        </LayoutTempleate.Side>
        <LayoutTempleate.Contents>
          <MenuBox
            sx={{
              width: '100%',
              height: '55px',
            }}
          >
            <LayoutTempleate.Menu type={'SUB'} centered={true} data={SubMenuData} />
          </MenuBox>
          <Box sx={{ padding: '17px 0px 0px 0px', overflow: 'auto' }}>{children}</Box>
        </LayoutTempleate.Contents>
      </Box>
    </LayoutTempleate>
  );
};

const MenuBox = styled(Box)`
  height: 55px;
  width: 100%;
  border-bottom: 1px solid #ced4da;
`;

export default SubjectLayout;
