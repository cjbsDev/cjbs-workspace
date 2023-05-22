import React from 'react';
import { Box, Grid, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import MenuTabs from '../../molecules/tabs/MenuTabs';
import CJBSLogo from '../../atoms/CJBSLogo';

const Side = ({ children, onLogo }: SideProps) => {
  return (
    <SideMainBox>
      {onLogo && <CJBSLogo />}
      {children}
    </SideMainBox>
  );
};

const Content = ({ children }: ContentsProps) => {
  return <ContentsWrapper>{children}</ContentsWrapper>;
};

const MainContainer = ({ children }: ChildernProps) => {
  return <ContainerBox>{children}</ContainerBox>;
};

const BoardTempleate = ({ children }: ChildernProps) => {
  return <BoardTempleate.Container>{children}</BoardTempleate.Container>;
};

export default BoardTempleate;

BoardTempleate.Container = MainContainer;
BoardTempleate.Side = Side;
BoardTempleate.Menu = MenuTabs;
BoardTempleate.Contents = Content;

const ContainerBox = styled(Box)`
  display: flex;
  height: 101vh;
  width: 100%;
  overflow: hidden;
`;

const SideMainBox = styled(Box)`
  overflow: auto;
  height: 100%;
  width: 288px;
  min-width: 288px;
  background-color: white;
  border-right: 1px solid #dee2e6;
  padding: 16px 25px 0px 25px;
`;

const ContentsWrapper = styled(Box)`
  padding: 36px 40px 0px 40px;
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
  onLogo: boolean;
}

interface ChildernProps {
  children: React.ReactNode;
}

interface ContentsProps {
  children: React.ReactNode;
}
