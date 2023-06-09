'use client';
import React, { useState, useMemo, useEffect } from 'react';
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
import { SubjectData } from './types';
import { subjectColoumns } from './columns';
import ExcelDownloadButton from '@components/molecules/ExcelDownloadButton';
import { useRecoilValue } from 'recoil';
import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/selectedFilterState';
import {
  AgeType,
  CheckType,
  Search,
  SelectedFilterValues,
} from '../search/types';
import { isNull } from 'src/util/validation';
const Subject = () => {
  const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  const keyword = useRecoilValue<string>(searchInputState);
  const age = useRecoilValue<AgeType>(ageState);
  const page = null;

  const findData = checked.filter((item) => item.valid === true);

  const filterData: SelectedFilterValues[] = findData.map((item) => {
    return { field: item.root, code: item.code };
  });

  const subjectMinAge = !isNull(age.subjectMinAge) ? age.subjectMinAge : null;
  const subjectMaxAge = !isNull(age.subjectMaxAge) ? age.subjectMaxAge : null;
  const postData: Search = {
    subjectMinAge: subjectMinAge,
    subjectMaxAge: subjectMaxAge,
    resultKeyword: null,
    keyword: keyword,
    filter: filterData,
    page: null,
  };

  //const { data: session, status } = useSession();
  const [subjectCount, setSubjectCount] = useState<number>(0);
  // const [studyDiseaseCount, setStudyDiseaseCount] = useState<number>(0);
  // const [studyDiseaseCount, setStudyDiseaseCount] = useState<number>(0);

  const { data, mutate, isLoading } = useSWR(
    ['/subject/list', null],
    fetcherPost,
  );

  useEffect(() => {
    const pageInfo = data?.data.pageInfo;
    if (pageInfo) {
      setSubjectCount(pageInfo.totalElements);
    }
  }, []);

  console.log(' data > ', data?.data.pageInfo);
  //const { data: session, status } = useSession();
  const [filterText, setFilterText] = useState('');
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
      <Grid container>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <ExcelDownloadButton downloadUrl="/subject/list/download" />
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

    const filteredData: SubjectData[] = data.data.subjectList;

    return (
      <DataTableBase
        title={
          <Title1
            titleName={`Subject list(${subjectCount.toLocaleString()})`}
          />
        }
        data={filteredData}
        columns={subjectColoumns}
        // onRowClicked={goDetailPage}
        //paginationServer
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
