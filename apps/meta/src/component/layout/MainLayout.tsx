'use client';
import React from 'react';
import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainMenuData from './data/main_menu.json';
import SubMenuData from './data/sub_menu.json';
import BoardTempleate from '../templeate/layout/LayoutTempleate';
import SideMenu from '../organisms/clinical/dashboard/menu/SideMenu';
import SideSearchInput from '../molecules/sidemenu/SideSearchInput';
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const BottomBox = styled(Box)`
  width: 288px;
  height: 145px;
  border-top: 1px solid #ced4da;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const SideMenuBox = styled(Box)`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0px 25px 0px 25px;
`;

export const SearchBox = styled(SideMenuBox)`
  height: 78px;
  padding: 16px 25px 0px 25px;
`;

const MainLayout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <BoardTempleate>
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
          type={'MAIN'}
        />
      </MenuBox>
      <Box display={'flex'} height={'100%'}>
        <BoardTempleate.Side>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <SearchBox>
              <SideSearchInput />
            </SearchBox>
            <Divider variant="fullWidth" />
            <SideMenuBox>
              <SideMenu />
            </SideMenuBox>
            {/* <BottomBox>
              <FlexBox
                sx={{
                  width: '100%',
                }}
              >
                <Button
                  sx={{ width: '238px', height: '40px' }}
                  size="large"
                  variant="contained"
                >
                  Search
                </Button>
              </FlexBox>
            </BottomBox> */}
          </Box>
        </BoardTempleate.Side>
        <BoardTempleate.Contents>
          <MenuBox
            sx={{
              width: '100%',
              height: '55px',
            }}
          >
            <BoardTempleate.Menu
              type={'SUB'}
              centered={true}
              data={SubMenuData}
            />
          </MenuBox>
          <Box sx={{ padding: '38px 40px 0px 40px' }}>{children}</Box>
        </BoardTempleate.Contents>
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
