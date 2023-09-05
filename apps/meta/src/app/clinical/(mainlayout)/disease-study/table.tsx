import React, { useState, useEffect, useCallback } from 'react';
import { StudyCount, StudyData } from './types';
import { conditionalRowStyles, studyColoumns } from './columns';
import { AgeType, CheckType, Search, SelectedFilterValues } from '../../types';
import { Box, Grid, Stack } from '@mui/material';
import SelectedFilterChip from 'src/component/molecules/chip/SelectedFilterChip';
import { POST } from 'api';
import { useDebounce } from 'src/util/event';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';
import { DataTableBase, DataTableMetaFilter } from 'cjbsDSTM';
import ExcelDownloadButton from 'cjbsDSTM/molecules/ExcelDownloadButton';
import { PAGE_SIZE, TABLE_HEIGHT } from 'src/const/common';
import {
  studyCountState,
  studySearchInputState,
  studyTotalElementsState,
} from 'src/recoil/StudyState';
interface StudyTableType {
  postData: Search;
  data: StudyData[];
}

const StudyTable = ({ postData, data }: StudyTableType) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [studyData, setStudyData] = useState(data);
  const resultKeyword = useRecoilValue(studySearchInputState);
  const [sort, setSort] = useState<string[]>([]);
  const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  const keyword = useRecoilValue<string>(searchInputState);
  const age = useRecoilValue<AgeType>(ageState);
  const [studyCount, setStudyCount] = useRecoilState<StudyCount | null>(
    studyCountState,
  );
  const [totalElements, setTotalElements] = useRecoilState<number>(
    studyTotalElementsState,
  );
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    getData(checked, keyword, resultKeyword, age, 1, pageSize, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setPageNum(1);
  }, [resultKeyword, keyword, age, pageSize, checked]);

  const onChangePageNum = useCallback(
    (page: number) => {
      setPageNum(page);
      getData(checked, keyword, resultKeyword, age, page, pageSize, sort);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [checked, keyword, age, sort, pageSize, resultKeyword],
  );

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
          size: 1000,
          sort,
        },
      };

      const res = await POST('/disease/study/list', data);
      if (res.success) {
        const resData = res.data;
        console.log('resData > ', resData);
        setStudyData(resData.diseaseStudies);
        setStudyCount({
          diseaseCount: resData.diseaseCount,
          studyCount: resData.studyCount,
        });
        setTotalElements(resData.pageInfo.totalElemnts);
      }
    },
    [],
  );

  const onChangeSort = useCallback(
    (sortInfo: any, sortDirection: any) => {
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
    [checked, sort, keyword, age, pageNum, pageSize, resultKeyword],
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
    <Box sx={{ overflow: 'auto' }}>
      <HeaderComponent />
      <DataTableBase
        data={studyData}
        columns={studyColoumns}
        // onRowClicked={goDetailPage}
        conditionalRowStyles={conditionalRowStyles}
        paginationTotalRows={totalElements ? totalElements : 0}
        paginationPerPage={PAGE_SIZE}
        onChangeRowsPerPage={onChangePageSize}
        selectableRows={false}
        pagination={false}
        // paginationServer
        pointerOnHover
        highlightOnHover
        fixedHeaderScrollHeight={TABLE_HEIGHT}
        onSort={onChangeSort}
        paginationDefaultPage={pageNum}
        onChangePage={onChangePageNum}
      />
    </Box>
  );
};

const HeaderComponent = ({}: {}) => {
  const [filterText, setFilterText] = useState('');
  const setResultKeyword = useSetRecoilState(studySearchInputState);
  const resultKeyword = useRecoilValue(studySearchInputState);
  const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  const keyword = useRecoilValue<string>(searchInputState);
  const age = useRecoilValue<AgeType>(ageState);

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
      size: PAGE_SIZE,
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
            downloadUrl="/disease/study/list/download"
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

export default StudyTable;
