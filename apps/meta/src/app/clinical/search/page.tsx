'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Divider, Grid, Stack, Typography, styled } from '@mui/material';
import { POST, fetcherPost } from 'api';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import {
  DataTableBase,
  DataTableMetaFilter,
  Title1,
} from '../../../../../../packages/cjbsDSTM';
import {
  AgeType,
  CheckType,
  Page,
  Search,
  SelectedFilterValues,
  SubjectData,
} from './types';
import { subjectColoumns } from './columns';
import RecentSelect from 'src/component/molecules/select/RecentSelect';
import { FlexGrid } from '@components/atoms/grid/FlexGrid';
import { isNull } from 'src/util/validation';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';

const SearchPage = () => {
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
  const [filterText, setFilterText] = useState('');
  const [studyDiseaseCount, setStudyDiseaseCount] = useState<number>(0);
  // const [studyDiseaseCount, setStudyDiseaseCount] = useState<number>(0);
  // const [studyDiseaseCount, setStudyDiseaseCount] = useState<number>(0);

  const { data, mutate, isLoading } = useSWR(
    ['/common/search', postData],
    fetcherPost,
  );

  console.log('data >>> ', data);

  useEffect(() => {
    if (data && data.data.subjectList)
      setStudyDiseaseCount(data?.data.subjectList.length);
  }, [isLoading]);

  const onChangeFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFilterText(e.target.value);
  };

  const clearFilterText = () => {
    setFilterText('');
  };

  const HeaderComponent = useMemo(() => {
    return (
      <Box>
        <Grid container mb={'41px'}>
          <FlexGrid item xs={12}>
            <Box mr={'8px'}>
              {' '}
              <RecentSelect />
            </Box>
            <DataTableMetaFilter
              onFilter={onChangeFilterText}
              onClear={clearFilterText}
              filterText={filterText}
            />
          </FlexGrid>
          {/* <ClinicalSearchDashboard/> */}
        </Grid>
        <Box
          position={'absolute'}
          sx={{ left: '0px', bottom: '10px' }}
          width={'100%'}
        >
          <Typography variant="subtitle1">
            Study / Disease ({studyDiseaseCount})
          </Typography>
        </Box>
      </Box>
    );
  }, [studyDiseaseCount]);

  if (isLoading) {
    return <Skeleton variant="rectangular" width={100} height={100} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    const subjectData: SubjectData[] = data.data.subjectList;

    return (
      <DataTableBase
        title={<Title1 titleName={`Search results`} />}
        data={subjectData}
        columns={subjectColoumns}
        // onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        subHeader
        subHeaderComponent={HeaderComponent}
        // paginationResetDefaultPage={resetPaginationToggle}
      />
    );
  }
};

export default SearchPage;
