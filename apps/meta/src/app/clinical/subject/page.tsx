'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
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
  const [pageNum, setPageNum] = useState<number>(1);
  const [sort, setSort] = useState<string[]>([]);

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
    resultKeyword: '',
    keyword: keyword,
    filter: filterData,
    page: {
      page: pageNum,
      size: 15,
      sort: sort,
    },
  };

  //const { data: session, status } = useSession();

  // const [studyDiseaseCount, setStudyDiseaseCount] = useState<number>(0);
  // const [studyDiseaseCount, setStudyDiseaseCount] = useState<number>(0);

  const { data, mutate, isLoading } = useSWR(
    ['/subject/list', postData],
    fetcherPost,
  );

  // useEffect(() => {
  //   const pageInfo = data?.data.pageInfo;
  //   if (pageInfo) {
  //     setSubjectCount(pageInfo.totalElements);
  //   }
  // }, [isLoading]);

  const subjectCount = data?.data.pageInfo.totalElements;
  const [filterText, setFilterText] = useState('');
  const onChangeFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFilterText(e.target.value);
  };

  const clearFilterText = () => {
    setFilterText('');
  };

  const onChangePage = (page: number) => {
    setPageNum(page);
  };

  const onChangeSort = (sortInfo: any, sortDirection: any) => {
    console.log('sort > ', sortInfo);
    console.log('sortDirection > ', sortDirection);
    const sortName = sortInfo.name;
    const sortString = `${sortInfo.name + ',' + sortDirection}`;
    const temp = [...sort];
    const filterData = temp.filter((item) => {
      //이미들어가있는 컬럼은 삭제
      if (item.indexOf(sortName) === -1) {
        return true;
      }
    });

    let newArray = [...new Set(filterData), sortString];
    setSort(newArray);
  };

  const HeaderComponent = useMemo(() => {
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

  console.log('pnagenum ', pageNum);

  if (isLoading) {
    return <Skeleton variant="rectangular" width={100} height={100} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    const filteredData: SubjectData[] = data.data.subjectList;

    return (
      <Box overflow={'auto'}>
        <DataTableBase
          title={
            <Title1
              titleName={`Subject list(${subjectCount.toLocaleString()})`}
            />
          }
          data={filteredData}
          columns={subjectColoumns}
          // onRowClicked={goDetailPage}
          paginationTotalRows={subjectCount}
          paginationPerPage={15}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
          sortServer
          paginationServer
          pointerOnHover
          highlightOnHover
          style={{
            overflow: 'auto',
          }}
          subHeader
          onSort={onChangeSort}
          paginationDefaultPage={pageNum}
          subHeaderComponent={HeaderComponent}
          onChangePage={onChangePage}
        />
      </Box>
    );
  }
};

export default Subject;
