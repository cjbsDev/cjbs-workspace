'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { POST, fetcherPost } from 'api';
import useSWRMutation from 'swr/mutation';
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
import { subjectTotalElements } from 'src/recoil/SubjectState';

import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';

import {
  AgeType,
  CheckType,
  Search,
  SelectedFilterValues,
} from '../search/types';
import { isNull } from 'src/util/validation';
import { useDebounce } from 'src/util/event';
import SelectedFilterChip from 'src/component/molecules/chip/SelectedFilterChip';
import SubjectTable from './table';

export async function getSubjectList(url: string, { arg }: { arg: Search }) {
  return await fetcherPost([url, arg]);
}

const Subject = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  const keyword = useRecoilValue<string>(searchInputState);
  const age = useRecoilValue<AgeType>(ageState);
  const totalElements = useRecoilValue<number | null>(subjectTotalElements);

  const findData = checked.filter((item) => item.valid === true);

  const filterData: SelectedFilterValues[] = findData.map((item) => {
    return { field: item.root, code: item.code };
  });

  const postData: Search = {
    subjectMinAge: !isNull(age.subjectMinAge) ? age.subjectMinAge : null,
    subjectMaxAge: !isNull(age.subjectMaxAge) ? age.subjectMaxAge : null,
    resultKeyword: '',
    keyword: keyword,
    filter: filterData,
    page: {
      page: 1,
      size: 15,
      sort: [],
    },
    list: [],
  };

  //const { data: session, status } = useSession();

  // const [studyDiseaseCount, setStudyDiseaseCount] = useState<number>(0);
  // const [studyDiseaseCount, setStudyDiseaseCount] = useState<number>(0);

  const { trigger, isMutating, data } = useSWRMutation(
    '/subject/list',
    getSubjectList,
  );

  // const { data, mutate, isLoading } = useSWRMutation(
  //   ['/subject/list', postData],
  //   fetcherPost,
  // );

  useEffect(() => {
    trigger(postData);
  }, []);

  useEffect(() => {
    !isMutating && setPageLoading(false);
  }, [isMutating]);

  // useEffect(() => {
  //   const pageInfo = data?.data.pageInfo;
  //   if (pageInfo) {
  //     setSubjectCount(pageInfo.totalElements);
  //   }
  // }, [isLoading]);

  if (pageLoading) {
    return <Skeleton variant="rectangular" width={'100%'} height={500} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    const _totalElements = totalElements
      ? totalElements.toLocaleString()
      : data?.data.pageInfo.totalElements.toLocaleString();
    const filteredData: SubjectData[] = data.data.subjectList;

    return (
      <Box overflow={'auto'}>
        <Title1 titleName={`Subject list(${_totalElements})`} />
        <SubjectTable postData={postData} data={filteredData} />
      </Box>
    );
  }
};

export default Subject;
