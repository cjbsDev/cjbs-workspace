import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AgeType, CheckType, Search, SelectedFilterValues } from '../../types';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ageState,
  resultSearchInputState,
  searchInputState,
  searchNoResultState,
  searchPageKeyDownState,
  searchPageTextState,
  selectedFilterState,
} from 'src/recoil/SearchState';
import { POST } from 'api';
import { DataTableBase, DataTableMetaFilter } from 'cjbsDSTM';
import SelectedFilterChip from 'src/component/molecules/chip/SelectedFilterChip';
import { useDebounce } from 'src/util/event';
import ClinicalSearchDashboard, {
  DashboardItem,
} from 'src/component/organisms/clinical/search/ClinicalSearchDashboard';
import { StudyData } from '../disease-study/types';
import { FlexGrid } from 'cjbsDSTM/atoms/grid/FlexGrid';
import {
  conditionalRowStyles,
  studyColoumns,
  studyColoumnsNoSort,
} from '../disease-study/columns';
import { FlexBox } from 'cjbsDSTM/atoms/box/FlexBox';
import MyIcon from 'icon/MyIcon';
import { SampleData } from '../sample/types';
import { sampleColoumns, sampleColoumnsNoSort } from '../sample/columns';
import { SubjectData } from '../subject/types';
import { subjectColoumns, subjectColoumnsNoSort } from '../subject/columns';
import { useRouter } from 'next/navigation';
import { dataTableEzcxCustomStyles } from '@components/organisms/DataTable/style/dataTableEzcxCustomStyle';
interface SubjectTableType {
  data: any;
}

