import * as React from 'react';
import BoardTitle from '../atoms/board/BoardTitle';
import NoResult from '../atoms/board/NoResult';
import SearchInput from '../atoms/search/SearchInput';
import BoardTabs from '../molecules/board/BoardTabs';
import { Grid } from '@mui/material';
import ExcelDownload from '../../../../../../packages/cjbsDSTM/atoms/excel/ExcelDownload';

const Board = ({ children }: { children: React.ReactNode }) => {
  return <Grid>{children}</Grid>;
};

const BoardGrid = ({
  children,
  css = {},
  xs = 12,
}: {
  children: React.ReactNode;
  css?: CSS;
  xs?: number;
}) => {
  return (
    <Grid css={css} xs={xs}>
      {children}
    </Grid>
  );
};

const Header = ({
  children,
  css = { pl: '10px', pr: '10px' },
}: {
  children: React.ReactNode;
  css?: CSS;
}) => {
  return <Grid.Container css={css}>{children}</Grid.Container>;
};

const TableContainer = ({ children }: { children: React.ReactNode }) => {
  return <Grid xs={12}>{children}</Grid>;
};

Board.Grid = BoardGrid;
Board.Header = Header;
Board.TableContainer = TableContainer;
Board.Tabs = BoardTabs;
Board.Search = SearchInput;
Board.Title = BoardTitle;
Board.Excel = ExcelDownload;
Board.NoData = NoResult;

export default Board;
