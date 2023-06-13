import React from 'react';
import { Box, Grid, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import MenuTabs from '../../molecules/tabs/MenuTabs';
import CJBSLogo from '../../atoms/CJBSLogo';

const Side = ({ children }: SideProps) => {
  return <SideMainBox>{children}</SideMainBox>;
};

const Content = ({ children }: ContentsProps) => {
  return <ContentsWrapper>{children}</ContentsWrapper>;
};

const MainContainer = ({ children }: ChildernProps) => {
  return <ContainerBox>{children}</ContainerBox>;
};

const LayoutTempleate = ({ children }: ChildernProps) => {
  return <LayoutTempleate.Container>{children}</LayoutTempleate.Container>;
};

export default LayoutTempleate;

LayoutTempleate.Container = MainContainer;
LayoutTempleate.Side = Side;
LayoutTempleate.Menu = MenuTabs;
LayoutTempleate.Contents = Content;

const ContainerBox = styled(Box)`
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const SideMainBox = styled(Box)`
  overflow: hidden;
  height: 100%;
  width: 288px;
  min-width: 288px;
  background-color: white;
  padding: '24px';
  border-right: 1px solid #dee2e6;
`;

const ContentsWrapper = styled(Box)`
  height: 100%;
  width: 100%;
  background-color: white;
`;

const SearchBox = styled(Box)`
  padding: 55px 40px 0px 40px;
  height: 60px;
  border-bottom: 1px solid #e2e2e2;
`;

interface SideProps {
  children: React.ReactNode;
}

interface ChildernProps {
  children: React.ReactNode;
}

interface ContentsProps {
  children: React.ReactNode;
}