const SearchTable = ({ data }: SubjectTableType) => {
  const dataInfo = data;

  const router = useRouter();
  // const [searchPageKeydown, setSearchPageKeydown] = useRecoilState(searchPageKeyDownState);
  // const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  // const keyword = useRecoilValue<string>(searchInputState);
  // const age = useRecoilValue<AgeType>(ageState);
  const [studyData, setStudyData] = useState<StudyData[]>(
    dataInfo.diseaseStudy,
  );
  const [subjectData, setSubjectData] = useState<SubjectData[]>(
    dataInfo.subjectList,
  );
  const [sampleData, setSampleData] = useState<SampleData[]>(
    dataInfo.sampleList,
  );
  const [studyCount, setStudyCount] = useState<number>(dataInfo.studyCount);
  const [diseaseCount, setDiseaseCount] = useState<number>(
    dataInfo.diseaseCount,
  );
  const [subjectCount, setSubjectCount] = useState<number>(
    dataInfo.subjectCount,
  );
  const [sampleCount, setSampleCount] = useState<number>(dataInfo.sampleCount);
  //const [isNoResult, setIsNoResult] = useRecoilState<boolean>(searchNoResultState);

  // useEffect(() => {
  //   if (searchPageKeydown !== 'Enter') {
  //     getData(checked, keyword, resultKeyword, age, []);
  //   } else {
  //     setSearchPageKeydown('');
  //   }
  // }, [resultKeyword, searchPageKeydown, keyword, age, checked]);

  const getData = useCallback(
    async (
      checked: CheckType[],
      keyword: string,
      resultKeyword: string,
      age: AgeType,
      sort: string[],
    ) => {
      const findData = checked.filter((item) => item.valid === true);

      const filterData: SelectedFilterValues[] = findData.map((item) => {
        return { field: item.root, code: item.code };
      });

      const data: Search = {
        filter: filterData,
        keyword: keyword,
        resultKeyword: resultKeyword,
        subjectMinAge: age.subjectMinAge,
        subjectMaxAge: age.subjectMaxAge,
        page: {
          page: 1,
          size: 5,
          sort,
        },
      };

      const res = await POST('/common/search', data);
      if (res.success) {
        const resData = res.data;
        if (
          resData.subjectCount === 0 &&
          resData.diseaseCount === 0 &&
          resData.sampleCount === 0 &&
          resData.studyCount === 0
        ) {
          //      setIsNoResult(true);
        } else {
          setSubjectData(resData.subjectList);
          setSampleData(resData.sampleList);
          setStudyData(resData.diseaseStudy);
          setStudyCount(resData.studyCount);
          setSubjectCount(resData.subjectCount);
          setSampleCount(resData.sampleCount);
          setDiseaseCount(resData.diseaseCount);
        }
      }
    },
    [],
  );

  const moveStudyPage = () => {
    //router.push('/clinical/disease-study');
    router.push('/clinical/disease-study');
  };

  const moveSubjectPage = () => {
    // router.push('/clinical/subject');
    router.push('/clinical/subject');
  };

  const moveSamplePage = () => {
    // router.push('/clinical/sample');
    router.push('/clinical/sample');
  };
  const dashboardData: DashboardItem[] = [
    {
      icon: 'disease',
      name: 'Disease',
      count: diseaseCount,
    },
    {
      icon: 'study',
      name: 'Study',
      count: studyCount,
    },
    {
      icon: 'profile-circle',
      name: 'Subject',
      count: subjectCount,
    },
    {
      icon: 'sample',
      name: 'Sample',
      count: sampleCount,
    },
  ];

  return (
    <Box sx={{ paddingBottom: 6 }}>
      <Box sx={{ marginBottom: 5 }}>
        <HeaderComponent data={dashboardData} />
        <Typography mb={'11px'} variant="subtitle1">
          Disease / Study{' '}
          {`(${
            diseaseCount.toLocaleString() + ' / ' + studyCount.toLocaleString()
          })`}
        </Typography>
        <DataTableBase
          data={studyData}
          columns={studyColoumnsNoSort}
          // onRowClicked={goDetailPage}
          pagination={false}
          customStyles={dataTableEzcxCustomStyles}
          pointerOnHover
          highlightOnHover
          selectableRows={false}
          conditionalRowStyles={conditionalRowStyles}
          // paginationResetDefaultPage={resetPaginationToggle}
        />
        {dataInfo.studyCount > 5 && (
          <FlexBox mt={'20px'}>
            <Button
              onClick={moveStudyPage}
              variant="outlined"
              size="small"
              color="secondary"
              endIcon={<MyIcon icon="arrow-right" size={18} color={'black'} />}
            >
              <Typography variant="body2"> 결과 더보기</Typography>
            </Button>
          </FlexBox>
        )}
      </Box>
      <Box sx={{ marginBottom: 5 }}>
        <Typography mb={'11px'} variant="subtitle1">
          Subject {`(${subjectCount.toLocaleString()})`}
        </Typography>
        <DataTableBase
          data={subjectData}
          columns={subjectColoumnsNoSort}
          // onRowClicked={goDetailPage}
          pagination={false}
          customStyles={dataTableEzcxCustomStyles}
          pointerOnHover
          selectableRows={false}
          highlightOnHover
          // paginationResetDefaultPage={resetPaginationToggle}
        />
        {dataInfo.subjectCount > 5 && (
          <FlexBox mt={'20px'}>
            <Button
              onClick={moveSubjectPage}
              variant="outlined"
              size="small"
              color="secondary"
              endIcon={<MyIcon icon="arrow-right" size={18} color={'black'} />}
            >
              <Typography variant="body2"> 결과 더보기</Typography>
            </Button>
          </FlexBox>
        )}
      </Box>
      <Box sx={{ marginBottom: 5 }}>
        <Typography mb={'11px'} variant="subtitle1">
          Sample {`(${sampleCount.toLocaleString()})`}
        </Typography>
        <DataTableBase
          data={sampleData}
          columns={sampleColoumnsNoSort}
          // onRowClicked={goDetailPage}
          pagination={false}
          customStyles={dataTableEzcxCustomStyles}
          pointerOnHover
          selectableRows={false}
          highlightOnHover
          // paginationResetDefaultPage={resetPaginationToggle}
        />
        {dataInfo.sampleCount > 5 && (
          <FlexBox mt={'20px'}>
            <Button
              onClick={moveSamplePage}
              variant="outlined"
              size="small"
              color="secondary"
              endIcon={<MyIcon icon="arrow-right" size={18} color={'black'} />}
            >
              <Typography variant="body2"> 결과 더보기</Typography>
            </Button>
          </FlexBox>
        )}
      </Box>
    </Box>
  );
};

const HeaderComponent = ({ data }: { data: DashboardItem[] }) => {
  const [filterText, setFilterText] = useState('');
  const setResultKeyword = useSetRecoilState(resultSearchInputState);

  const clearFilterText = () => {
    setFilterText('');
  };
  const onChangeFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const debouncedQuery = useDebounce(filterText, 300);

  useEffect(() => {
    setResultKeyword(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Box>
      <Box mt={'18px'}>
        <SelectedFilterChip />
      </Box>
      <Grid container mb={'41px'} mt={'10px'}>
        <FlexGrid sx={{ justifyContent: 'flex-end' }} item xs={12}>
          {/* <Box mr={'8px'}>
            {' '}
            <RecentSelect />
          </Box> */}
          <DataTableMetaFilter
            onFilter={onChangeFilterText}
            onClear={clearFilterText}
            filterText={filterText}
          />
        </FlexGrid>
        <ClinicalSearchDashboard data={data} />
      </Grid>
    </Box>
  );
};

export default SearchTable;
