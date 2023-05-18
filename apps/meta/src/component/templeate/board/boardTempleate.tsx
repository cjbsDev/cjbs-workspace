import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const ContainerBox = styled(Box)`
  height: 98vh;
  width: 100%;
  display: flex;
  overflow: hidden;
`;

const SideMainBox = styled(Box)`
  overflow: auto;
  width: 294px;
  min-width: 294px;
  background-color: white;
  border-right: 1px solid #dee2e6;
  padding: 72px 21px 0px 21px;
`;

const TableBox = styled(Box)`
  background-color: ${grey[100]};
  padding: 55px 40px 0px 40px;
  width: 100%;
  overflow: scroll;
`;

interface ChildernProps {
  children: React.ReactNode;
}

const Side = ({ children }: ChildernProps) => {
  return <SideMainBox>{children}</SideMainBox>;
};

const Content = ({ children }: ChildernProps) => {
  return <TableBox>{children}</TableBox>;
};

const MainContainer = ({ children }: ChildernProps) => {
  return <ContainerBox>{children}</ContainerBox>;
};
//
const BoardTempleate = ({ children }: ChildernProps) => {
  return <BoardTempleate.Container>{children}</BoardTempleate.Container>;
};

export default BoardTempleate;

BoardTempleate.Container = MainContainer;
BoardTempleate.Side = Side;
BoardTempleate.Contents = Content;
