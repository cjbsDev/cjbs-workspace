'use client';
import React, { useState, useMemo } from 'react';
import { Box, Divider, Grid, Stack, styled } from '@mui/material';
import { fetcherPost } from 'api';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import {
  DataTableBase,
  DataTableFilter,
  Title1,
} from '../../../../../../packages/cjbsDSTM';
import { SubjectData } from './types';
import { subjectColoumns } from './columns';

const InfoGrid = styled(Grid)`
  box-sizing: border-box;
  width: 100%;
  height: 61px;
  left: 328px;
  top: 240px;
  background: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 2px;
  margin-top: 15px;
`;

const Subject = () => {
  //const { data: session, status } = useSession();
  const [filterText, setFilterText] = useState('');
  const { data, mutate, isLoading } = useSWR('/subject/list', fetcherPost);
  //const { data: user } = useSWR(['/api/user', token], ([url, token]) => fetchWithToken(url, token))
  const onChangeFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFilterText(e.target.value);
  };

  const clearFilterText = () => {
    setFilterText('');
  };

  const headerComponent = useMemo(() => {
    return (
      <Grid container mb={'41px'}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <DataTableFilter
            onFilter={onChangeFilterText}
            onClear={clearFilterText}
            filterText={filterText}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <InfoGrid container>
            <Grid item xs={3}></Grid>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ mr: '-1px' }}
            />
            <Grid item xs={3}></Grid>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ mr: '-1px' }}
            />
            <Grid item xs={3}></Grid>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ mr: '-1px' }}
            />
            <Grid item xs={3}></Grid>
          </InfoGrid>
        </Grid>
      </Grid>
    );
  }, []);

  if (isLoading) {
    return <Skeleton variant="rectangular" width={100} height={100} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    const filteredData: SubjectData[] = data.data.subjectList;

    return (
      <DataTableBase
        title={<Title1 titleName={`Search results`} />}
        data={filteredData}
        columns={subjectColoumns}
        // onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        subHeader
        subHeaderComponent={headerComponent}
        // paginationResetDefaultPage={resetPaginationToggle}
      />
    );
  }
};

export default Subject;
