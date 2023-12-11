import React, { useState, useEffect, useCallback } from 'react';
import { SubjectData } from './types';
import { subjectColoumns } from './columns';
import {
  AgeType,
  BMIType,
  CheckType,
  Search,
  SelectedFilterValues,
} from '../../types';
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
  bmiState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';
import { DataTableBase, DataTableMetaFilter } from 'cjbsDSTM';
import { PAGE_SIZE, TABLE_HEIGHT } from 'src/const/common';
import ExcelDownloadButton from 'cjbsDSTM/molecules/ExcelDownloadButton';
import { dataTableEzcxCustomStyles } from '@components/organisms/DataTable/style/dataTableEzcxCustomStyle';
import NoDataView from '../../../../component/molecules/NoDataView';
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
  const bmi = useRecoilValue(bmiState);
  const [totalElements, setTotalElements] = useRecoilState<number | null>(
    subjectTotalElements,
  );
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  useEffect(() => {
    getData(checked, keyword, resultKeyword, age, bmi, 1, pageSize, []);
    setPageNum(1);
  }, [resultKeyword, keyword, age, bmi, pageSize, checked]);

  const getData = useCallback(
    async (
      checked: CheckType[],
      keyword: string,
      resultKeyword: string,
      age: AgeType,
      bmi: BMIType,
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
        bmiMaxValue: bmi.bmiMaxValue,
        bmiMinValue: bmi.bmiMinValue,
        page: {
          page: pageNum,
          size: pageSize,
          sort,
        },
      };

      const res = await POST('/subject/list', data);
      if (res.success) {
        const resData = res.data;
        setSubjectData(resData.subjectList);
        setTotalElements(resData.pageInfo.totalElements);
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
        bmi,
        pageNum,
        pageSize,
        newArray,
      );
    },
    [checked, keyword, sort, age, bmi, pageNum, pageSize, resultKeyword],
  );

  const onChangePageNum = useCallback(
    (page: number) => {
      console.log('PaginationChangePage > ', page);
      setPageNum(page);
      getData(checked, keyword, resultKeyword, age, bmi, page, pageSize, sort);
    },
    [checked, keyword, age, bmi, sort, resultKeyword],
  );

  const onChangePageSize = useCallback(
    (size: number) => {
      console.log('PaginationChangePage2> ', size);
      setPageSize(size);
      getData(checked, keyword, resultKeyword, age, bmi, pageNum, size, sort);
    },
    [checked, keyword, age, bmi, sort, resultKeyword, pageNum],
  );

  return (
    <Box>
      <HeaderComponent
        pageNum={pageNum}
        checked={checked}
        keyword={keyword}
        resultKeyword={resultKeyword}
        age={age}
        bmi={bmi}
        sort={sort}
      />
      <DataTableBase
        data={subjectData}
        columns={subjectColoumns}
        // onRowClicked={goDetailPage}
        paginationTotalRows={totalElements ? totalElements : 0}
        paginationPerPage={PAGE_SIZE}
        customStyles={dataTableEzcxCustomStyles}
        sortServer
        onChangeRowsPerPage={onChangePageSize}
        paginationServer
        pointerOnHover
        highlightOnHover
        fixedHeaderScrollHeight={TABLE_HEIGHT}
        onSort={onChangeSort}
        paginationDefaultPage={pageNum}
        onChangePage={onChangePageNum}
        noDataComponent={<NoDataView />}
      />
    </Box>
  );
};

const HeaderComponent = ({
  checked,
  keyword,
  resultKeyword,
  age,
  bmi,
  pageNum,
  sort,
}: {
  pageNum: number;
  keyword: string;
  resultKeyword: string;
  age: AgeType;
  bmi: BMIType;
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
    bmiMaxValue: bmi.bmiMaxValue,
    bmiMinValue: bmi.bmiMinValue,
    page: {
      page: 1,
      size: 1,
      sort: [],
    },
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <SelectedFilterChip />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <ExcelDownloadButton
            data={search}
            downloadUrl="/subject/list/download"
            size="small"
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
