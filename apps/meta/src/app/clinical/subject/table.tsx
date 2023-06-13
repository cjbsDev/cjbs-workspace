import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DataTableBase, DataTableFilter, Title1 } from '@components/index';
import { SubjectData } from './types';
import { subjectColoumns } from './columns';
import {
  AgeType,
  CheckType,
  Search,
  SelectedFilterValues,
} from '../search/types';
import { Box, Grid, Stack } from '@mui/material';
import SelectedFilterChip from 'src/component/molecules/chip/SelectedFilterChip';
import { POST } from 'api';
import { useDebounce } from 'src/util/event';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  subjectSearchInputState,
  subjectTotalElements,
} from 'src/recoil/SubjectState';
import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';
interface SubjectTableType {
  postData: Search;
  data: SubjectData[];
}

const SubjectTable = ({ postData, data }: SubjectTableType) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [subjectData, setSubjectData] = useState(data);
  const resultKeyword = useRecoilValue(subjectSearchInputState);
  const [sort, setSort] = useState<string[]>([]);
  const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  const keyword = useRecoilValue<string>(searchInputState);
  const age = useRecoilValue<AgeType>(ageState);
  const [totalElements, setTotalElements] = useRecoilState<number | null>(
    subjectTotalElements,
  );

  useEffect(() => {
    getData(checked, keyword, resultKeyword, age, 1, []);
    setPageNum(1);
  }, [resultKeyword, keyword, age, checked]);

  const getData = useCallback(
    async (
      checked: CheckType[],
      keyword: string,
      resultKeyword: string,
      age: AgeType,
      pageNum: number,
      sort: string[],
    ) => {
      const findData = checked.filter((item) => item.valid === true);

      const filterData: SelectedFilterValues[] = findData.map((item) => {
        return { field: item.root, code: item.code };
      });

      const data: Search = {
        ...postData,
        filter: filterData,
        keyword: keyword,
        resultKeyword: resultKeyword,
        subjectMinAge: age.subjectMinAge,
        subjectMaxAge: age.subjectMaxAge,
        page: {
          page: pageNum,
          size: 15,
          sort,
        },
      };

      console.log('POST DATA', data);

      const res = await POST('/subject/list', data);
      if (res.success) {
        const resData = res.data;
        console.log('resData > ', resData);
        setSubjectData(resData.subjectList);
        setTotalElements(resData.pageInfo.totalElements);
      }
    },
    [],
  );

  const onChangeSort = useCallback(
    (sortInfo: any, sortDirection: any) => {
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
      getData(checked, keyword, resultKeyword, age, pageNum, newArray);
    },
    [checked, keyword, age, pageNum, resultKeyword],
  );

  const onChangePageNum = useCallback(
    (page: number) => {
      console.log('PaginationChangePage > ', page);
      setPageNum(page);
      getData(checked, keyword, resultKeyword, age, page, sort);
    },
    [checked, keyword, age, sort, resultKeyword],
  );

  return (
    <Box>
      <HeaderComponent />
      <DataTableBase
        data={subjectData}
        columns={subjectColoumns}
        // onRowClicked={goDetailPage}
        paginationTotalRows={totalElements ? totalElements : 0}
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
        // subHeader
        // subHeaderComponent={HeaderComponent}
        onSort={onChangeSort}
        paginationDefaultPage={pageNum}
        onChangePage={onChangePageNum}
      />
    </Box>
  );
};

const HeaderComponent = () => {
  const [filterText, setFilterText] = useState('');
  const setResultKeyword = useSetRecoilState(subjectSearchInputState);

  const clearFilterText = () => {
    setFilterText('');
  };
  const onChangeFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFilterText(e.target.value);
  };

  const debouncedQuery = useDebounce(filterText, 300);

  useEffect(() => {
    setResultKeyword(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Grid container>
      <Grid item xs={12} mb={'10px'} mt={'4px'}>
        <SelectedFilterChip />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          {/* <ExcelDownloadButton
                  data={data}
                  downloadUrl="/subject/list/download"
                /> */}
          <DataTableFilter
            onFilter={onChangeFilterText}
            onClear={clearFilterText}
            filterText={filterText}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubjectTable;
