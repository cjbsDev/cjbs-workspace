import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SampleData } from './types';
import { sampleColoumns } from './columns';
import { AgeType, CheckType, Search, SelectedFilterValues } from '../../types';
import { Box, Grid, Stack } from '@mui/material';
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
import { POST } from 'api';
import { DataTableBase, DataTableFilter, DataTableMetaFilter } from 'cjbsDSTM';
import SelectedFilterChip from 'src/component/molecules/chip/SelectedFilterChip';
import { useDebounce } from 'src/util/event';
import { PAGE_SIZE, TABLE_HEIGHT } from 'src/const/common';
import ExcelDownloadButton from 'cjbsDSTM/molecules/ExcelDownloadButton';
interface SubjectTableType {
  postData: Search;
  data: SampleData[];
}

const SubjectTable = ({ postData, data }: SubjectTableType) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [sampleData, setSampleData] = useState(data);
  const resultKeyword = useRecoilValue(subjectSearchInputState);
  const [sort, setSort] = useState<string[]>([]);
  const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  const keyword = useRecoilValue<string>(searchInputState);
  const age = useRecoilValue<AgeType>(ageState);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalElements, setTotalElements] = useRecoilState<number | null>(
    subjectTotalElements,
  );

  useEffect(() => {
    getData(checked, keyword, resultKeyword, age, 1, pageSize, []);
    setPageNum(1);
  }, [resultKeyword, keyword, age, pageSize, checked]);

  const getData = useCallback(
    async (
      checked: CheckType[],
      keyword: string,
      resultKeyword: string,
      age: AgeType,
      pageNum: number,
      pageSize: number,
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
          size: pageSize,
          sort,
        },
      };

      const res = await POST('/sample/list', data);
      if (res.success) {
        const resData = res.data;
        console.log('resData > ', resData);
        setSampleData(resData.sampleList);
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

      let newArray = [...filterData, sortString];
      setSort(newArray);
      getData(
        checked,
        keyword,
        resultKeyword,
        age,
        pageNum,
        pageSize,
        newArray,
      );
    },
    [checked, keyword, age, sort, pageNum, pageSize, resultKeyword],
  );

  const onChangePageNum = useCallback(
    (page: number) => {
      console.log('PaginationChangePage > ', page);
      setPageNum(page);
      getData(checked, keyword, resultKeyword, age, page, pageSize, sort);
    },
    [checked, keyword, age, sort, pageSize, resultKeyword],
  );

  const onChangePageSize = useCallback(
    (size: number) => {
      console.log('PaginationChangePage2> ', size);
      setPageSize(size);
      getData(checked, keyword, resultKeyword, age, pageNum, size, sort);
    },
    [checked, keyword, age, sort, resultKeyword, pageNum],
  );

  return (
    <Box>
      <HeaderComponent
        pageNum={pageNum}
        checked={checked}
        keyword={keyword}
        resultKeyword={resultKeyword}
        age={age}
        sort={sort}
      />
      <DataTableBase
        data={sampleData}
        columns={sampleColoumns}
        // onRowClicked={goDetailPage}
        paginationTotalRows={totalElements ? totalElements : 0}
        paginationPerPage={PAGE_SIZE}
        onChangeRowsPerPage={onChangePageSize}
        selectableRows={false}
        sortServer
        paginationServer
        pointerOnHover
        style={{
          overflow: 'auto',
        }}
        fixedHeaderScrollHeight={TABLE_HEIGHT}
        // subHeader
        // subHeaderComponent={HeaderComponent}
        onSort={onChangeSort}
        paginationDefaultPage={pageNum}
        onChangePage={onChangePageNum}
      />
    </Box>
  );
};

const HeaderComponent = ({
  checked,
  keyword,
  resultKeyword,
  age,
  pageNum,
  sort,
}: {
  pageNum: number;
  keyword: string;
  resultKeyword: string;
  age: AgeType;
  checked: CheckType[];
  sort: string[];
}) => {
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

  const findData = checked.filter((item: CheckType) => item.valid === true);

  const filterData: SelectedFilterValues[] = findData.map((item: CheckType) => {
    return { field: item.root, code: item.code };
  });

  const search: Search = {
    filter: filterData,
    keyword: keyword,
    resultKeyword: resultKeyword,
    subjectMinAge: age.subjectMinAge,
    subjectMaxAge: age.subjectMaxAge,
    page: {
      page: 1,
      size: 1,
      sort: [],
    },
  };

  return (
    <Grid container>
      <Grid item xs={12} mb={'10px'}>
        <SelectedFilterChip />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <ExcelDownloadButton
            data={search}
            downloadUrl="/sample/list/download"
          />
          <DataTableMetaFilter
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
