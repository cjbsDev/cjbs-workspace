'use client';
import React, { useState, useMemo } from 'react';
import { Grid, Stack } from '@mui/material';
import { fetcherPost } from 'api';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import {
  DataTableBase,
  DataTableFilter,
  Title1,
} from '../../../../../../packages/cjbsDSTM';
import { subjectColoumns } from './columns';
import ExcelDownloadButton from '@components/molecules/ExcelDownloadButton';
import { SampleData } from './types';
const Sample = () => {
  //const { data: session, status } = useSession();
  const [filterText, setFilterText] = useState('');
  const { data, mutate, isLoading } = useSWR('/sample/list', fetcherPost);

  const onChangeFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFilterText(e.target.value);
  };

  const clearFilterText = () => {
    setFilterText('');
  };

  const headerComponent = useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <ExcelDownloadButton downloadUrl="/sample/list/download" />
            <DataTableFilter
              onFilter={onChangeFilterText}
              onClear={clearFilterText}
              filterText={filterText}
            />
          </Stack>
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

    console.log('SampleData > ', data);

    const filteredData: SampleData[] = data.data.subjectList;

    return (
      <DataTableBase
        title={<Title1 titleName={`Subject list(${data.data.pageInfo})`} />}
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

export default Sample;
